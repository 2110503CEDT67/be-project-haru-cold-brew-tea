import User from "../models/user.model.js";

export const getAllUsersDebug = async (req, res) => {
  try {
    const users = await User.find();
  
    res.status(200).json(users);
  } catch (error) {
    console.log(`Error in getAllUsersDebug controller ${error.message}`);
    res.status(400).json({ error: "Internal Server Error" });
  }
}