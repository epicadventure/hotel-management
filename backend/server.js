import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebHooks from "./controllers/clerkWebHooks.js";
import userRouter from "./routes/userRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import hotelRouter from "./routes/hotelRoute.js";
import roomRouter from "./routes/roomRoute.js";
import bookingRouter from "./routes/bookingRouter.js";


// Connect to MongoDB
connectDB();
connectCloudinary();

const app = express();
// Middlewares
app.use(cors()); // Enable CORS

//Middleware
app.use(express.json()); // Parse JSON bodies
app.use(clerkMiddleware());

//API to listen to clerk webhooks
app.use("/api/clerk", clerkWebHooks);
app.use("/api/user", userRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/room", roomRouter);
app.use("/api/bookings", bookingRouter);

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at PORT : ${PORT}`);
});
