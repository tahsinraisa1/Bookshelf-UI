import { isNumber } from 'lodash';
import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBook } from '../actions';

const isIsbn = require('is-isbn');

class NewBook extends Component {
    renderField(field) {
        const { meta } = field;
        const className = `form-group ${meta.touched && meta.error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control"
                    type={field.type || "text"} 
                    {...field.input}
                />
                <div className="text-help">
                    {meta.touched ? meta.error : ''}
                </div>
            </div>
        );
    }
    onSubmit(values) {
        this.props.createBook(values, (success) => {
            if(!success) {
                window.alert('Please login to add or edit books!');
            }
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Book Title*"
                    name="title" 
                    component={this.renderField}
                />
                <Field
                    label="Author Name*"
                    name="author" 
                    component={this.renderField}
                />
                <Field
                    label="ISBN*"
                    name="isbn" 
                    component={this.renderField}
                />
                <Field
                    label="Description (Optional)"
                    name="description" 
                    component={this.renderField}
                />
                <Field
                    type="number"
                    label="Year of Publication*"
                    name="published" 
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Save</button>
                <Link className="btn btn-danger" to="/">Cancel</Link>
            </form>
        );
    }
}
function validate(values) {
    const errors = {};
    if(!values.title) {
        errors.title = "This is a mandatory field!";
    }
    if(!values.author) {
        errors.author = "This is a mandatory field!";
    }
    if(!values.published) {
        errors.published = "This is a mandatory field!";
    }
    if(!values.isbn) {
        errors.isbn = "This is a mandatory field!";
    }
    if(!(values.published>1000 && values.published<=2020)) {
        errors.published = "Please enter a valid year!";
    }
    if(!isIsbn.validate(values.isbn)) {
        errors.isbn = "Please enter valid isbn!"
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'BooksNewForm'
})(
    connect(null, {createBook})(NewBook)
);