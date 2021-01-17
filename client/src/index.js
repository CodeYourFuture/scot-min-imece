import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./components/Home";
import About from "./components/About";
import Status from "./components/Status";
import AddNewProfile from "./components/AddNewProfile";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { List, Container, Button, Segment } from "semantic-ui-react";
import Login from "./components/Login";
import "semantic-ui-css/semantic.min.css";
import Footer from "./components/Footer";
import ViewProfile from "./components/ViewProfile";

const logout = e => {
  e.preventDefault();
  localStorage.removeItem("token");
  document.location.reload();
};

const Routes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginUser = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Segment className="header-container" fluid>
        <List horizontal floated="right" size="large">
          <List.Item>
            <Button as={Link} to="/">
              Home
            </Button>
          </List.Item>
          <List.Item>
            <Button as={Link} to="/about">
              FAQ
            </Button>
          </List.Item>

          {isLoggedIn && (
            <List.Item>
              <Button as={Link} to="/add-new-profile">
                New Profile
              </Button>
            </List.Item>
          )}
          {localStorage.getItem("token") ? (
            <List.Item name="logout">
              <Button onClick={logout}>Logout </Button>
            </List.Item>
          ) : (
            <List.Item name="login">
              <Button as={Link} to="/login">
                Login
              </Button>
            </List.Item>
          )}
        </List>
      </Segment>
      <main className="main-content">
        <Container>
          <Route
            path="/"
            exact
            render={() => <Home isLoggedIn={isLoggedIn} />}
          />
          <Route path="/about/" component={About} />
          <Route path="/status/" component={Status} />
          <Route
            path="/login/"
            render={() => <Login loginUser={loginUser} />}
          />
          <Route path="/profiles/:profileId" component={ViewProfile} />
          <Route path="/add-new-profile" component={AddNewProfile} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

ReactDOM.render(<Routes />, document.getElementById("root"));
