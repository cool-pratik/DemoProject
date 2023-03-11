import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faHome, faSignIn, faUser } from '@fortawesome/free-solid-svg-icons'

export default class Dashboard1 extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
          <div className="container-fluid">

            <img src={require("../image/rays.png")} alt="..." width="100" height="50" style={{ borderRadius: "12px" }} />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/"><FontAwesomeIcon icon={faHome} style={{ color: "blue", fontSize: "20px", marginLeft: "25px" }} /></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/registration"><FontAwesomeIcon icon={faUser} style={{ color: "blue" }} /> Registration</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/login"><FontAwesomeIcon icon={faSignIn} style={{ color: "blue" }}/> Login </Link>
                </li>
              </ul>

            </div>
          </div>
        </nav>

      </div>
    )
  }
}
