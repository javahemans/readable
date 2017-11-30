import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createComment } from '../actions';


class CommentsNew extends Component {

  renderTextArea = (field) => {
    
    return (
      <div>
        <div className="field">
          <p className="control">
            <textarea {...field.input} className={`is-medium textarea ${field.meta.touched && field.meta.error ? 'is-danger' : ''}`} placeholder="Add a comment..."></textarea>
          </p>
        </div>
        <p className="help is-danger">{field.meta.touched ? field.meta.error : '' }</p>
      </div>  
    );
  }

  renderField = (field) => {
    
        return (
        <div className="container">
          <div className="field">
            <label className="label is-medium">{field.label}</label>
            <div className="control">
              <input 
                className={`input is-medium ${field.meta.touched && field.meta.error ? 'is-danger' : ''}`}
                type="text"
                {...field.input}
                placeholder="Your name (required)"
                />
            </div>
            <p className="help is-danger">{field.meta.touched ? field.meta.error : '' }</p>
          </div>
        </div>
        );
      }
      

  onSubmit = (values) => {
    // console.log(values);
    const { id } = this.props.match.params;
    this.props.createComment(values, id);
  }


  render () {

    const { handleSubmit, comments } = this.props; 
    
    return (
      <article className="media">
        <div className="media-content">
          <form className="uform" onSubmit={handleSubmit(this.onSubmit.bind(this))} >
            <Field 
              label="Comment"
              name="body"
              component={this.renderTextArea}
            />
            <Field 
                name="author"
                component={this.renderField}
            />
            <div className="field">
              <p className="control">
                <button className="button">Post comment</button>
              </p>
            </div>
          </form>
        </div>
      </article>
    );
  }
}


function validate(values) {
  const errors = {}

  if(!values.body) {
    errors.body = "Enter some content";
  }

  if(!values.author) {
    errors.author = "Enter an authorname";
  }

  return errors;
}


function mapStateToProps({ comments }){ // ES6: equivalent to state here and then const posts = state.posts in the body.
  return { comments }; // ES6 as opposed to posts:posts
}


CommentsNew = withRouter(connect(mapStateToProps, { createComment })(CommentsNew))

export default CommentsNew =  reduxForm({
  validate,
  form: 'CommentsNewForm'
})(CommentsNew);
