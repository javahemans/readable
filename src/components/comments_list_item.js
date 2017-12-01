import React, { Component } from 'react';
import moment from 'moment';

class CommentsListItem extends Component {
  render() {

    const { comment } = this.props;

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
                <a><span className="icon comment" onClick={() => this.props.toggleCommentView(comment.id)}><i className="fa fa-pencil"></i></span></a>                  
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                <a><span className="icon comment" onClick={() => this.props.handleCommentDelete(comment.id)}><i className="fa fa-times"></i></span></a>                  
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
    );
  }
}

export default CommentsListItem;