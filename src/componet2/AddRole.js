import axios from 'axios';
import React, { Component } from 'react'
import withRouter from './withRouter';

class AddRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      name: '',
      discription: '',
      id: "",
      // done: "",
      inputerror: {
        name: '',
        discription: ''
      }
    }
    if (this.props.params.id) {
      this.get();
    }
  }
  get() {
    const url = "http://api.sunilos.com:9080/ORSP10/Role/get/" + this.props.params.id;
    axios.get(url).then((response) => {
      this.setState({
        name: response.data.result.data.name,
        discription: response.data.result.data.discription,
        id: response.data.result.data.id
      })
    })
  }
  reset() {
    this.setState({
      name: '',
      discription: '',
      // data: "",
      // done: '',
      inputerror: {
        name: '',
        discription: ''
      }
    })
  }
  submit(event) {
    event.preventDefault();
    this.setState({ data: "", inputerror: { name: '', discription: '' } })
    const url = "http://api.sunilos.com:9080/ORSP10/Role/save"
    axios.post(url, this.state).then((response) => {
      this.setState({ list: response.data.result.data })
      // console.log(response.data)

      if (response.data.result.inputerror) {
        this.setState({ inputerror: response.data.result.inputerror })
      } else if (response.data.result.message === "name already exists") {
        // this.setState({ done: "Name Already exists" })
        this.props.showAlert("Name Already exists !!!", "info")

      } else if (response.data.result.message) {
        // this.setState({ data: "could not execute this statement please change this description." })
        this.props.showAlert("could not execute this statement please change this description.", "danger")
      } else {
        // this.setState({ done: "Success" })
        this.props.showAlert("RoleId loaded successfully !!!", "success")
      }

    })

  }
  render() {
    // console.log(this.props)
    return (
      <div className="container" style={{ marginTop: '150px', width: "40%", border: "1px solid gray", borderRadius: "30px" }}>
        <h3 style={{ textAlign: "center" }}>
          {
            this.props.params.id ? "EDIT ROLL" : "ADD ROLL"
          }

        </h3>
        {/* <h3 style={{ colore: "green" }}> {this.state.done}</h3> */}
        <form className='p-4'>
          <div className="form-group pb-3">
            <label htmlFor="exampleInputEmail1">Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Name"
              onChange={(event) => {
                this.setState({ name: event.target.value });
              }}
              name="name"
              value={this.state.name}
            />
          </div>
          <p style={{ color: "red" }}>{this.state.inputerror.name}</p>
          <div className="form-group pb-3">
            <label htmlFor="exampleInputPassword1">Discription</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter discription"
              onChange={(event) =>
                this.setState({ discription: event.target.value })
              }
              name="discription"
              value={this.state.discription}
            />
          </div>
          <p style={{ color: "red" }}>{this.state.inputerror.discription}</p>

          {/* <h6 style={{ color: "red" }}>{this.state.data}</h6> */}

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
    );
  }
}
export default withRouter(AddRole); 