import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { Routes, Route, Link } from 'react-router-dom';
// import AddMarksheet from './AddMarksheet';

export default class MarksheetList extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      "name": null,
      "rollNo": null,
      "studentId": null,
      "physics": null,
      "chemistry": null,
      "maths": null,
      "id": '',
      "data": '',
      "toggle": false
    }
  }
  update() {
    const url = "http://api.sunilos.com:9080/ORSP10/Marksheet/search";
    axios.post(url, this.state).then((responce) => {
      this.setState({ list: responce.data.result.data })
    })
  }
  componentDidMount() {
    this.update();
  }
  delete(key) {
    const url = "http://api.sunilos.com:9080/ORSP10/Marksheet/delete/" + key;
    axios.get(url).then((responce) => {
      this.update();
    })
  }
  render() {
    return (
      <div style={{ marginTop: '80px', textAlign: 'center' }}>
        <h1 >LIST OF MARKSHEET</h1>
        <hr />
        <form id="sign-in-form" className="text-left text-center">
          <span>
            <input type="text" name="name" placeholder='Search by Name' value={this.state.name}
              onChange={(event) => { this.setState({ name: event.target.value }) }} />
          </span> &nbsp; &nbsp; &nbsp;
          <span>
            <input type="text" name="address" placeholder='Search by Roll number'
              value={this.state.rollNo} onChange={(event) => { this.setState({ rollNo: event.target.value }) }} />
          </span> &nbsp; &nbsp; &nbsp;
          <span className='bg-info'>
            <button type='button' onClick={() => this.update()}>Search</button>
          </span>
        </form>
        <hr />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Physics</th>
              <th>Chamistry</th>
              <th>Mathamatics</th>
              <th colSpan={2}>Operation</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.list.map((item, i) => {
                return (
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.rollNo}</td>
                    <td>{item.physics}</td>
                    <td>{item.chemistry}</td>
                    <td>{item.maths}</td>
                    <td>
                      <Link to={'/addmark/' + item.id}><FontAwesomeIcon icon={faEdit} style={{color: "blue",fontSize:"25px"}} /></Link></td>
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

