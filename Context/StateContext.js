import { createContext, useContext, useState, useEffect } from "react";
const NEXT_URL = process.env.URL || "http://localhost:3000";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const router = useRouter();
  const [browser, setBrowser] = useState(false);
  const [state, setState] = useState({
    cart: [],
    USER: Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null,
    cart2: Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : [],

    loading: false,
    error: null,
    success: null,
    // user: Cookies.get("token") ? JSON.parse(Cookies.get("token")) : null,
  });

  const fetchData = async () => {
    // setState({ ...state, loading: true });

    const res = await fetch("api/");
    const data = await res.json();

    if (res.ok) {
      setState({
        ...state,
        cart: data.data,
        loading: false,
      });
    }
  };

  useEffect(() => {
    fetchData();
    setBrowser(true);
  }, []);

  // adding items into cart2

  const addItem = (product) => {
    const exist = state.cart2.some((x) => x._id == product._id);
    if (!exist) {
      setState({
        ...state,
        cart2: [...state.cart2, product],
      });
    }
    Cookies.set("cartItems", JSON.stringify(state.cart2));
  };

  //  remove item from cart

  const removeItem = (id) => {
    setState({
      ...state,
      cart2: state.cart2.filter((x) => x._id != id),
    });
    Cookies.set("cartItems", JSON.stringify(state.cart2));
  };

  // USER LOGIN LOGOUT REGISTER

  const registerUser = async (user) => {
    console.log(user);
    try {
      setState({ ...state, loading: true });
      const res = await fetch(`${NEXT_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!res.ok) {
        const data = await res.json();
        console.log(data);
        setState({ ...state, error: data, loading: false });
      } else {
        const data = await res.json();
        setState({
          ...state,
          loading: false,
          success: data,
          error: null,
          USER: data,
        });
        router.push("/");
        Cookies.set("USER", JSON.stringify(data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // login function

  const loginUser = async (user) => {
    try {
      setState({ ...state, loading: true });
      const res = await fetch(`${NEXT_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!res.ok) {
        const data = await res.json();
        console.log(data);
        setState({ ...state, error: data, loading: false });
      } else {
        const data = await res.json();
        console.log(data);
        setState({
          ...state,
          loading: false,
          success: data,
          error: null,
          USER: data,
        });
        router.push("/");
        Cookies.set("USER", JSON.stringify(data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // LOG OUT USER

  const logoutUser = () => {
    Cookies.remove("USER");
    setState({ ...state, USER: null });
  };

  return (
    <StateContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export async function getServerSideProps() {
  console.log("I am Great MAN hOW are You tell me ");
}
