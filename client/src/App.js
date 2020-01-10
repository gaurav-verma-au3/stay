import React, { Component } from "react";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { mapStateToProps } from "./store";
import Tenants from './components/Tenants'

class App extends Component {
  handleRedirect = () => {
    if (window.location.pathname === "/signup")
      return <Redirect to="/signup" />;
    else return <Redirect to="/login" />;
  };
  render() {
    return (
      <Router>
        <Nav />

        <div className="container-fluid p-0">
          {!this.props.isLoggedIn.loggedIn ? (
            <div>
              {this.handleRedirect()}
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </div>
          ) : (
            <div>
              {window.location.pathname === "/login" ? (
                <Redirect to="/" />
              ) : null}
              <Route exact path="/" component={Home} />
              <Route path="/tenants/:id" component={Tenants} />
              </div>
          )}
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);
