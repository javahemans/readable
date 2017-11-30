import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { editComment, toggleCommentView } from '../actions';


class CommentsEdit extends Component {

  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {

    console.log("Props here are: ", this.props);

    const initData = {
      "body": this.props.comment["body"],
      "author": this.props.comment["author"]
    };

    console.log("InitData on Edit Comment is, ", initData);

    this.props.initialize(initData);
  }


  renderTextArea = (field) => {
    
    return (
      <div>
        <div className="field">
          <label className="label is-medium">{field.label}</label>
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
    const { reset, editComment } = this.props
    return editComment(values, id).then(() =>{
      reset();
    })
    editComment(values, id);
  }


  render () {

    const { handleSubmit, comments, pristine, submitting } = this.props; 
    
    return (
        <div className="media-content">
          <form className="uform" onSubmit={handleSubmit(this.onSubmit.bind(this))} >
            <Field 
              name="body"
              component={this.renderTextArea}
            />
            <Field 
                name="author"
                component={this.renderField}
            />
            <div className="field">
              <p className="control">
                <button disabled={pristine || submitting} className="button">Save comment</button>&nbsp;&nbsp;
                <button type="button" onClick={() => this.props.toggleCommentView('eoauoae')}className="button is-danger">Cancel</button>
              </p>
            </div>
          </form>
        </div>
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


CommentsEdit = withRouter(connect(mapStateToProps, { editComment, toggleCommentView })(CommentsEdit))

export default CommentsEdit =  reduxForm({
  validate,
  form: 'CommentsEditForm'
})(CommentsEdit);
