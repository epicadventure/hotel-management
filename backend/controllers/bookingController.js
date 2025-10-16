// import res from "express/lib/response";
// import Booking from "../model/Bookings.js"
import Room from "../model/Room.js";
import Booking from "../model/Bookings.js"
import Hotel from "../model/Hotel.js"


//Function to check availabiluty of rooms
const checkAvailability = async (checkInDate, checkOutDate, room) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: { $lte: checkOutDate },
            checkOutDate: { $gte: checkInDate },
        });
        const isAvailable = bookings.length === 0;
        return isAvailable;
    } catch (error) {
        throw new Error("Error checking room availability");
    }
}

//API to check availability of room
//POST /api/bookings/check-availability
export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { checkInDate, checkOutDate, room } = req.body;
        const isAvailable = await checkAvailability(checkInDate, checkOutDate, room);
        res.status(200).json({ success: true, isAvailable });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

//API to create a new booking
//POST /api/bookings/book
export const createBooking = async (req, res) => {
    try {
        const { checkInDate, checkOutDate, room, guest, guests } = req.body;
        const user = req.user._id;
        //Before Booking Check Availability

        const isAvailable = await checkAvailability(checkInDate, checkOutDate, room);
        if (!isAvailable) {
            return res.status(400).json({ success: false, message: "Room is not available !!" });
        }

        const roomData = await Room.findById(room).populate("hotel");

        let totalPrice = roomData.pricePerNight;
        //Calculate totalPrice based on noghts

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = Math.abs(checkOut.getTime() - checkIn.getTime());
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
        totalPrice *= nights;
        const booking = new Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,

        });
        // await booking.save();
        res.status(200).json({ success: true, message: "Booking created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create booking !!" });
    }
}

//API to get all bookings for a user
//GET /api/bookings/user
export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;
        const bookings = await (await Booking.find({ user }).populate("room hotel")).toSorted({createdAt:-1})
        res.status(200).json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to gfetch bookings !!" });
    }
}

export const getHotelBookings = async(req, res)=>{
  try{
      const hotel = await Hotel.findOne({owner:req.auth.UserId});
    if(!hotel){
        return res.status(404).json({success:false, message:"Hotel not found"});
    }
    const bookings = await Booking.find({hotel:hotel._id}).populate("room hotel user").sort({createdAt:-1});

    const totalBookings = bookings.length;
    //Total Revenue
    const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

    res.json({success:true, dashboardData:{bookings, totalBookings, totalRevenue}})
  }catch(error){
    res.status(500).json({success:false, message:"Failed to fetch bookings !!"});
  }
}
 

