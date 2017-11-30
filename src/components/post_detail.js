import React, { Component } from 'react';
import { fetchPostDetail, votePost, deletePost } from '../actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

class PostDetail extends Component {

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchPostDetail(id);
  }

  handleDelete = (id) => {
    this.props.deletePost(this.props.match.params.id, () => {
      this.props.history.push('/')
    });
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

    const { post } = this.props;

    if(!post) {
      return (
        <div>Null</div>
      );
    }

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

            <nav class="level is-mobile">
                <div class="level-item has-text-centered">
                  <div>
                  <a>{post.commentCount}&nbsp;<i className="fa fa-comments"></i></a>                  
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                  <a onClick={this.handleDelete}><span className="icon comment" onClick={() => this.props.votePost("upVote", post.id)}><i className="fa fa-times"></i></span></a>                  
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                  <Link to={`/posts/${post.id}/edit`}><span className="icon comment" onClick={() => this.props.votePost("downVote", post.id)}><i className="fa fa-pencil"></i></span></Link>
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
            <p className="level-item"><a class="button is-success">Add Comment</a></p>
          </div>
        </nav>


        <article className="media">
          <figure className="media-left">
            <p className="image is-48x48">
              <img src="https://bulma.io/images/placeholders/96x96.png" />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>Sean Brown</strong>
                <br />
                Donec sollicitudin urna eget eros malesuada sagittis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam blandit nisl a nulla sagittis, a lobortis leo feugiat.
                <br />
                <p className=" is-6">2 hrs ago</p>

              </p>
              <nav class="level is-mobile">
                <div class="level-item has-text-centered">
                  <div>
                  <a><span className="icon comment" onClick={() => this.props.votePost("downVote", post.id)}><i className="fa fa-pencil"></i></span></a>                  
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                  <a><span className="icon comment" onClick={() => this.props.votePost("upVote", post.id)}><i className="fa fa-times"></i></span></a>                  
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                  <a><span className="icon comment" onClick={() => this.props.votePost("upVote", post.id)}><i className="fa fa-caret-up fa-2x"></i></span></a>                  
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                  <a><span className="icon comment" onClick={() => this.props.votePost("downVote", post.id)}><i className="fa fa-caret-down fa-2x"></i></span></a>
                  </div>
                </div>
              </nav>              
            </div>
          </div>
        </article>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps ){ // ES6: equivalent to state here and then const posts = state.posts in the body.
  // The rationale here for using ownProps is to just return the post requested, and not the entire {posts} object. 
  // For examlpe, this page will have a match.params.id prop available in ownProps.
  
  return {
    post: state.posts && state.posts["lists"] && state.posts["lists"][ownProps.match.params.id]
  };
}

// export default App;
export default  withRouter( connect(mapStateToProps, { fetchPostDetail, votePost, deletePost })(PostDetail) );