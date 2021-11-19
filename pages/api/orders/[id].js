import nc from "next-connect";
import Order from "../../../models/OrderModel";
import { connectDB } from "../../../helpers/connectdb";
import auth from "../../../helpers/authMiddleware";

connectDB();

const handler = nc();

handler.use(auth);

handler.get(async (req, res) => {
  const { id } = req.query;
  try {
    const orders = await Order.find({ user: id });
    if (orders) {
      res.status(200).json({
        success: true,
        orders,
      });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

export default handler;
