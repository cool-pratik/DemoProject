import React, { Component } from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default class UserList extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      firstName: '',
      lastName: '',
      loginId: '',
      password: '',
      roleId: '',
      id: ''
    }
  }


  update() {
    let url = "http://api.sunilos.com:9080/ORSP10/User/search";
    axios.post(url, this.state).then((res) => {
      this.setState({ list: res.data.result.data })
      // console.error(this.state.list)
    }
    )
  }
  componentDidMount() {
    this.update();
  }
  delete(key) {
    let url = "http://api.sunilos.com:9080/ORSP10/User/delete/" + key;
    axios.get(url).then((res) => {
      this.update();
    })
  }
  render() {
    return (
      <div style={{ marginTop: '80px', textAlign: "center" }}>
        <h1 >LIST OF USER</h1>
        <hr />
        <form id="sign-in-form" className="text-left text-center">
          <span>
            <input type="text" name="name" placeholder='Search by First name' value={this.state.firstName}
              onChange={(event) => { this.setState({ firstName: event.target.value }) }} />
          </span> &nbsp; &nbsp; &nbsp;
          <span>
            <input type="text" name="address" placeholder='Search by Last name'
              value={this.state.lastName} onChange={(event) => { this.setState({ lastName: event.target.value }) }} />
          </span> &nbsp; &nbsp; &nbsp;
          <span className='bg-info'>
            <button type='button' onClick={() => this.update()}>Search</button>
          </span>
        </form>
        <hr />
        <Table striped bordered hover >
          <thead>
            <tr >
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email id's</th>
              <th>Role id's</th>
              <th colSpan={2} >Operation</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.list.map((item, i) => {
                return (
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.loginId}</td>
                    <td>{item.roleId}</td>
                    <td> <Link to={"/adduser/" + item.id} ><FontAwesomeIcon icon={faEdit} style={{color: "blue",fontSize:"25px"}} /></Link></td>
                    <td><button type='button' onClick={() => this.delete(item.id)}><FontAwesomeIcon icon={faTrash} style={{color: "red"}} /></button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </div>
    )
  }
}
