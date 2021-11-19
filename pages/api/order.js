import nc from "next-connect";
import Order from "../../models/OrderModel";
import { connectDB } from "../../helpers/connectdb";
import auth from "../../helpers/authMiddleware";

connectDB();

const handler = nc();

handler.use(auth);

handler.post(async (req, res) => {
  console.log(req.user.id);
  const neworder = new Order({
    user: req.user.id,
    orderItems: req.body.orderItems,
    orderamount: req.body.orderamount,
    shippingAddress: req.body.shippingAddress,
    isPaid: false,
    ordercreatedAt: new Date(),
  });
  try {
    await neworder.save();
    res.status(200).json({
      status: "success",
      data: neworder,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

export default handler;
