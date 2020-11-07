import React from "react";
import "../styles/Home.css";
import Profiles from "../components/Profiles";

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
