import axios from "axios";
import React, { Component } from "react";
// import * as ReactDOM from 'react-dom';
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import App1 from "./App1";
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginId: "",
      password: "",
      "inputerror": {
        "password": "",
        "loginId": ""
      }
    };
  }
  submit(event) {
    event.preventDefault();
    this.setState({
      data: "", loginId: "", password: "", message: '',
      "inputerror": {
        "password": "", "loginId": ""
      }
    })
    const url = "http://api.sunilos.com:9080/ORSP10/Auth/login"
    axios.post(url, this.state).then((response) => {
      console.log(response.data)
      if (response.data.result.inputerror) {
        this.setState({ inputerror: response.data.result.inputerror })
      } else if (response.data.result.message) {
        this.props.showAlert(response.data.result.message, "info")
      }
      else if (response.data.success) {
        localStorage.setItem("Name", response.data.result.data.name)
   

        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(
          <React.StrictMode>
            <App1 />
          </React.StrictMode>
        );
      } else { this.setState({ data: "Ab kya hai bhai" }) }
    })
  }
  reset() {
    this.setState({
      loginId: "",
      password: "",
      data: "",
      "inputerror": {
        "password": "",
        "loginId": ""
      }
    })
  }

  render() {
    return (
      <div className="container" style={{ marginTop: '80px', width: "30%", border: "1px solid gray", padding: "30px", borderRadius: "50px" ,backgroundColor:"white"}}>
        <h1 className="text-uppercase text-center mb-5">LOGIN FORM</h1>
        <form >
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(event) => {
                this.setState({ loginId: event.target.value });
              }}
              name="loginId"
              value={this.state.loginId}
            />
            <p style={{ color: "red", margin: "10px" }}>{this.state.inputerror.loginId}</p>
          </div>&nbsp;
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
              name="password"
              value={this.state.password}
            />
            <p style={{ color: "red", margin: "10px" }}>{this.state.inputerror.password}</p>
          </div>
          <h3 style={{ color: "green", margin: "10px" }}>{this.state.data}</h3>
          <div className='row pt-3'>
            <div className='col-md-6 d-flex justify-content-center align-items-center'>
              <button
                type="btn"
                className="btn btn-success btn-block btn-lg gradient-custom-4 text-body "
                onClick={(event) => { this.submit(event) }}
              >
                Submit
              </button>
            </div>
            <div className='col-md-6 d-flex justify-content-center align-items-center'>
              <button
                type="reset"
                className="btn btn-primary btn-block btn-lg gradient-custom-4 text-body "
                onClick={() => { this.reset() }}
              >
                Reset
              </button>
            </div>
          </div>
          <p className="text-center text-muted mt-1 mb-0">
            You have no an account?{" "}
            <Link to="/registration" className="fw-bold text-body">
              <u>Create an account</u>
            </Link>
          </p>
        </form>
      </div>
    );
  }
}
