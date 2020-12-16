import { isNumber } from 'lodash';
import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBookDetails, editBook } from '../actions';

const isIsbn = require('is-isbn');

class EditBook extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchBookDetails(id);
    }
    renderField(field) {
        const { meta } = field;
        const className = `form-group ${meta.touched && meta.error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control"
                    type={field.type || "text"} 
                    {...field.input}
                    placeholder={field.placeholder}
                />
                <div className="text-help">
                    {meta.touched ? meta.error : ''}
                </div>
            </div>
        );
    }
    onSubmit(values) {
        const { id } = this.props.match.params;
        //console.log(values);
        this.props.editBook(id, values, (success) => {
            if(!success) {
                window.alert('Please login to add or edit books!');
                this.props.history.push(`/login`);
            }    
            else {
                this.props.history.push(`/books/${id}`);
            }
        });
    }

    render() {
        const { handleSubmit, book } = this.props;
        if(!book) {
            return <div>Loading...</div>
        }
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Edit Book Title"
                    name="title"
                    placeholder={book.title}
                    component={this.renderField}
                />
                <Field
                    label="Edit Author"
                    name="author" 
                    placeholder={book.author}
                    component={this.renderField}
                />
                <Field
                    label="Edit ISBN"
                    name="isbn" 
                    placeholder={book.isbn}
                    component={this.renderField}
                />
                <Field
                    label="Edit Description"
                    name="description" 
                    placeholder={book.description}
                    component={this.renderField}
                />
                <Field
                    type="number"
                    label="Edit Publication Year"
                    name="published" 
                    placeholder={book.published}
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
    if(!(values.published>1000 && values.published<=2020)) {
        errors.published = "Please enter a valid year!";
    }
    if(!isIsbn.validate(values.isbn)) {
        errors.isbn = "Please enter valid isbn!"
    }
    return errors;
}
function mapStateToProps(state, ownProps) {
   // console.log(state.books[ownProps.match.params.id].author);
    return { book: state.books[ownProps.match.params.id] };
}

export default reduxForm({
    validate,
    form: 'BooksEdit'
})(
    connect(mapStateToProps, {fetchBookDetails, editBook})(EditBook)
);