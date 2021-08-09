import React from 'react';


const Navbar = (props) => {
  return (
    <header className="app-header">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">{props.title}</span>
          <div className="navbar-nav">
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
