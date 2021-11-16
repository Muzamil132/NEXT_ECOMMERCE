import nc from "next-connect";
import Product from "../../models/ProductModel";
import { connectDB } from "../../helpers/connectdb";
import SingleProduct from './../Product/[id]';
connectDB();

const handler = nc();

handler.get(async (req, res) => {
  const { id } = req.query;
  

    try{
  const singleProduct = await Product.findById(id);
  res.status(200).json({product:singleProduct})
    }
    catch(error){
      res.status(500).json({error})
    }

  

    // }

});

export default handler;
