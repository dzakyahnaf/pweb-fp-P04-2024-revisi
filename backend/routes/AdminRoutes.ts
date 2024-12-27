import express, { Request, Response } from "express";
import UserReport from "../schema/UserReport";
import DamageReport from "../schema/DamageReport";
import { authenticateToken, authorizeRole } from "../middleware/middleware";
import { Role } from "../enum/role";
import RoomOccupancy from "../schema/RoomOccupancy";
import User from "../schema/User";
const router = express.Router();

// Get room occupancy
router.get("/", authenticateToken, authorizeRole([Role.Admin]), async(_req: Request, res:Response)=>{
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

// get penghuni
router.get("/user", authenticateToken, authorizeRole([Role.Admin]), async(_:Request, res:Response)=>{
  try{
    const userData = await User.find({role: "USER"})
    res.status(200).json({
      message:"Data fetch successfully",
      data: userData
    })
  }catch(err){
    console.error("Errror during fetching user data", err)
    res.status(500).json({message: "Internal server error", error: err})
  }
})

// get laporan fasilitas
router.get("/laporan/fasilitas", authenticateToken, authorizeRole([Role.Admin]), async(_req:Request, res:Response)=>{
  try{
    const messageData = await DamageReport.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id", 
            as: "user_details",
          },
        },
    ]);

    res.status(200).json({
      message: "Data fetch successfully",
      data:messageData
    })
  }catch(err){
    console.error("Error during fetching data: ", err)
    res.status(500).json({ message: "Internal server error ", error: err });
  }
})

// get laporan penghuni berandal
router.get("/laporan/penghuni", authenticateToken, authorizeRole([Role.Admin]), async (_req:Request, res:Response) => {
    try {
      const messageData = await UserReport.find();
      res.status(200).json({
        message: "Data fetch successfully",
        data: messageData
      });

    } catch (err) {
      console.log("Error during fetching data: ", err)
      res.status(500).json({ message: "Internal server error ", error: err });
    }
  });


export default router