// const express  =require("express")
const mongoose = require("mongoose");

// const app =express()

const PORT = "3000";

const connection = {};
const connectDB = async () => {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected);
};

export { connectDB };
