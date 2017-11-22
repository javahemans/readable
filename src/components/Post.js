import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';


class Post extends Component {

  handleClick = () => {
      console.log("HandleClick here");
  }

  render(){

    const { post } = this.props;
    
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
          <div className="content" onClick={this.handleClick}>
            <Link to={`/posts/{post.title}`}>
            <p>
              <strong>{post.title}</strong>
              <br />
              {post.body}
            </p>
            </Link>
            <p>
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
    )
  }
}

export default Post;