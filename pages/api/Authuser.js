import nc from "next-connect";
import auth from "../../helpers/authMiddleware";
import User from "../../models/Usermodel";
import { connectDB } from "../../helpers/connectdb";
connectDB();

const handler = nc();
handler.use(auth);
handler.get(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      res.status(200).json({
        status: "success",
        data: user,
      });
    }
    res.status(404).json({
      status: "fail",
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

export default handler;
