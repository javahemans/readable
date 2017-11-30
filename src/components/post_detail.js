import React, { Component } from 'react';
import { fetchPostDetail, votePost, deletePost, fetchComments, voteComment, toggleCommentView, editComment, deleteComment } from '../actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import CommentsNew from './comments_new';
import CommentsEdit from './comments_edit';

class PostDetail extends Component {

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchPostDetail(id);
    this.props.fetchComments(id);    
  }

  handleDelete = (id) => {
    this.props.deletePost(this.props.match.params.id, () => {
      this.props.history.push('/')
    });
  }

  handleCommentDelete = (CommentId) => {
    console.log("Been called to delete a comment");
    this.props.deleteComment(CommentId)
  }


  render() {

    // const { id } = this.props.match.params;
    // const { posts } = this.props;
    
    // Is this the correct way to prevent loading data too early?
    // if (!posts || !posts["lists"] || !posts["lists"][id]) {
    //   return (<div>Loading</div>);
    // } 

    // const post = posts["lists"][id];

    // console.log("Post Detail Page", this.props.match.params.id, posts, post);

    const { post, comments } = this.props;

    if(!post) {
      return (
        <div>Null</div>
      );
    }

    const orderedComments =  _.orderBy(comments["comments"], 'voteScore', 'desc' );
    // console.log("orderedComments is, ",comments["comments"], orderedComments );

    return (
      <div className="container">
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
                <div className="level-item has-text-centered">
                  <div>
                  <a>{post.commentCount}&nbsp;<i className="fa fa-comments"></i></a>                  
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                  <a onClick={this.handleDelete}><span className="icon comment"><i className="fa fa-times"></i></span></a>                  
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                  <Link to={`/posts/${post.id}/edit`}><span className="icon comment"><i className="fa fa-pencil"></i></span></Link>
                  </div>
                </div>
              </nav>              
            
          </div>

          <div className="media-right">
          </div>
        </article>
        <hr />

        <nav className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <p className="subtitle is-5">
                <strong>Comments</strong>
              </p>
            </div>
          </div>
          <div className="level-right">
          </div>
        </nav>

        <CommentsNew />

        {_.map(orderedComments, comment => {

        if(comments["editingCommentId"]===comment.id) {
          return(
            <article key={comment.id} className="media">
              <CommentsEdit comment={comment}/>
            </article>
            );
        } else {
          return (
           
        <article key={comment.id} className="media commentItem">
          <figure className="media-left votebox">
            <p className="has-text-centered has-text-info is-size-4 image is-48x48">
              {comment.voteScore}
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{comment.author}</strong>&nbsp;·&nbsp;{moment(comment.timestamp).from()}
                <br />
                {comment.body}
                <br />
              </p>
              <nav className="level is-mobile">
                <div className="level-item has-text-centered">
                  <div>
                  <a><span className="icon comment" onClick={() => this.props.toggleCommentView(comment.id)}><i className="fa fa-pencil"></i></span></a>                  
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                  <a><span className="icon comment" onClick={() => this.handleCommentDelete(comment.id)}><i className="fa fa-times"></i></span></a>                  
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                  <a><span className="icon comment" onClick={() => this.props.voteComment("upVote", comment.id)}><i className="fa fa-caret-up fa-2x"></i></span></a>                  
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                  <a><span className="icon comment" onClick={() => this.props.voteComment("downVote", comment.id)}><i className="fa fa-caret-down fa-2x"></i></span></a>
                  </div>
                </div>
              </nav>              
            </div>
          </div>
        </article>
        )};
        })}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps ){ // ES6: equivalent to state here and then const posts = state.posts in the body.
  // The rationale here for using ownProps is to just return the post requested, and not the entire {posts} object. 
  // For examlpe, this page will have a match.params.id prop available in ownProps.
  
  return {
    post: state.posts && state.posts["lists"] && state.posts["lists"][ownProps.match.params.id],
    comments: state.comments
  };
}

// export default App;
export default  withRouter( connect(mapStateToProps, { fetchPostDetail, votePost, deletePost, fetchComments, voteComment, toggleCommentView, editComment, deleteComment })(PostDetail) );