import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
// import { connect } from 'react-redux';
// import { fetchPosts } from '../actions';
import PostsList from './PostsList';
import _ from 'lodash';
import { Route, withRouter} from 'react-router-dom';

window._ = _; // Debugging lodash in console.
window.moment = moment; // Debugging moment in console.

class App extends Component {

  render() {
    
    return (
      <div className="App">
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
        <section className="section">
          <div className="container">
            <h1 className="title">
              Readable
            </h1>
            <p className="subtitle">
              REACT Nanodegree P2 
            </p>
          </div>
        </section>
          <Route exact path ='/' component={PostsList} />
          <Route path ='/:category/posts' component={PostsList} />
        {/* <Route exact path="/:category/posts" render={({match, location}) => (
            <PostsList match={match} location={location}  />
        )} /> */}

        {/* <PostsList posts={posts} /> */}
      </div>
    );
  }
}


export default App;
//export default withRouter(App);
