import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./components/Home";
import "semantic-ui-css/semantic.min.css";
import About from "./components/About";
import Status from "./components/Status";
import { NavLink, BrowserRouter as Router, Route } from "react-router-dom";
import { Menu, Container, Image, Input } from "semantic-ui-react";

const Routes = () => {
  return (
    <Router>
      <Menu inverted>
        <Container>
          <Menu.Item header>
            <Image
              size="small"
              src="http://www.maryhillintegration.org.uk/wp-content/uploads/2016/10/banner.jpg"
            />
          </Menu.Item>

          <Menu.Item header as={NavLink} to="/" name="home" />
          <Menu.Item header as={NavLink} to="/about" name="about" />
          <Menu.Item header as={NavLink} to="/status" name="status" />
        </Container>
      </Menu>

      <div>
        <Route path="/" exact component={Home} />
        <Route path="/about/" component={About} />
        <Route path="/status/" component={Status} />
      </div>
    </Router>
  );
};

ReactDOM.render(<Routes />, document.getElementById("root"));
