import React, { Component } from 'react';
import { fetchPostDetail } from '../actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';



class PostDetail extends Component {

  fetchData = () => {
    this.props.fetchPostDetail(this.props.match.params.id)
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps){
    console.log(prevProps.match, this.props.match)
    if( prevProps.match.url!== this.props.match.url){
      this.fetchData();
    }
  }

  render() {
    const { posts } = this.props;
    console.log("Post Detail Page", this.props.match.params.id, posts);
    
    return (
      <div>
      <h1>I am the posts detail page</h1>
      <h2>The post you are reading is has this URL param: {posts.title}</h2>
      </div>
    );
  }
}

function mapStateToProps({ posts }){ // ES6: equivalent to state here and then const posts = state.posts in the body.
  return { posts }; // ES6 as opposed to posts:posts
}

// export default App;
export default  withRouter( connect(mapStateToProps, { fetchPostDetail })(PostDetail) );