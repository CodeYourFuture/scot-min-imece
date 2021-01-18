import React from "react";
import Profiles from "../components/Profiles";
import Login from "../components/Login";

const Home = props => {
  return (
    <>
      {props.isLoggedIn ? (
        <>
          <Profiles />
        </>
      ) : (
        <Login loginUser={props.loginUser} />
      )}
    </>
  );
};

export default Home;
