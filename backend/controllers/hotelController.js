import Hotel from "../model/Hotel.js";

import User from "../model/User.js";

export const registerHotel = async( req, res) =>{
    try{
        const {name, address, contact, city} = req.body;
        const owner = req.user._id;

        const hotel = await Hotel.findOne({owner});
        if(hotel){
            return res.status(400).json({error:"Hotel already registered !!"});
        }
        await Hotel.create({name, address, contact, city, owner});
         await User.findByIdAndUpdate(owner, {role:"hotelOwner"});
       
        res.status(201).json({success:true, message:"Hotel registered successfully !!", hotel});
    }
    catch(error){
        console.log(`Error in registerHotel : ${error}`);
        res.status(500).json({error:error.message, success:false });
     
}
}

export const deregisterHotel = async(req, res) =>{
    try{
        const owner = req.user._id;
        const hotel = await Hotel.findOne({owner});
        if(!hotel){
            return res.status(400).json({error:"Hotel not registered !!"});
        }
        await Hotel.findByIdAndDelete(hotel._id);
        await User.findByIdAndUpdate(owner, {role:"user"});
        res.status(200).json({success:true, message:"Hotel deregistered successfully !!"});
    }
    catch(error){
        console.log(`Error in deregisterHotel : ${error}`);
        res.status(500).json({error:error.message, success:false });
    }
}

