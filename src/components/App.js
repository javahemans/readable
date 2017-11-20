import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
window.moment = moment;
class App extends Component {

  render() {

    const posts = [
      {
          "id": "8xf0y6ziyjabvozdd253nd",
          "timestamp": 1467166872634,
          "title": "Udacity is the best place to learn React",
          "body": "Everyone says so after all.",
          "author": "thingtwo",
          "category": "react",
          "voteScore": 6,
          "deleted": false,
          "commentCount": 2
      },
      {
          "id": "6ni6ok3ym7mf1p33lnez",
          "timestamp": 1468479767190,
          "title": "Learn Redux in 10 minutes!",
          "body": "Just kidding. It takes more than 10 minutes to learn technology.",
          "author": "thingone",
          "category": "redux",
          "voteScore": -5,
          "deleted": false,
          "commentCount": 0
      }
    ]
  
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
          {posts.map(post => {
            return (
          <article key={post.id} className="media">
            <figure className="media-left">
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
                  <small>By: {post.author}</small> <small> | {moment(post.timestamp).from()}</small>
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

export default App;
