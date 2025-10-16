import Hotel from "../model/Hotel.js";
import User from "../model/User.js";

export const registerHotel = async (req, res) => {
    try {
        const { name, address, contact, city } = req.body;

        if (!name || !address || !contact || !city) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: "Unauthorized: User not authenticated" });
        }

        const owner = req.user._id;

        const existingHotel = await Hotel.findOne({ owner });
        if (existingHotel) {
            return res.status(400).json({ error: "Hotel already registered" });
        }

        const newHotel = await Hotel.create({ name, address, contact, city, owner });
        await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

        res.status(201).json({
            success: true,
            message: "Hotel registered successfully",
            hotel: newHotel,
        });

    } catch (error) {
        console.error(`Error in registerHotel: ${error}`);
        res.status(500).json({ error: error.message, success: false });
    }
};
