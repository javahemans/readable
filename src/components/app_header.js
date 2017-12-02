import React from 'react';
import { Link } from 'react-router-dom';


const Header = (props) => {
  return (
    <div>
      <nav className="navbar" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://www.nagibtharani.com">READABLE | UDACITY-P2</a>
          <button className="button navbar-burger">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
      <section className="section is-hidden-mobile">
        <div className="container">
          <h1 className="title">
            Readable
          </h1>
          <p className="subtitle">
            REACT Nanodegree P2 
          </p>
        </div>
      </section>
      <section>
        <div className="container">
          <nav className="level">
            <div className="level-left">
              <div className="level-item"><Link to="/" className="button">Home</Link></div>
            </div>
            <div className="level-right">
              <div className="level-item"><Link to="/posts/new" className="button is-success">New Post</Link></div>
            </div>
          </nav>
          <hr/>          
        </div>
      </section>
    </div>
  )
}

export default Header;