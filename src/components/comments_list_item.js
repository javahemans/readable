import React from 'react';
import moment from 'moment';

const CommentsListItem = (props) => {

    const { comment, voteComment, toggleCommentView, handleCommentDelete } = props;

    return (
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
                <a><span className="icon comment" onClick={() => toggleCommentView(comment.id)}><i className="fa fa-pencil"></i></span></a>                  
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                <a><span className="icon comment" onClick={() => handleCommentDelete(comment.id)}><i className="fa fa-times"></i></span></a>                  
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                <a><span className="icon comment" onClick={() => voteComment("upVote", comment.id)}><i className="fa fa-caret-up fa-2x"></i></span></a>                  
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                <a><span className="icon comment" onClick={() => voteComment("downVote", comment.id)}><i className="fa fa-caret-down fa-2x"></i></span></a>
                </div>
              </div>
            </nav>              
          </div>
      </div>
    );
  }

export default CommentsListItem;