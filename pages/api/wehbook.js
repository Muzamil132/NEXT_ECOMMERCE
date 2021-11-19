import nc from "next-connect";
import Order from "../../models/OrderModel";
import { connectDB } from "../../helpers/connectdb";
import auth from "../../helpers/authMiddleware";
const { buffer, text, json } = require("micro");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

connectDB();

const handler = nc();

export const config = {
  api: {
    bodyParser: false,
  },
};

// handler.use(auth);

handler.post(async (req, res) => {
  console.log("Web hook is running");
  const buf = await buffer(req);
  const payload = buf.toString();
  let event;
  try {
    const sig = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.END_POINT_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const id = "6196d2d0f1e79f7c7f7968e2";
      const order = await Order.findById(session.client_reference_id);

      if (order) {
        order.isPaid = true;
        order.save();
      }
    }

    res.status(200).json("Working great");
  } catch (err) {
    res.status(400).json(err);
  }
});

export default handler;
