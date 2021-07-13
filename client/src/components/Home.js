import React from "react";
import Profiles from "../components/Profiles";
import Login from "../components/Login";

const Home = props => {
  console.log(props.allNationalities);
  return (
    <>
      {props.isLoggedIn ? (
        <>
          <Profiles allNationalities={props.allNationalities} />
        </>
      ) : (
        <Login loginUser={props.loginUser} />
      )}
    </>
  );
};

export default Home;
