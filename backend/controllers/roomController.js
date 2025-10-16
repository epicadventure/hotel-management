// import * as res from 'express/lib/response'
import * as cloudinary from 'cloudinary';
import Hotel from '../model/Hotel.js';
import Room from '../model/Room.js';
export const createRoom  = async ( req, res) =>{

    try {
        const {roomType, pricePerNight, amenities} = req.body;
        const hotel = await Hotel.findOne({owner:req.auth.UserId });
        if(!hotel){
            return res.status(404).json({success: false, message:"Hotel not found"});
        }
        //upload images to cloudinary
        const uploadImages = req.files.map(async(file)=>{
            const response = await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        });

        const images = await Promise.all(uploadImages);

        await Room.create({
            hotel:hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities:JSON.parse(amenities),
            images
        }); 
        res.status(201).json({
            success:true,
            message:"Room Created Successfully"
        })
    } catch (error) {
        res.status(500).json({success:false, message:error.message});
        
    }

}

export const getRooms = async (req, res) =>{
    try{
        const rooms = await Room.find({isAvailable: true}).populate({
            path:"hotel",
            populate:{
                path:"owner",
                select:"username"
            }
        }).sort({createdAt:-1});
        res.status(200).json({success:true, rooms});
    }catch(error){
        res.status(500).json({success:false, message:error.message});
    }

}

export const getOwnerRooms = async(req, res)=>{
    try{
        const hotelData = await Hotel({owner:req.auth.UserId});
        const rooms = await Room.find({hotel:hotelData._id.toString()}).populate("hotel"); 
        res.status(200).json({success:true, rooms});
    }catch(error){
        res.status(500).json({success:false, message:error.message});
    }
        
}

export const toggleRoomAvailability = async(req, res)=>{
    try{
        const {roomId} = req.body;
        const roomData = await Room.findById(roomId);
        if(!roomData){
            return res.status(404).json({success:false, message:"Room not found"});
        }
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();
        res.status(200).json({success:true, message:"Room Availability Updated"});
    }catch(error){
        res.status(500).json({success:false, message:error.message});
    }
}  