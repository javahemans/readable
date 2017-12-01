import React, { Component } from 'react';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
import { votePost } from '../actions';
import { connect } from 'react-redux';


class PostItem extends Component {

  // This will be moved to Redux and passed down as a prop.
  handleLocalClick = () => {
      console.log("HandleLocalClick Triggered. This should be a prop via redux");
  }

  render(){

    const { post } = this.props;
    
    return (
      <article key={post.id} className="media">
        <figure className="media-left votebox">
          <p className="has-text-centered">
          <span className="icon" onClick={() => this.props.votePost("upVote", post.id)}><i className="fa fa-caret-up fa-3x"></i></span>
          </p>
          <p className="has-text-centered has-text-info is-size-4 image is-48x48">
          {post.voteScore}
          </p>
          <p className="has-text-centered">
          <span className="icon" onClick={() => this.props.votePost("downVote", post.id)}><i className="fa fa-caret-down fa-3x"></i></span>
          </p>
        </figure>

        <div className="media-content">
          <div className="content" onClick={this.handleClick}>
            <Link to={`/posts/${post.id}`}>
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

function mapStateToProps({ posts }){ // ES6: equivalent to state here and then const posts = state.posts in the body.
  return { posts }; // ES6 as opposed to posts:posts
}

// export default App;
export default  withRouter( connect(mapStateToProps, { votePost })(PostItem) );