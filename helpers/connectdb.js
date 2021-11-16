// const express  =require("express")
const mongoose = require("mongoose");

// const app =express()
const MONGO_URL =
  "mongodb+srv://Muzamil:next123@cluster0.dubtt.mongodb.net/Next?retryWrites=true&w=majority";
const PORT = "3000";

const connection = {};
const connectDB = async () => {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected);
};

export { connectDB };
