import axios from 'axios';
import React, { Component } from 'react'
import withRouter from './withRouter';


class UserAdd extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      loginId: '',
      password: '',
      roleId: '',
      message: '',
      id: '',
      epassword: '',
      inputerror: {
        "firstName": "",
        "lastName": "",
        "loginId": "",
        "roleId": ""
      }
    }
    if (this.props.params.id) {
      this.get()
    }
  }
  get() {
    const url = "http://api.sunilos.com:9080/ORSP10/Auth/get/" + this.props.params.id;
    axios.get(url).then((response) => {
      this.setState({
        firstName: response.data.result.data.firstName,
        lastName: response.data.result.data.lastName,
        loginId: response.data.result.data.loginId,
        password: response.data.result.data.password,
        roleId: response.data.result.data.roleId,
        id: response.data.result.data.id
      });
    });
  }
  reset() {
    this.setState({
      firstName: '',
      lastName: '',
      loginId: '',
      password: '',
      roleId: '',
      message: '',
      data: '',
      epassword: '',
      inputerror: {
        "firstName": "",
        "lastName": "",
        "loginId": "",
        "roleId": ""
      }
    })
  }

  submit(event) {
    event.preventDefault();
    this.setState({
      epassword: '',
      inputerror: {
        "firstName": "", "lastName": "", "loginId": "", "roleId": ""
      }
    })
    let url = "http://api.sunilos.com:9080/ORSP10/User/save";
    axios.post(url, this.state).then((response) => {
      // console.log(response.data.result)
      if (response.data.result.inputerror && this.state.password === "") {
        this.setState({ inputerror: response.data.result.inputerror, epassword: 'must not be empty' })
      } if (response.data.result.inputerror) {
        this.setState({ inputerror: response.data.result.inputerror })
      } if (this.state.password === "") {
        this.setState({ epassword: 'must not be empty' })
      } else if (response.data.result.message === "loginId already exists") {
        this.props.showAlert("loginId already exists", "info")
      } else if (!response.data.success) {
        this.props.showAlert("Role id incorrect", "danger")
      } else {
        this.props.showAlert("UserId loaded successfully!!!", "success")
      }
    })
  }
  render() {
    return (
      <div>
        <section
          className="vh-100 bg-image"
          style={{ backgroundImage: (require("../image/home.jpg")) }}
        >
          <div className="mask d-flex align-items-center h-50 gradient-custom-3">
            <div className="container h-50" style={{ width: "800px" }}>
              <div className="row d-flex justify-content-center align-items-center h-50">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div className="card p-5" style={{ borderRadius: '30px', marginBottom: "100px" }}>
                    <h1 className=" d-flex justify-content-center align-items-center">
                      {
                        this.props.params.id ? "EDIT USER" : "ADD USER"
                      }
                    </h1>
                    <div className="card-body ">
                      <form >
                        <div className="form-outline mb-2">
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
                            name='firstName'
                            value={this.state.firstName}
                            placeholder="Enter first name"
                          />
                          <div style={{ color: "red" }}> <p>{this.state.inputerror.firstName}</p></div>
                        </div>
                        <div className="form-outline mb24">
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
                            name='lastName'
                            value={this.state.lastName}
                            required
                            placeholder="Enter last name"
                          />
                          <div style={{ color: "red" }}> <p>{this.state.inputerror.lastName}</p></div>
                        </div>

                        <div className="form-outline mb-2">
                          <label
                            className="form-label"
                            htmlFor="form3Example3cg"
                          >
                            Email id
                          </label>
                          <input
                            type="email"
                            id="form3Example3cg"
                            className="form-control form-control-lg"
                            onChange={(event) => { this.setState({ loginId: event.target.value }) }}
                            name="loginId"
                            value={this.state.loginId}
                            required
                            placeholder="Enter email id"
                          />
                          <div style={{ color: "red" }}> <p>{this.state.inputerror.loginId}</p></div>
                        </div>
                        <div className="form-outline mb-2">
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
                            value={this.state.password}
                            placeholder="Enter password"
                          />
                          <div style={{ color: "red" }}> <p>{this.state.epassword}</p></div>
                        </div>
                        <div className="form-outline mb-2">
                          <label
                            className="form-label"
                            htmlFor="role1"
                          >
                            Role id
                          </label>
                          <input
                            type="role"
                            id="role1"
                            className="form-control form-control-lg"
                            onChange={(event) => { this.setState({ roleId: event.target.value }) }}
                            name="roleId"
                            value={this.state.roleId}
                            placeholder="Enter roll id"
                          />
                          <div style={{ color: "red" }}> <p>{this.state.inputerror.roleId}</p></div>
                        </div>
                        {/* <div style={{ color: "green" }}> <p>{this.state.data}</p></div> */}
                        <div className='row'>
                          <div className='col-md-6 d-flex justify-content-center align-items-center'>
                            <button
                              type="btn"
                              className="btn btn-success btn-block btn-lg gradient-custom-4 text-body "
                              onClick={(event) => { this.submit(event) }}
                            >
                              {
                                this.props.params.id ? "Update" : "AddUser"
                              }
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
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
export default withRouter(UserAdd);