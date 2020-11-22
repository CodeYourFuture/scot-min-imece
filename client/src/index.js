const logout = e => {
  e.preventDefault();
  localStorage.removeItem("token");
  document.location.reload();
};

const Routes = () => {
  return (
    <Router>
      <Menu inverted>
        <Container>
          <Menu.Item as={NavLink} to="/">
            <Image size="small" src={banner} alt="Maryhill Integration logo" />
          </Menu.Item>
          <Menu.Item as={NavLink} to="/about" name="about">
            FAQ
          </Menu.Item>
          <Menu.Item as={NavLink} to="/add-new-profile" name="addNewProfile" />
          {localStorage.getItem("token") ? (
            <Menu.Item onClick={logout} position="right" name="logout" />
          ) : (
            <Menu.Item as={NavLink} to="/login" name="login" position="right" />
          )}
        </Container>
      </Menu>
      <div className="content">
        <Route path="/" exact component={Home} />
        <Route path="/about/" component={About} />
        <Route path="/status/" component={Status} />
        <Route path="/login/" component={Login} />
        <Route path="/profiles/:profileId" component={ViewProfile} />
        <Route path="/add-new-profile" component={AddNewProfile} />
      </div>
      <Footer />
    </Router>
  );
};

ReactDOM.render(<Routes />, document.getElementById("root"));
