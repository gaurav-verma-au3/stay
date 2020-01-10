import React, { Component } from "react";
import { mapStateToProps } from "../store";
import { connect } from "react-redux";
class Signup extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch({
      type: "SIGNUP_USER",
      payload: {
        name: e.target.name.value,
        email: e.target.email.value,
        pgName: e.target.pgName.value,
        password: e.target.password.value
      }
    });
  };
  render() {
    return (
      <div
        className="container d-flex align-items-center justify-content-center"
        style={{ height: "90vh" }}
      >
        <form
          className="p-5 border border-dark"
          onSubmit={e => this.handleSubmit(e)}
        >
          <h2 className="text-warning">Sign Up</h2>
          <hr />

          <div className="form-group mt-2">
            <label>Full Name</label>
            <input
              name="name"
              type="text"
              className="rounded form-control validate"
              placeholder="Full Name"
              required
            />
          </div>

          <div className="row">
            <div className="col-6">
              <div className="form-group mt-2">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  className="rounded form-control validate"
                  placeholder="E-Mail"
                  required
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group mt-2">
                <label>P.G. Name</label>
                <input
                  name="pgName"
                  type="text"
                  className="rounded form-control validate"
                  placeholder="P.G. Name"
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div className="form-group mt-2">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  className="rounded form-control validate"
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group mt-2">
                <label>Re-Enter Password</label>
                <input
                  name="RePassword"
                  type="password"
                  className="rounded form-control validate"
                  placeholder="Re-Type Password"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group mt-3">
            <button type="submit" className="rounded btn btn-primary ">
              Sign Up
            </button>
            <small className="ml-5">
              Already Registered{" "}
              <a className="text-warning" href="/login">
                <strong>Login </strong>
              </a>
              now.
            </small>
          </div>
          {this.props.signupResponse ? (
            this.props.signupResponse.error ? (
              <p className="text-danger text-center mt-5">
                <strong>{this.props.signupResponse.message}</strong>
              </p>
            ) : (
              <p className="text-success text-center mt-5">
                <strong>{this.props.signupResponse.message}</strong>
              </p>
            )
          ) : (
            <p className="mt-5">
              <span>&nbsp;</span>
            </p>
          )}
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Signup);
