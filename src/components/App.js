import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
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
        <section>
        <div className="container">
          {_.map(posts, post => {
            return (
          <article key={post.id} className="media">
            <figure className="media-left votebox">
              <p className="has-text-centered">
              <span className="icon"><i className="fa fa-caret-up fa-3x"></i></span>
              </p>
              <p className="has-text-centered has-text-info is-size-4">
              {post.voteScore}
              </p>
              <p className="has-text-centered">
              <span className="icon"><i className="fa fa-caret-down fa-3x"></i></span>
              </p>

            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{post.title}</strong>
                  <br />
                  {post.body}
                  <br />
                  <small>In <i>{post.category}</i>, by: {post.author}</small> <small> | {moment(post.timestamp).from()}</small>
                </p>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                  <a className="level-item">
                  {post.commentCount}&nbsp; <span className="icon is-small"><i className="fa fa-comments"></i></span>
                  </a>
                </div>
              </nav>
            </div>
          </article>
        );
          })}
        </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps({posts}){
  return { posts };
}

// export default App;
export default connect(mapStateToProps, { fetchPosts })(App);