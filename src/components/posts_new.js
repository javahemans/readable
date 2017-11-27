import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories, createPost } from '../actions';
import _ from 'lodash';


class PostsNew extends Component {


  fetchData = () => {
    this.props.getCategories();
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

  renderField(field) {

    return (
    <div className="container">
      <div className="field">
        <label className="label is-medium">{field.label}</label>
        <div className="control">
          <input 
            className={`input is-medium ${field.meta.touched && field.meta.error ? 'is-danger' : ''}`}
            type="text"
            {...field.input}
            />
        </div>
        <p className="help is-danger">{field.meta.touched ? field.meta.error : '' }</p>
      </div>
    </div>
    );
  }

  renderSelect(field) {

    return (
    <div className="container">
      <div className="field">
        <label className="label is-medium">{field.label}</label>
        <div className="control">
          <div className={`is-medium select ${field.meta.touched && field.meta.error ? 'is-danger' : ''}`}>
            <select {...field.input}>
              <option />
              {/* {_.map(posts["categories"], category => ( 
                <option>{category.name}</option>
              ))} */}
              <option>react</option>
              <option>redux</option>
              <option>udacity</option>
            </select>
          </div>
        </div>
        <p className="help is-danger">{field.meta.touched ? field.meta.error : '' }</p>      
      </div>
    </div>
    );
  }

  renderTextArea(field) {
    
        return (
        <div className="container" >
          <div className="field">
            <label className="label is-medium ">{field.label}</label>
            <div className="control">
              <textarea {...field.input} className={`is-medium textarea ${field.meta.touched && field.meta.error ? 'is-danger' : ''}`}></textarea>
            </div>
            <p className="help is-danger">{field.meta.touched ? field.meta.error : '' }</p>          
            </div>
        </div>
        );
      }
    
  onSubmit(values){
    // console.log(values);
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {

    const { handleSubmit, posts } = this.props; 

    if(!posts && !posts["categories"]) {
      return (
        <div>Loading</div>
      )
    }

    console.log("This props categories in NewPost? ", this.props.posts["categories"]);

    return (
      <div className="container">
        <div className="title">New Post</div>
        <br/>
        <form className="uform" onSubmit={handleSubmit(this.onSubmit.bind(this))} >
          <Field 
            label="Post Title"
            name="title"
            component={this.renderField}
          />
          <Field 
            label="Body"
            name="body"
            component={this.renderTextArea}
          />
          <Field 
            label="Author Name"
            name="author"
            component={this.renderField}
          />
          <Field 
            label="Category"
            name="category"
            component={this.renderSelect}
          />
          <br />
          <div className="container">
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link">Submit</button>
              </div>
              <div className="control">
                <Link to="/"><button className="button is-text">Cancel</button></Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}


function validate(values) {
  const errors = {}

  if(!values.title) {
    errors.title = "Enter a title";
  }

  if(!values.body) {
    errors.body = "Enter some content";
  }

  if(!values.author) {
    errors.author = "Enter an authorname";
  }

  if(!values.category) {
    errors.category = "Choose a category";
  }



  // If errors is empty, form is fine to submit.

  return errors;
}


function mapStateToProps({ posts }){ // ES6: equivalent to state here and then const posts = state.posts in the body.
  return { posts }; // ES6 as opposed to posts:posts
}


PostsNew = withRouter(connect(mapStateToProps, { createPost, getCategories })(PostsNew))

export default PostsNew =  reduxForm({
  validate,
  form: 'PostsNewForm'
})(PostsNew);


