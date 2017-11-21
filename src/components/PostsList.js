import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

class PostsList extends Component {

  render() {

    const { posts } = this.props;
    
    return(
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
    );
  }
}

export default PostsList;