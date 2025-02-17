import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectMongoDB from './db/connectMongoDB.js';
import authRoutes from './routes/auth.route.js'
import debugRoutes from './routes/debug.route.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.get("/api/test", (req, res) => {
  res.status(200).send("test");
})

app.use("/api/auth", authRoutes);
app.use("/api/debug", debugRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  connectMongoDB();
})
