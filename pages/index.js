import { useContext } from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Paper,
  Typography,
  CardMedia,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/my.module.css";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { StateContext } from "../Context/StateContext";
import LoadingCard from "../components/LoadingCard";
// import styles from '../styles/Home.module.css'
// import LoadingCard from "./../components/LoadingCard";

export default function Home() {
  const router = useRouter();
  const { state } = useContext(StateContext);
  const { cart, loading } = state;
  
  console.log(router.pathname);
  return (
    <div>
      <Layout>
        <Container>
          <Grid className="mt-10" container justifyContent="center">
            {cart.map((product) =>
              loading ? <LoadingCard /> : <ProductCard product={product} />
            )}
          </Grid>
        </Container>
      </Layout>
    </div>
  );
}
