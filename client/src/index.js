import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./components/Home";
import About from "./components/About";
import Status from "./components/Status";
import AddNewProfile from "./components/AddNewProfile";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Footer from "./components/Footer";
import ViewProfile from "./components/ViewProfile";
import MINLogo from "./assets/nav-banner.png";

const logout = e => {
  e.preventDefault();
  localStorage.removeItem("token");
  document.location.reload();
};

const Routes = () => {
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(token != null);

  const loginUser = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="absolute w-full">
        <img
          className="h-24 object-cover object-right w-full z-0 md:h-36"
          src={MINLogo}
          alt="MIN Logo"
        ></img>
      </div>
      <nav className="flex flex-col justify-center h-24 ml-2 z-10 md:h-36 md:items-center">
        <div className="h-12 flex space-x-4">
          <Link to="/" className="nav-btn">
            Home
          </Link>
          <Link to="/about" className="nav-btn">
            FAQ
          </Link>
          {token ? (
            <button onClick={logout} className="nav-btn">
              Logout{" "}
            </button>
          ) : (
            <Link to="/login" className="nav-btn">
              Login
            </Link>
          )}
        </div>
      </nav>
      <main className="flex-1 mx-10 my-10">
        <Route
          path="/"
          exact
          render={() => <Home isLoggedIn={isLoggedIn} loginUser={loginUser} />}
        />
        <Route path="/about/" component={About} />
        <Route path="/status/" component={Status} />
        <Route path="/login/" render={() => <Login loginUser={loginUser} />} />
        <Route path="/profiles/:profileId" component={ViewProfile} />
        <Route path="/add-new-profile" component={AddNewProfile} />
      </main>
      <Footer />
    </Router>
  );
};

ReactDOM.render(<Routes />, document.getElementById("root"));
