import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

 const PostItem = (props) => {

    const { post, votePost } = props;
    
    return (
      <article key={post.id} className="media">
        <figure className="media-left votebox">
          <p className="has-text-centered">
            <span className="icon" onClick={() => votePost("upVote", post.id)}><i className="fa fa-caret-up fa-3x"></i></span>
          </p>
          <p className="has-text-centered has-text-info is-size-4 image is-48x48">
            {post.voteScore}
          </p>
          <p className="has-text-centered">
            <span className="icon" onClick={() => votePost("downVote", post.id)}><i className="fa fa-caret-down fa-3x"></i></span>
          </p>
        </figure>

        <div className="media-content">
          <div className="content">
            <Link to={`/posts/${post.id}`}>
            <p>
              <strong>{post.title}</strong>
              <br />
              {post.body}
            </p>
            </Link>
            <p>
              <small><span className="tag is-info">{post.category}</span> | by: {post.author}</small> <small> | {moment(post.timestamp).from()}</small>
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
              <a onClick={() => props.handleDelete(post.id)}><span className="icon comment"><i className="fa fa-times"></i></span></a>                  
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
              <Link to={`/posts/${post.id}/edit`}><span className="icon comment"><i className="fa fa-pencil"></i></span></Link>
              </div>
            </div>
          </nav>              

        </div>

      </article>
    )
  }

export default PostItem;