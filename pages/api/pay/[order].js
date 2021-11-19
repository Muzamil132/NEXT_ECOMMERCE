import nc from "next-connect";
import Order from "../../../models/OrderModel";
import { connectDB } from "../../../helpers/connectdb";
import auth from "../../../helpers/authMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

connectDB();

const handler = nc();

handler.use(auth);

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

handler.get(async (req, res) => {
  // console.log(req.query.order);
  try {
    const Orderr = await Order.findById(req.query.order);
    console.log(Orderr._id.toString());
    if (Orderr) {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        client_reference_id: Orderr._id.toString(),
        success_url: "http://localhost:3000/profile",
        cancel_url: "http://localhost:3000/profile",
        line_items: [
          {
            quantity: 1,
            name: "T-shirt",
            amount: Orderr.orderamount * 100,
            currency: "usd",
          },
        ],
      });
      res.status(200).json(session);
    } else {
      res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

export default handler;
