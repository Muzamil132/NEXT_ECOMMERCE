import nc from "next-connect";
import Product from "../../models/ProductModel";
import { connectDB } from "../../helpers/connectdb";
connectDB();

const handler = nc();

handler.get(async (req, res) => {
  try {
    const allProducts = await Product.find({});
    if (allProducts) {
      res.status(200).json({ data: allProducts });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default handler;
