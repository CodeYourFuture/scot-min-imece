import React from "react";
import Profiles from "../components/Profiles";

const Home = props => {
  return (
    <>
      {props.isLoggedIn ? (
        <Profiles />
      ) : (
        "You need to login to view the dashboard"
      )}
    </>
  );
};

export default Home;
