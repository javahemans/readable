import React, { Component } from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts, fetchCategoryPosts, orderPostsBy, getCategories, fetchComments, votePost } from '../actions';
import PostItem from './posts_list_item';
import CategorySubnav from './category_subnav';

class PostsList extends Component {

  fetchData = () => {
    this.props.match.params.category ? this.props.fetchCategoryPosts(this.props.match.params.category) : this.props.fetchPosts();
    this.props.getCategories();
    this.props.fetchComments();
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps){
    // console.log(prevProps.match, this.props.match)
    if( prevProps.match.url!== this.props.match.url){
      this.fetchData();
    }
  }

  render() {

    const { posts } = this.props;
    
    if (!posts || !posts["categories"]) {
      return (
        <div className="container">Loading</div>
      );
    }
 
    const orderedPosts = _.orderBy(posts["lists"], posts.orderBy, 'desc' );
    
    return (
      <div>
        <CategorySubnav categories={posts["categories"]} />
        <section>
          <div className="container">
            <nav className="level">
              <div className="level-left">
                <div className="level-item">
                <p className="control has-icons-left">
                  <span className="select">
                    <select value={posts.orderBy} onChange={(e) => this.props.orderPostsBy(e.target.value)}>
                      <option value="voteScore" >Votes</option>
                      <option value="timestamp">Date Posted</option>
                    </select>
                  </span>
                  <span className="icon is-small is-left">
                    <i className="fa fa-filter"></i>
                  </span>
                </p>
                </div>
              </div>
              <div className="level-right">
              </div>
            </nav>
            <br/>          
          </div>
        </section>
        <section>
          <div className="container">
            {/* {console.log("In PostLists, prior to map, posts is: ", posts, orderedPosts)} */}
            <ul>
            {_.map(orderedPosts, (p) => {
            return (
                <li className="postItem" key={p.id}>
                  <PostItem post={p} votePost={this.props.votePost} />
                </li>
            );
            })}
            </ul>
          </div>
        </section>
      </div>      
    );
  }
}

function mapStateToProps({ posts }){ // ES6: equivalent to state here and then const posts = state.posts in the body.
  return { posts }; // ES6 as opposed to posts:posts
}

export default  withRouter( connect(mapStateToProps, { fetchPosts, fetchCategoryPosts, orderPostsBy, getCategories, fetchComments, votePost })(PostsList) );