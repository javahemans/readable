import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
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

    const { input, label, meta : { touched, error } } = field;
    
    return (
      <div>
        <div className="field">
          <label className="label is-medium">{label}</label>
          <p className="control">
            <textarea {...input} className={`is-medium textarea ${touched && error ? 'is-danger' : ''}`} placeholder="Add a comment..."></textarea>
          </p>
        </div>
        <p className="help is-danger">{touched ? error : '' }</p>
      </div>  
    );
  }

  renderField = (field) => {

    const { input, label, meta : { touched, error } } = field;
        
    return (
    <div className="container">
      <div className="field">
        <label className="label is-medium">{label}</label>
        <div className="control">
          <input 
            className={`input is-medium ${touched && error ? 'is-danger' : ''}`}
            type="text"
            {...input}
            placeholder="Your name (required)"
            />
        </div>
        <p className="help is-danger">{touched ? error : '' }</p>
      </div>
    </div>
    );
  }
      

  onSubmit = (values) => {
    console.log(values);
    const { editComment, comment: { id } } = this.props;
    return editComment(values, id)
  }


  render () {

    const { handleSubmit, pristine, submitting, toggleCommentView } = this.props; 
    
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
                <button type="button" onClick={() => toggleCommentView('')}className="button is-danger">Cancel</button>
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
    errors.author = "Enter your name";
  }

  return errors;
}


function mapStateToProps({ comments }){ 
  return { comments };
}

CommentsEdit = withRouter(connect(mapStateToProps, { editComment, toggleCommentView })(CommentsEdit))

export default CommentsEdit =  reduxForm({
  validate,
  form: 'CommentsEditForm'
})(CommentsEdit);
