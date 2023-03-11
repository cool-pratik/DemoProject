import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Registration extends Component {
  constructor() {
    super();
    this.state = {
      "firstName": '',
      "lastName": '',
      "loginId": '',
      "password": '',
      "roleId": '',
      epassword: '',
      "agree": true,
      "inputerror": {
        "lastName": "",
        "firstName": "",
        "loginId": "",
        "roleId": ""
      }
    }
  }
  reset() {
    this.setState({
      "firstName": '',
      "lastName": '',
      "loginId": '',
      "password": '',
      "roleId": '',
      "agree": true,
      epassword: '',
      "inputerror": {
        "lastName": "",
        "firstName": "",
        "loginId": "",
        "roleId": ""
      }
    })
  }
  register(event) {
    event.preventDefault();
    this.setState({
      epassword: '',
      "inputerror": {
        "lastName": "",
        "firstName": "",
        "loginId": "",
        "roleId": ""
      }
    })
    const url = "http://api.sunilos.com:9080/ORSP10/User/save"
    axios.post(url, this.state).then((response) => {
      // console.log(response.data)
      if (response.data.result.inputerror && this.state.password === '') {
        this.setState({ inputerror: response.data.result.inputerror, epassword: "must not be empty" })
      } else if (response.data.result.inputerror) {
        this.setState({ inputerror: response.data.result.inputerror })
      } else if (this.state.password === '') {
        this.setState({ epassword: "must not be empty" })
      } else if (response.data.result.message) {
        this.props.showAlert(response.data.result.message, "info")
      } else if (response.data.success) {
        this.props.showAlert("Registration success", "success")
      } else {
        this.props.showAlert("Role id incorrect", "danger")
      }
    })
  }
  render() {
    return (
      <div >
        <section
          className="vh-100 bg-image m-5"
        // style={{backgroundImage: url(require("../image/home.jpg"))}}
        >
          <div className="mask d-flex align-items-center h-50 gradient-custom-3">
            <div className="container h-50" style={{ width: "80%" }}>
              <div className="row d-flex justify-content-center align-items-center h-50">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div className="card" style={{ borderRadius: '50px', marginBottom: "200px" }}>
                    <div className="card-body ">
                      <h2 className="text-uppercase text-center mb-0">
                        Create an account
                      </h2>
                      <form className='p-5 '>
                        <div className="form-outline mb-1">
                          <label
                            className="form-label"
                            htmlFor="form3Example1cg"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            id="form3Example1cg"
                            className="form-control form-control-lg"
                            onChange={(event) => { this.setState({ firstName: event.target.value }) }}
                            placeholder="Enter first name"
                          />
                          <p style={{ color: 'red' }}>{this.state.inputerror.firstName}</p>
                        </div>
                        <div className="form-outline mb-1">
                          <label
                            className="form-label"
                            htmlFor="form3Example2cg"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="form3Example2cg"
                            className="form-control form-control-lg"
                            onChange={(event) => { this.setState({ lastName: event.target.value }) }}
                            placeholder="Enter last name"
                          />
                          <p style={{ color: 'red' }}>{this.state.inputerror.lastName}</p>
                        </div>
                        <div className="form-outline mb-1">
                          <label
                            className="form-label"
                            htmlFor="form3Example3cg"
                          >
                            Login id
                          </label>
                          <input
                            type="loginId"
                            id="form3Example3cg"
                            className="form-control form-control-lg"
                            onChange={(event) => { this.setState({ loginId: event.target.value }) }}
                            name="loginId"
                            placeholder="Enter login id"
                          />
                          <p style={{ color: 'red' }}>{this.state.inputerror.loginId}</p>
                        </div>
                        <div className="form-outline mb-1">
                          <label
                            className="form-label"
                            htmlFor="form3Example4cg"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="form3Example4cg"
                            className="form-control form-control-lg"
                            onChange={(event) => { this.setState({ password: event.target.value }) }}
                            name="password"
                            placeholder="Enter password"
                          />
                          <p style={{ color: 'red' }}>{this.state.epassword}</p>
                        </div>
                        <div className="form-outline mb-1">
                          <label
                            className="form-label"
                            htmlFor="form3Example6cg"
                          >
                            Role Id
                          </label>
                          <input
                            type="roleId"
                            id="form3Example6cg"
                            className="form-control form-control-lg"
                            onChange={(event) => { this.setState({ roleId: event.target.value }) }}
                            placeholder="Enter roll id"
                          />
                          <p style={{ color: 'red' }}>{this.state.inputerror.roleId}</p>
                        </div>
                        <div className="form-check d-flex justify-content-center mb-2">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            onChange={() => { this.setState({ agree: !this.state.agree }) }}
                            id="form2Example7cg"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="form2Example7cg"
                          >
                            I agree all statements in{" "}
                            <Link to="/" className="text-body">
                              <u>Terms of service</u>
                            </Link>
                          </label>
                        </div>
                        <div className="container">
                          <div className="row text-center">
                            <div className="col-sm-3 offset-2 ">
                              <button
                                type="button"
                                disabled={this.state.agree}
                                className="btn btn-success btn-block btn-lg gradient-custom-4 text-body "
                                onClick={(event) => { this.register(event) }}
                              >
                                Register
                              </button>
                            </div>
                            <div className="col-sm-3 offset-2 ">
                              <button
                                type="reset"
                                className="btn btn-primary btn-block btn-lg gradient-custom-4 text-body "
                                onClick={() => { this.reset() }}
                              >
                                Reset
                              </button>
                            </div>
                          </div>
                        </div>
                        <p className="text-center text-muted mt-1 mb-0">
                          Have already an account?{" "}
                          <Link to="/login" className="fw-bold text-body">
                            <u>Login here</u>
                          </Link>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
