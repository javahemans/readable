import React, { Component } from 'react';
import { fetchPostDetail, votePost } from '../actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

class PostDetail extends Component {

  fetchData = () => {
    this.props.fetchPostDetail(this.props.match.params.id)
  }

  componentDidMount() {
    this.fetchData()
  }


  render() {

    const { id } = this.props.match.params;
    const { posts } = this.props;
    
    // Is this the correct way to prevent loading data too early?
    if (!posts || !posts["lists"]) {
      return (<div>Loading</div>);
    } 

    const post = posts["lists"][id];

    // console.log("Post Detail Page", this.props.match.params.id, posts, post);


    return (
      <div className="container">
      <article key={post.id} className="media">
        <figure className="media-left votebox">
          <p className="has-text-centered">
          <span className="icon" onClick={() => this.props.votePost("upVote", post.id)}><i className="fa fa-caret-up fa-3x"></i></span>
          </p>
          <p className="has-text-centered has-text-info is-size-4">
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
        <div className="media-right">
          <button className="delete"></button>
          &nbsp;&nbsp;&nbsp;
          <Link to={`/posts/${post.id}/edit`}><i className="fa fa-pencil" aria-hidden="true"></i></Link>
        </div>
      </article>

      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps ){ // ES6: equivalent to state here and then const posts = state.posts in the body.
  // The rationale here for using ownProps is to just return the post requested, and not the entire {posts} object. But I
  // can't get this logic to work.
  return { posts }; // ES6 as opposed to posts:posts
}

// export default App;
export default  withRouter( connect(mapStateToProps, { fetchPostDetail, votePost })(PostDetail) );