import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import PostsList from './PostsList';
import _ from 'lodash';
window._ = _; // Debugging lodash in console.
window.moment = moment; // Debugging moment in console.

class App extends Component {

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {

  // The response is an object with categories as a key and value being an array. 
  const category_response = {
        "categories": [
            {
                "name": "react",
                "path": "react"
            },
            {
                "name": "redux",
                "path": "redux"
            },
            {
                "name": "udacity",
                "path": "udacity"
            }
        ]
    }

    const { posts } = this.props;
    
    console.log("posts is, ",posts)
    
    return (
      <div className="App">
        <nav className="navbar" role="navigation" aria-label="main navigation">
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
        <section>
          <div className="container">
            <nav className="level">
              <div className="level-item has-text-centered">
                <p className="level-item"><a href="/">ALL</a></p>
              </div>
            {category_response["categories"].map(cat => {
              return (
                <div key={cat.path} className="level-item has-text-centered">
                  <p className="level-item"><a href={cat.path}>{cat.name}</a></p>
                </div>
              )
            })}
            </nav>
            <hr />
          </div>
        </section>
        <section>
          <div className="container">
            <nav className="level">
              <div className="level-left">
                <div className="level-item">
                <p className="control has-icons-left">
                  <span className="select">
                    <select>
                      <option>Votescore</option>
                      <option>Post Date</option>
                    </select>
                  </span>
                  <span className="icon is-small is-left">
                    <i className="fa fa-filter"></i>
                  </span>
                </p>
                </div>
              </div>
              <div className="level-right">
                <div className="level-item"><a className="button is-success">New Post</a></div>
              </div>
            </nav>
            <hr/>          
          </div>
        </section>
        <PostsList posts={posts} />
      </div>
    );
  }
}


function mapStateToProps({ posts }){ // ES6: equivalent to state here and then const posts = state.posts in the body.
  return { posts }; // ES6 as opposed to posts:posts
}

// export default App;
export default connect(mapStateToProps, { fetchPosts })(App);