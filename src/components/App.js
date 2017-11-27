import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
// import { connect } from 'react-redux';
// import { fetchPosts } from '../actions';
import PostsList from './PostsList';
import _ from 'lodash';
import { Route, Switch, Link } from 'react-router-dom';
import PostsNew from './posts_new';
import PostDetail from './post_detail';
import PostsEdit from './posts_edit';

import { v4 } from 'uuid';

window.v4 = v4;
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
        <Switch>
          <Route exact path ='/' component={PostsList} />
          <Route path ='/:category/posts' component={PostsList} />
          <Route exact path ='/posts/new' component={PostsNew} />
          <Route exact path ='/posts/:id' component={PostDetail} />
          <Route exact path ='/posts/:id/edit' component={PostsEdit} />

        </Switch>
          {/* <Route exact path="/:category/posts" render={({match, location}) => (
              <PostsList match={match} location={location}  />
          )} /> */}
      </div>
    );
  }
}


export default App;
//export default withRouter(App);
