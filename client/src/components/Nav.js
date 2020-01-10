import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../store";
class Nav extends Component {
  render() {
    return (
    
    
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ height: "10vh" }}>
          <a className="navbar-brand " href="/">
            PG-Admin
          </a>
          {this.props.isLoggedIn.loggedIn ? (
            <h5>Welcome {this.props.isLoggedIn.user.name}</h5>
          ) : null}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#main-nav"
            aria-controls="main-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="main-nav">
            <ul className="navbar-nav text-white ml-auto w-25 mt-2 mt-lg-0">
              {window.location.pathname === "/login" ||
              window.location.pathname === "/signup" ||
              window.location.pathname === "/about" ? (
                window.location.pathname === "/login" ? (
                  <>
                    <li className="nav-item ml-auto">
                      <a href="/signup" className="nav-link">
                        Signup
                      </a>
                    </li>
                    <li className="nav-item ml-auto">
                      <a href="/about" className="nav-link">
                        About
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item ml-auto">
                      <a href="/login" className="nav-link">
                        Login
                      </a>
                    </li>
                    <li className="nav-item ml-auto">
                      <a href="/about" className="nav-link">
                        About
                      </a>
                    </li>
                  </>
                )
              ) : (
                <>
                  <li className="nav-item ml-auto ">
                    <a href="/rooms" className="nav-link">
                      Rooms
                    </a>
                  </li>
                  <li className="nav-item ml-auto">
                    <a href="/tenants" className="nav-link">
                      Tenants
                    </a>
                  </li>
                  <li className="nav-item ml-auto">
                    <a href="/profile" className="nav-link">
                      Profile
                    </a>
                  </li>
                  <li className="nav-item ml-auto">
                    <a href="/logout" className="nav-link">
                      Logout
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
    

    
    );
  }
}

export default connect(mapStateToProps)(Nav);
