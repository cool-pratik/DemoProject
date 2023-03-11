import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default class RollList extends Component {
  constructor() {
    super()
    this.state = {
      list: [],
      "id": '',
      "name": "",
      "discription": ""
    }
  }
  update() {
    const url = "http://api.sunilos.com:9080/ORSP10/Role/search";
    axios.post(url, this.state).then((responce) => {
      // console.log(responce.data.result.data)
      this.setState({ list: responce.data.result.data })
    })
  }
  componentDidMount() {
    this.update();
  }
  delete(key) {
    const url = "http://api.sunilos.com:9080/ORSP10/Role/delete/" + key;
    axios.get(url).then((responce) => {
      // console.log(responce.data.result.data)
      this.update();
    })
  }
  render() {
    return (
      <div style={{ marginTop: '80px', textAlign: "center" }}>
        <h1 >LIST OF ROLL</h1>
        <hr />
        <form id="sign-in-form" className="text-left text-center">
          <span>
            <input type="text" name="name" placeholder='Search by Name' value={this.state.name}
              onChange={(event) => { this.setState({ name: event.target.value }) }} />
          </span> &nbsp; &nbsp; &nbsp;
          <span>
            <input type="text" name="address" placeholder='Search by Discription'
              value={this.state.discription} onChange={(event) => { this.setState({ discription: event.target.value }) }} />
          </span> &nbsp; &nbsp; &nbsp;
          <span className='bg-info'>
            <button type='button' onClick={() => this.update()}>Search</button>
          </span>
        </form>
        <hr />
        <Table striped bordered hover style={{ marginBottom: '100px' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>ID'S</th>
              <th>Name</th>
              <th>Discription</th>
              <th colSpan={2}>Operation</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.list.map((item, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.discription}</td>
                    <td><Link to={"/addrole/" + item.id} ><FontAwesomeIcon icon={faEdit} style={{color: "blue",fontSize:"25px"}} /></Link></td>
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
