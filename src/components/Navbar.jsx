import React, { Component } from 'react'
import socket from '../socketConfig';


export class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  googleLogin() {
    socket.emit('google_login');
  }

  googleLogout() {
    socket.emit('google_logout');
  }

  render() {

    let title = this.props.title

    return (
      <header className="app-header">
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand mb-0 h1" href="/">{title}</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <button type="button" className="btn btn-info" id="googleLogin" onClick={this.googleLogin.bind()}>Login with Google</button>
                </li>
                <li className="nav-item">
                  <button type="button" className="btn btn-secondary" id="Logout" onClick={this.googleLogout.bind()}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default Navbar
