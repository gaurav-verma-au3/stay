import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../store";
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch({
      type: "LOGIN_AUTH",
      payload: {
        email: e.target.email.value,
        password: e.target.password.value
      }
    });
  };

  render() {
    return (
      <div
        className="container p-0 m-0 d-flex align-items-center justify-content-center"
        style={{ height: "90vh" }}
      >
        <form
          className="pt-5 pr-5 pl-5 bg-light border rounded"
          onSubmit={e => this.handleSubmit(e)}
        >
          <h2>Login</h2>

          <hr />

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>

          <small className="ml-5">
            Not Registered{" "}
            <a className="text-primary" href="/signup">
              <strong>Sign Up </strong>
            </a>
            now.
          </small>
          {this.props.isLoggedIn.message ? (
            <p className="text-danger text-center mt-3">
              <strong>{this.props.isLoggedIn.message}</strong>
            </p>
          ) : (
            <p className="mt-3">
              <span>&nbsp;</span>
            </p>
          )}
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Login);
