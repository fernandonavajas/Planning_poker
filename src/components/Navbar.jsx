import React from 'react';


const Navbar = (props) => {
  return (
    <header className="app-header">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand mb-0 h1" href="/">{props.title}</a>
          <div className="navbar-nav">
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
