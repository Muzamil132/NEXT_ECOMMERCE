import React, { useState, useContext, useEffect } from "react";
import Input from "../../components/Input";
import { StateContext } from "../../Context/StateContext";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import { useRouter } from "next/router";
import Link from "next/link";
const Register = () => {
  const router = useRouter();
  const { registerUser, state } = useContext(StateContext);
  const { error, loading, success, USER } = state;
  console.log(error);
  const [state2, setState] = useState({
    username: "",
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
      ...state2,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state2);
    registerUser(state2);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };
  return (
    <div className="flex justify-center items-center h-screen ">
      <Snackbar
        onClose={handleClose}
        open={error ? !error.sucess : false}
        message={error && error.error}
      />
      <Snackbar
        open={success ? !success.sucess : false}
        message={success && success.message}
      />

      <div class="w-full border  max-w-2xl">
        <h4 class="text-center pt-10 ">CREATE ACCOUNT</h4>
        <form class="bg-white   rounded-xl px-8 pt-6 pb-4 mb-4">
          <Input
            placeholder="USERNAME"
            name="username"
            handleChange={handleChange}
          />
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
              class="bg-gray-700 hover:bg-gray-500 w-full text-white font-bold py-2 lg:py-5 px-4 rounded focus:outline-none  focus:bg-gray-800 focus:shadow-outline"
              type="button"
            >
              {loading ? (
                <CircularProgress sx={{ color: "white" }} />
              ) : (
                "SIGN IN"
              )}
            </button>
          </div>
          <Link
            href="/register"
            class="inline-block xs:text-sm   font-bold lg:text-lg  hover:text-gray-800"
          >
            <p class="cursor-pointer  py-2 font-semibold ">
              Already have an account? Sign In
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

export default Register;
