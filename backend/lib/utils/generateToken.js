import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d'
  });

  res.cookie("jwt", token, {
    maxAge: 1000*60*60*24*15,
    secure: process.env.NODE_ENV !== "development"
  })
}