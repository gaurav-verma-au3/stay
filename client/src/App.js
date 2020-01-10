import React, { Component } from "react";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { mapStateToProps } from "./store";
import Tenant from './components/Tenant'
import Rooms from "./components/Rooms";
import   Payments  from "./components/Payments";

class App extends Component {
  handleRedirect = () => {
    if (window.location.pathname === "/signup")
      return <Redirect to="/signup" />;
    else return <Redirect to="/login" />;
  };
  render() {
    return (
      <Router>
        

        <div className="container-fluid p-0">
          {!this.props.isLoggedIn.loggedIn ? (
            <div className="row ">
              {this.handleRedirect()}
              <div className="col-md-6 col-sm-12 d-flex align-items-center justify-content-center">
                <h1 style={{fontSize:"8rem"}}>mStay*</h1>
              </div>
              <div className="col-md-6 col-sm-12">
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              </div>
  
  
            </div>
          ) : (
            <div>
              {window.location.pathname === "/login" ? (
                <Redirect to="/" />
                ) : null}
                <Nav />
                <Route exact path="/" component={Home} />
                <Route exact path="/tenants" component={Rooms} />
                <Route exact path="/rooms" component={Rooms} />
                <Route exact path="/payments" component={Payments}/>
                <Route eaxct path="/tenants/:id" component={Tenant} />
              </div>
          )}
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);
