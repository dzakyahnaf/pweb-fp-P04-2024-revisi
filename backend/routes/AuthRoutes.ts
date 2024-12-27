
import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
import User from "../schema/User";
const router = express.Router();

// Login
router.post("/login", async (req:Request, res:Response) => {
    const { username, password, role } = req.body;

    try {
      if (!username || !password || !role) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      const isPassValid = password === user.password;
      const isRoleValid = role === user.role;
  
      if (!isPassValid) {
        return res.status(401).json({ message: "Invalid password." });
      }

      if (!isRoleValid) {
        return res.status(401).json({ message: "Invalid role." });
      }
  
      const token = jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );
  
      res.status(200).json({
        message: "Login successfull",
        token: token,
        user: {
            id: user._id,
            username: user.username,
            password: user.password,
            role: user.role
        },
      });

    } catch (err) {
      console.log("Error during login: ", err)
      res.status(500).json({ message: "Internal server error ", error: err });
    }
  });


export default router