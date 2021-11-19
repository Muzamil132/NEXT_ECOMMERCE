import React from "react";
import { StateContext } from "../Context/StateContext";
import { useRouter } from "next/router";
const Redirect = () => {
  const router = useRouter();
  const {
    state: { USER },
  } = React.useContext(StateContext);

  React.useEffect(() => {
    if (USER == null) {
      router.push("/");
    }
  }, [USER]);
  return <div></div>;
};

export default Redirect;
