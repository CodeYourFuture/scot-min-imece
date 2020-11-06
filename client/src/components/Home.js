import React from "react";
import "../styles/Home.css";
import Profiles from "../api/profiles";

const Home = () => {
  return (
    <div>
      <header className="home-header">
        <h1>MIN - Imece</h1>
        <Profiles />
      </header>
    </div>
  );
};

export default Home;
