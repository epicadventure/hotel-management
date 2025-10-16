import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
   hotel:{type:String, ref: "Hotel", required:true},
   roomType:{type:String, required:true},
   pricePerNight:{type:Number, required:true},
   image:{type:String},
   isAvailable:{type:Boolean, default:true},
   amenities:[{type:String, required:true}]

},{
    timestamps:true
}
);

const Room = mongoose.model("Room", roomSchema);
export default Room;