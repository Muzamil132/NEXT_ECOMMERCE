import React, { useState, useContext, useEffect } from "react";
import Input from "../../components/Input";
import { StateContext } from "../../Context/StateContext";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Link from "next/Link";
import { useRouter } from "next/router";
const Index = () => {
  const router = useRouter();
  const { loginUser, state } = useContext(StateContext);
  const { error, loading, success, USER } = state;
  const [state1, setState] = useState({
    email: "",
    password: "",
  });

  // REDIRECTING USERS IF LOGGED IN ALREADY TO  HOME PAGE

  useEffect(() => {
    if (USER != null) {
      router.push("/");
    }
  }, [USER]);

  const handleChange = (e) => {
    setState({
      ...state1,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(state1);
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div class="w-full border  max-w-2xl">
        <h4 class="text-center pt-10 ">SIGN IN</h4>
        <form class="bg-white   rounded-xl px-8 pt-6 pb-4 mb-4">
          <Input placeholder="EMAIL" name="email" handleChange={handleChange} />
          <Input
            placeholder="PASSWORD"
            name="password"
            // value={state.password}
            handleChange={handleChange}
          />

          <div class="flex items-center justify-between">
            <button
              onClick={handleSubmit}
              class="bg-gray-700 hover:bg-gray-500 w-full text-white font-bold py-2 lg:py-5 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              SIGN IN
            </button>
          </div>
          <Link
            href="/register/create"
            class="inline-block xs:text-sm   font-bold lg:text-lg  hover:text-gray-800"
          >
            <p class="cursor-pointer  py-2 font-semibold ">
              New member? Sign Up
            </p>
          </Link>
        </form>
        <p class="text-center text-gray-500 pb-3 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Index;
