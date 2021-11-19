import nc from "next-connect";
import User from "../../models/Usermodel";
import { connectDB } from "../../helpers/connectdb";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import bcrypt from "bcrypt";
connectDB();

const handler = nc();

handler.post(async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({
      success: false,
      error: "Please enter all fields",
    });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      success: false,
      error: "User already exists",
    });
  }
  const newUser = new User({
    email,
    password,
    username,
  });
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newUser.password, salt);
  newUser.password = hashedPassword;
  await newUser.save();
  const token = jwt.sign({ id: newUser._id, email: newUser.email }, "880NEXT");
  // res.setHeader(
  //   "Set-Cookie",
  //   cookie.serialize("token", token, {
  //     httpOnly: true,
  //     maxAge: 60 * 60 * 24 * 7, // 1 week
  //   })
  // );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Acess-Controll-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: newUser,
    token,
  });
});

export default handler;
