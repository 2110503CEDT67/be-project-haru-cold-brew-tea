import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js'

export const signup = async (req, res) => {
  try {
    const {firstName, lastName, phoneNumber, sex, email, password} = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format"});// return เพื่อให้ break ออกจาก function
    }

    const exitingEmail = await User.findOne({ email });
    if(exitingEmail) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    if(!(firstName && lastName && sex && phoneNumber)){
      return res.status(400).json({ error: "All field are required"})
    }

    if(password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      phoneNumber,
      sex,
      email,
      password: hashedPassword
    });

    if(newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        message: "Signup Succesfully",
        firstName,
        lastName,
        phoneNumber,
        sex,
        email
      })
    }
    else {
      res.status(400).json({ error: "Invalid user data" });
    }

  } catch (error) {
    console.log(`Error in signup controllers ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const login = async (req, res) => {

}

export const logout = async (req, res) => {

}