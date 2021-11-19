import { Button, CardMedia, Container, Grid } from "@mui/material";
import React, { useContext } from "react";
import styles from "../../styles/my.module.css";
import { StarIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import { StateContext } from "../../Context/StateContext";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
const SingleProduct = ({ product: { product } }) => {
  // const router =useRouter()
  // const {id} =router.query

  const { state, addItem } = useContext(StateContext);
  const { cart2 } = state;
  console.log(cart2);
  return (
    <Layout>
      <div>
        <Container sx={{ mt: "50px" }}>
          <div className="py-2 my-2 lg:mx-10   ">
            <ArrowLeftIcon className="h-10 w-10 cursor-pointer " />
          </div>

          <Grid container justifyContent="center" spacing={3}>
            <Grid
              justifyContent="center"
              alignContent="center"
              item
              sm="6"
              xs="12"
            >
              <CardMedia
                component="img"
                // sx={{ maxWidth: "650px" }}
                alt="green iguana"
                height="140"
                image={product.image}
              />
            </Grid>
            <Grid justifyContent="center" item sm="5" xs="12">
              <h3> {product.name} </h3>
              <div className="flex justify-between my-4 ">
                <h5 className="text-red-400"> {product.price} $ </h5>
                <div className="flex">
                  {[1, 2, 3, 4, 5, 6].map((x, i) => (
                    <StarIcon key={i} className="h-7 w-7 text-gray-500  " />
                  ))}
                </div>
              </div>
              <p className="text-xl font-semibold text-gray-600">DESCRIPTION</p>
              <p className="text-sm  text-gray-600  ">{product.description}</p>
              <Button
                onClick={() => addItem(product)}
                sx={{ my: "30px" }}
                disableElevation
                className={styles.btn}
                variant="contained"
              >
                <p className="text-white"> ADD TO CART </p>
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Layout>
  );
};

export default SingleProduct;

export async function getServerSideProps({ query: { id } }) {
  const NEXT_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  const res = await fetch(`${NEXT_URL}/api/${id}`);
  const product = await res.json();
  console.log(product);

  return {
    props: {
      product,
    },
  };
}
