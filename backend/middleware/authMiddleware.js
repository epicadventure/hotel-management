import User from "../model/User.js";

export const protect = async (req, res, next) => {
  try {
    // Assume req.auth is a function you've made to extract and verify token, returning something like { userId }
    const authPayload = req.auth && req.auth();
    if (!authPayload || !authPayload.userId) {
      return res.status(401).json({ error: "Unauthorized: no user id in auth" });
    }

    const user = await User.findById(authPayload.userId);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: user not found" });
    }

    req.user = user;
    return next();
  } catch (err) {
    console.error("Error in protect middleware:", err);
    return res.status(500).json({ error: "Internal server error in auth" });
  }
};

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
