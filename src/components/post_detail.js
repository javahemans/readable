import React, { Component } from 'react';

class PostDetail extends Component {

  render() {
    console.log("Post Detail Page", this.props.match.params.id);
    return (
      <div>
      <h1>I am the posts detail page</h1>
      <h2>The post you are reading is has this URL param: </h2>
      </div>
    );
  }
}

export default PostDetail;