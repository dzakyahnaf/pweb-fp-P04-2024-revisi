
import express, { Request, Response } from "express";
import User from "../schema/User";
import UserReport from "../schema/UserReport";
import DamageReport from "../schema/DamageReport";
import { authenticateToken, authorizeRole } from "../middleware/middleware";
import { Role } from "../enum/role";
import mongoose from "mongoose";
import RoomOccupancy from "../schema/RoomOccupancy";
import UserDetail from "../schema/UserDetail";
import Payment from "../schema/Payment";
import InvoiceHistory from "../schema/InvoiceHistory";
const router = express.Router();


// get user details
router.get("/detail/:id", authenticateToken, authorizeRole([Role.User]), async(req:Request, res:Response)=>{
    const userId = req.params.id
    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).json({message:"Invalid user ID"})
    }
    try{
        const userData = await UserDetail.aggregate([
            {
                $match: {
                    "user_id": new mongoose.Types.ObjectId(userId) 
                },                
            },
            {
                $lookup: {
                  from: "users",
                  localField: "user_id",
                  foreignField: "_id",
                  as: "user_details",
                },
            },
            {
                $lookup: {
                  from: "invoiceHistorys",
                  localField: "invoice_id",
                  foreignField: "_id",
                  as: "invoice_details",
                },
            },
            {
                $project: {
                    username: { $arrayElemAt: ["$user_details.username", 0] },
                    bill: { $arrayElemAt: ["$invoice_details.bill", 0] },
                    invoice_id: { $arrayElemAt: ["$invoice_details._id",0]},
                    status: { $arrayElemAt: ["$invoice_details.status", 0] },
                    createdAt: { $arrayElemAt: ["$invoice_details.createdAt", 0] }
                  },
            }
        ])
        res.status(200).json({
            message:"Data fetch successfully",
            data: userData
        })
    }catch(err){
        console.log("Errror during fetching user data: ", err)
        res.status(500).json({ message: "Internal server error ", error: err });
    }
})

// send user report
router.post("/laporan/penghuni", authenticateToken, authorizeRole([Role.User]), async (req:Request, res:Response) => {
    const { message } = req.body;
    try {
      if (!message) {
        return res.status(400).json({ message: "All fields are required." });
      }
        const userReport = new UserReport({message:message});
        const response = await userReport.save();
        res.status(200).json({
            message: "Insert data hase been successfull",
            data: {response},}
        );
    } catch (err) {
      console.log("Error during inserting data: ", err)
      res.status(500).json({ message: "Internal server error ", error: err });
    }
  });

router.get("/room", authenticateToken, authorizeRole([Role.User]), async(_req: Request, res:Response)=>{
try{
    const room = await RoomOccupancy.find();
    res.status(200).json({
    message: "Data fetch successfully",
    data : room
    }) 
}catch(err){
    console.error("Error during fetching data: ", err)
    res.status(500).json({message: "Internal server error", error:err})
}
})
  

router.put("/room/update", authenticateToken, authorizeRole([Role.User]), async(req:Request, res:Response)=>{
    const {empty, filled } = req.body;
    try{

        // because we're just going to update each time user use a room, so we need fixed bedroom id
        const id ='676b4cd6b300f749a499f982'
        if(!mongoose.Types.ObjectId.isValid(id)){
            console.error("Invalid room ID")
            res.status(400).json({message:"Invalid room ID"})
        }
        const response = await RoomOccupancy.findByIdAndUpdate(id,{
            empty: empty,
            filled: filled
        }, {new:true})
        res.status(200).json({message: "Room occupancy updated successfully", data: response})
    }catch(err){
        console.log("Error during updating data: ", err)
        res.status(500).json({ message: "Internal server error ", error: err });
    }
})

//  send damage report
router.post("/laporan/fasilitas", authenticateToken, authorizeRole([Role.User]), async(req:Request, res:Response)=>{
    const {user_id, message} = req.body;

    if (!message) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try{
        const damageReport = new DamageReport({
                user_id: user_id,
                message:message});

        // check if user exist
        if(!mongoose.Types.ObjectId.isValid(user_id)){
            res.status(400).json({message: "Invalid User ID."})
        }

        const isExist = await User.findById(user_id)
        if(!isExist){
            res.status(404).json({message: "User not found"})
        }
        const response = await damageReport.save();
        res.status(200).json({
            message: "Insert data has been successfull",
            data: {response},}
        );
    }catch(err){
        console.log("Error during inserting data", err)
        res.status(500).json({message: "Internal server error ", error: err})
    }
})

// send payment
router.post("/sewa/payment", authenticateToken, authorizeRole([Role.User]), async(req:Request, res: Response)=>{
    const { total_bill, payment_method, rent_period } = req.body;
    try{
        const payment = new Payment({
                total_bill: total_bill,
                payment_method: payment_method,
                rent_period: rent_period
            });

        const response = await payment.save();
        res.status(200).json({
            message: "Insert data has been successfull",
            data: response}
        );
    }catch(err){
        console.log("Error during inserting data", err)
        res.status(500).json({message: "Internal server error ", error: err})
    }
})

// send invoices
router.post("/sewa/invoices", authenticateToken, authorizeRole([Role.User]), async(req:Request, res: Response)=>{
    const { bill, status, payment_id } = req.body;
    try{
        const invoices = new InvoiceHistory({
                bill: bill,
                status: status,
                payment_id:payment_id
            });

        const response = await invoices.save();
        res.status(200).json({
            message: "Insert data has been successfull",
            data: response}
        );
    }catch(err){
        console.log("Error during inserting data", err)
        res.status(500).json({message: "Internal server error ", error: err})
    }
})

// send user detail
router.post("/sewa/user-detail", authenticateToken, authorizeRole([Role.User]), async(req:Request, res: Response)=>{
    const { user_id, invoice_id } = req.body;

    // check user_id and invoice_id is ObjectId
    if(!mongoose.Types.ObjectId.isValid(invoice_id)){
        return res.status(400).json({message:"Invalid invoice ID"})
    }

     // check if user exist
     if(!mongoose.Types.ObjectId.isValid(user_id)){
        res.status(400).json({message: "Invalid User ID."})
    }

    const isExist = await User.findById(user_id)
    if(!isExist){
        res.status(404).json({message: "User not found"})
    }

    try{
        const detail = new UserDetail({
                user_id: user_id,
                invoice_id: invoice_id,
            });

        const response = await detail.save();
        res.status(200).json({
            message: "Insert data has been successfull",
            data: {response},}
        );
    }catch(err){
        console.log("Error during inserting data", err)
        res.status(500).json({message: "Internal server error ", error: err})
    }
})

router.put("/sewa/invoices/update/:id", authenticateToken, authorizeRole([Role.User]), async(req:Request, res: Response)=>{
    const invoiceId = req.params.id
    const {status} = req.body

    if(!mongoose.Types.ObjectId.isValid(invoiceId)){
        return res.status(400).json({message:"Invalid invoice ID"})
    }
    try{
        const updateInvoce = await InvoiceHistory.findByIdAndUpdate(
            invoiceId,
            {
                status:status
            }
        )
        res.status(200).json({
            message: "Update data has been successfull",
            data: {updateInvoce}}
        );
    }catch(err){
        console.log("Errror during update data: ", err)
        res.status(500).json({ message: "Internal server error ", error: err });
    }
})




export default router