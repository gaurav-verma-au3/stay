import React, { Component } from "react";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { mapStateToProps } from "./store";
import { RoomsFrame, TenantsFrame,  PaymentsFrame } from './components/Frame'

import Tenant from './components/Tenant'
import Tenants from "./components/Tenants";
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
            <div className="row m-0 p-0">
              {this.handleRedirect()}
              <div className="col-md-6 m-0 p-5 col-sm-12 d-flex align-items-center justify-content-center">
                <img  className="img-fluid p-2 w-25" alt="" src="https://i.ibb.co/C1963Hb/UIHere-1.png"/>
                <h1 style={{ fontSize: "6rem" }}>mStay*</h1>
              </div>
              <div className="col-md-6  p-0 col-sm-12">
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
                
                <Route exact path="/tenants" component={TenantsFrame} />
                <Route exact path="/rooms" component={RoomsFrame} />
                <Route exact path="/payments" component={PaymentsFrame}/>
                <Route eaxct path="/tenants/:id" component={Tenant} />
              
                </div>
          )}
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);
