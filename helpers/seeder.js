const Product = require("../models/ProductModel");

const products = require("./data");
console.log(products);
const mongoose = require("mongoose");

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

connectDB();
const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Room deleted");
    await Product.insertMany(products);
    console.log("Room are inserted");
  } catch (error) {
    console.log(error.message);
  }
};

seedProducts();
