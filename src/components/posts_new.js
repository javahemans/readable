import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {

  renderField(field) {

    return (
    <div className="container">
      <div className="field">
        <label className="label">{field.label}</label>
        <div className="control">
          <input 
            className={`input ${field.meta.touched && field.meta.error ? 'is-danger' : ''}`}
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
        <label className="label">{field.label}</label>
        <div className="control">
          <div className="select">
            <select {...field.input}>
              <option />
              <option>No 1</option>
            </select>
          </div>
        </div>
        <p className="help is-danger">{field.meta.error}</p>      
      </div>
    </div>
    );
  }

  onSubmit(values){
    console.log(values);
  }

  render() {

    const { handleSubmit } = this.props; 

    return (
      <div className="container">
        <div className="title">New Post</div>
        <br/>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
          <Field 
            label="Post Title"
            name="title"
            component={this.renderField}
          />
          <Field 
            label="Body"
            name="body"
            component={this.renderField}
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
                <button className="button is-text">Cancel</button>
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

export default reduxForm({
   validate,
   form: 'PostsNewForm'
})(PostsNew);