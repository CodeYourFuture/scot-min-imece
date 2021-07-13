import React from "react";
import Profiles from "../components/Profiles";
import Login from "../components/Login";

const Home = props => {
  return (
    <>
      {props.isLoggedIn ? (
        <>
          <Profiles
            allNationalities={props.allNationalities}
            allGroups={props.allGroups}
          />
        </>
      ) : (
        <Login loginUser={props.loginUser} />
      )}
    </>
  );
};

export default Home;
