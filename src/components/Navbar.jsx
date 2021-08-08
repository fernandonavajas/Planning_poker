import React from 'react';

const Navbar = () => {
  return (
    <header className="app-header">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">{this.props.title}</span>
          <div className="navbar-nav">
            <button type="button" className="btn btn-warning btn-sm"
                    onClick={this.props.updateDarkMode.bind()}>Dark Mode</button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
