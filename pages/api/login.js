import nc from "next-connect";
import User from "../../models/Usermodel";
import { connectDB } from "../../helpers/connectdb";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import bcrypt from "bcrypt";
connectDB();

const handler = nc();

handler.post(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "please enter all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "user does not exist" });
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({ id: user._id, email: user.email }, "880NEXT", {
          expiresIn: "1h",
        });
        // res.setHeader(
        //   "Set-Cookie",
        //   cookie.serialize("token", token, {
        //     httpOnly: true,
        //     maxAge: 60 * 60 * 24 * 7, // 1 week
        //   })
        // );
        res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader("Acess-Controll-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
        res.status(200).json({
          success: true,
          user,
          token,
        });
      } else {
        return res.status(400).json({ msg: "invalid credentials" });
      }
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

export default handler;
