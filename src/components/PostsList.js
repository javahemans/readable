import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts, fetchCategoryPosts } from '../actions';

class PostsList extends Component {


  fetchData = () => {
    this.props.match.params.category ? this.props.fetchCategoryPosts(this.props.match.params.category) : this.props.fetchPosts();
    
  }
  componentDidMount() {

    this.fetchData()
  }

  componentDidUpdate(prevProps){
    console.log( prevProps.match, this.props.match)
    if( prevProps.match.url!== this.props.match.url){
      this.fetchData();
    }
  }


  render() {

    const { posts } = this.props;
    console.log("Match params is, ", this.props.match.params.category);
    

      // The response is an object with categories as a key and value being an array. 
  const category_response = {
    "categories": [
        {
            "name": "react",
            "path": "react"
        },
        {
            "name": "redux",
            "path": "redux"
        },
        {
            "name": "udacity",
            "path": "udacity"
        }
    ]
}


    
    return(
      <div>
        <section>
          <div className="container">
            <nav className="level">
              <div className="level-item has-text-centered">
                <p className="level-item"><Link to="/">ALL</Link></p>
              </div>
            {category_response["categories"].map(cat => {
              return (
                <div key={cat.path} className="level-item has-text-centered">
                  <p className="level-item"><Link to={`/${cat.path}/posts`}>{cat.name}</Link></p>
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
                    <select>
                      <option>Votescore</option>
                      <option>Post Date</option>
                    </select>
                  </span>
                  <span className="icon is-small is-left">
                    <i className="fa fa-filter"></i>
                  </span>
                </p>
                </div>
              </div>
              <div className="level-right">
                <div className="level-item"><a className="button is-success">New Post</a></div>
              </div>
            </nav>
            <hr/>          
          </div>
        </section>
      
      <section>
        <div className="container">
          {_.map(posts, post => {
          return (
          <article key={post.id} className="media">
            <figure className="media-left votebox">
              <p className="has-text-centered">
              <span className="icon"><i className="fa fa-caret-up fa-3x"></i></span>
              </p>
              <p className="has-text-centered has-text-info is-size-4">
              {post.voteScore}
              </p>
              <p className="has-text-centered">
              <span className="icon"><i className="fa fa-caret-down fa-3x"></i></span>
              </p>

            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{post.title}</strong>
                  <br />
                  {post.body}
                  <br />
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
          </article>
          );
          })}
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
export default  withRouter( connect(mapStateToProps, { fetchPosts, fetchCategoryPosts })(PostsList) );