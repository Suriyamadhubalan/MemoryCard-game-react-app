import React from 'react'
import controller from '../public/controller.png'

function Navbar() {
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center" href="#">
                    <img src={controller} alt="MiniGames Logo" className="brand-logo"/>
                    MiniGames
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Memory Game</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" aria-disabled="true" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Coming Soon"> X/O Game </a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar