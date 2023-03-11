import React, { Component } from 'react'
import axios from 'axios'
import withRouter from './withRouter';

class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      "firstName": "",
      "lastName": "",
      "collegeId": "",
      "mobileNo": "",
      "email": "",
      "id": "",
      toggle: false,
      inputerror: {
        "firstName": "",
        "lastName": "",
        "collegeId": "",
        "mobileNo": "",
        "email": ""
      }
    }
    if (this.props.params.id) {
      this.get();
    }
  }
  get() {
    const url = "http://api.sunilos.com:9080/ORSP10/Student/get/" + this.props.params.id;
    axios.get(url).then((response) => {
      // console.warn("response", response)
      this.setState({
        "firstName": response.data.result.data.firstName,
        "lastName": response.data.result.data.lastName,
        "collegeId": response.data.result.data.collegeId,
        "mobileNo": response.data.result.data.mobileNo,
        "email": response.data.result.data.email,
        "id": response.data.result.data.id
      })
    })
  }
  reset() {
    this.setState({
      "firstName": "",
      "lastName": "",
      "collegeId": "",
      "mobileNo": "",
      "email": "",
      toggle: false,
      inputerror: {
        "firstName": "",
        "lastName": "",
        "collegeId": "",
        "mobileNo": "",
        "email": ""
      }
    })
  }
  valid() {
    if (this.state.toggle) {
      this.props.showAlert("StudentInfo Already exists", "info")
    } else { return true }
  }
  submit(event) {
    event.preventDefault();
    this.setState({
      inputerror: {
        "firstName": "", "lastName": "", "collegeId": "", "mobileNo": "", "email": ""
      }
    })
    if (this.valid()) {
      const url = "http://api.sunilos.com:9080/ORSP10/Student/save";
      axios.post(url, this.state).then((response) => {
        // console.log(response.data.success)
        if (response.data.result.inputerror) {
          this.setState({ inputerror: response.data.result.inputerror })
        } else {
          this.props.showAlert("Student id loaded successfully", "success")
          this.setState({ toggle: true })
        }
      })
    }
  }
  render() {
    // console.log(this.props.name)
    return (
      <div >
        <section
          className="vh-100 bg-image"
        // style={{backgroundImage: url(require("../image/home.jpg"))}}
        >
          <div className="mask d-flex align-items-center h-50 gradient-custom-3">
            <div className="container h-50" style={{ width: "800px" }}>
              <div className="row d-flex justify-content-center align-items-center h-50">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div className="card" style={{ borderRadius: '30px', marginBottom: "100px" }}>
                    <h3 className=" d-flex justify-content-center align-items-center">
                      {
                        this.props.params.id ? "EDIT STUDENTS" : "ADD STUDENTS"
                      }
                    </h3>
                    <div className="card-body p-2">
                      <form >
                        <div className="form-outline mb-3">
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
                          />
                          <div style={{ color: "red" }}><p>{this.state.inputerror.firstName}</p></div>
                        </div>
                        <div className="form-outline mb-3">
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
                          />
                          <div style={{ color: "red" }}><p>{this.state.inputerror.lastName}</p></div>
                        </div>
                        <div className="form-outline mb-3">
                          <label
                            className="form-label"
                            htmlFor="form3Example3cg"
                          >
                            College id
                          </label>
                          <input
                            type="number"
                            id="form3Example3cg"
                            className="form-control form-control-lg"
                            onChange={(event) => { this.setState({ collegeId: event.target.value }) }}
                            name="collegeId"
                            value={this.state.collegeId}
                          />
                          <div style={{ color: "red" }}><p>{this.state.inputerror.collegeId}</p></div>
                        </div>
                        <div className="form-outline mb-3">
                          <label
                            className="form-label"
                            htmlFor="form3Example4cg"
                          >
                            Mobile number
                          </label>
                          <input
                            type="number"
                            id="form3Example4cg"
                            className="form-control form-control-lg"
                            onChange={(event) => { this.setState({ mobileNo: event.target.value }) }}
                            name="mobileNo"
                            value={this.state.mobileNo}
                          />
                          <div style={{ color: "red" }}><p>{this.state.inputerror.mobileNo}</p></div>
                        </div>
                        <div className="form-outline mb-2">
                          <label
                            className="form-label"
                            htmlFor="form3Example4cg"
                          >
                            Email id
                          </label>
                          <input
                            type="text"
                            id="form3Example4cg"
                            className="form-control form-control-lg"
                            onChange={(event) => { this.setState({ email: event.target.value }) }}
                            name="email"
                            value={this.state.email}
                          />
                          <div style={{ color: "red" }}><p>{this.state.inputerror.email}</p></div>
                        </div>
                        <div className='row pt-3'>
                          <div className='col-md-6 d-flex justify-content-center align-items-center'>
                            <button
                              type="btn"
                              className="btn btn-success btn-block btn-lg gradient-custom-4 text-body "
                              onClick={(event) => { this.submit(event) }}
                            >
                              {
                                this.props.params.id ? "Update" : "Add"
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
export default withRouter(AddStudent);