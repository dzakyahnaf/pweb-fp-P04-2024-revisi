import express from "express";
import bodyParser from "body-parser";
import connectDB from "./database";
import cors from "cors";
import authRoutes from "./routes/AuthRoutes";
import adminRoutes from "./routes/AdminRoutes"
import userRoutes from "./routes/UserRoutes"

const app = express();
const PORT = process.env.PORT
connectDB();
app.listen(PORT, ()=>{
  console.log(`Server running on http://localhost:${PORT}`);
})

app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes)
app.use("/admin",adminRoutes)
app.use("/user",userRoutes)
