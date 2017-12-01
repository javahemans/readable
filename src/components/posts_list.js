import React, { Component } from 'react';
import _ from 'lodash';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts, fetchCategoryPosts, orderPostsBy, getCategories, fetchComments } from '../actions';
import PostItem from './posts_list_item';

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
    
    
    // How can I ensure that every property within posts has been received? (not undefined?) Do I have to be this explicit?
    // I was getting undefined on the categories attribute within posts until I checked it explicitly.

    if (!posts || !posts["categories"]) {
      return (
        <div>Loading</div>
      );
    }
 
    const orderedPosts = _.orderBy(posts["lists"], posts.orderBy, 'desc' );
    // console.log("Ordered posts baby: ",orderedPosts, posts.orderBy )
    // console.log("Posts[Categories] is: ", posts["categories"]);
    
    return(
      <div>
        <section>
          <div className="container">
            <nav className="level">
              <div className="level-item has-text-centered">
                <p className="level-item"><Link to="/">ALL</Link></p>
              </div>
            {posts["categories"].map(cat => {
              return (
                <div key={cat.path} className="level-item has-text-centered">
                  <p className="level-item"><Link to={`/${cat.path}`}>{cat.name}</Link></p>
                </div>
              )
            })}
            </nav>
            <hr />
          </div>
        </section>
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
            <hr/>          
          </div>
        </section>
        <section>
          <div className="container">
            {/* {console.log("In PostLists, prior to map, posts is: ", posts, orderedPosts)} */}
            <ul>
            {_.map(orderedPosts, (p) => {
            return (
                <li className="postItem" key={p.id}>
                  <PostItem post={p} />
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

// export default App;
export default  withRouter( connect(mapStateToProps, { fetchPosts, fetchCategoryPosts, orderPostsBy, getCategories, fetchComments })(PostsList) );