import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./components/Home";
import About from "./components/About";
import Status from "./components/Status";
import AddNewProfile from "./components/AddNewProfile";
import Login from "./components/Login";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Footer from "./components/Footer";

const logout = e => {
  e.preventDefault();
  localStorage.removeItem("token");
  document.location.reload();
};

const Routes = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/status">
              Status
            </Link>
          </li>
          <li>
            {localStorage.getItem("token") ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <Link className="nav-link" to="/login">
                Login
              </Link>
            )}
          </li>
        </ul>

        <div>
          <Route path="/" exact component={Home} />
          <Route path="/about/" component={About} />
          <Route path="/status/" component={Status} />
          <Route path="/add-new-profile" component={AddNewProfile} />
          <Route path="/login/" component={Login} />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

ReactDOM.render(<Routes />, document.getElementById("root"));
