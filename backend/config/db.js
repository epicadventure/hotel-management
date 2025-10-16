import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);
  }catch(error){
    console.log(`Error in MongoDB connection : ${error}`);
  } 
}

export default connectDB;