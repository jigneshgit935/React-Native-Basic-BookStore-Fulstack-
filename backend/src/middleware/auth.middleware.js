import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protectRoutes = async (req, res, next) => {
  try {
    // get the token
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ message: "No authentication token, access denied" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find the user fomr the db
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Token is invalid" });
    }
    console.log(user, req.user);

    req.user = user;
    next();
  } catch (error) {
    console.log("Authentication error", error.message);
    res.status(401).json({ message: "Token is invalid" });
  }
};

export default protectRoutes;
