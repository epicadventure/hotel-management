import User from "../model/User.js";

//Middleware to check if the user is authenticated
export const protect = async(req, res, next )=>{
    const {userId} = req.auth();
    if(!userId){
        return res.status(401).json({error: "Unauthorized"});
    }else{
        const user = await User.findById(userId);
        if(!user){
            return res.status(401).json({error: "Unauthorized"});
        }
        req.user = user;
        next();
    }       
    }


    export default protect;

// import User from "../model/User.js";

// export const protect = async (req, res, next) => {
//   try {
//     // ✅ New Clerk syntax
//     const { userId } = req.auth();

//     if (!userId) {
//       return res.status(401).json({ error: "Unauthorized - No user ID" });
//     }

//     // ✅ Use the correct field from your User model
//     const user = await User.findOne({ clerkId: userId });

//     if (!user) {
//       return res.status(401).json({ error: "Unauthorized - User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Protect middleware error:", error);
//     res.status(401).json({ error: "Unauthorized - Invalid token" });
//   }
// };

// export default protect;
