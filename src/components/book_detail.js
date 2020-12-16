import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBookDetails, deleteBook } from '../actions';

class BookDetails extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchBookDetails(id);
    }
    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deleteBook(id, (success) => {
            if(!success) {
                window.alert('Please login to add or edit books!');
            }
            this.props.history.push('/');
        });
    }
    render() {
        const { book } = this.props;
        if(!book) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <br></br>
                <h1>Book Details</h1>
                <div className="details-box">
                    <h3>Book Title: {book.title}</h3>
                    
                    <h4>Author: {book.author}</h4>
                    <h5>Published on: {book.published}</h5>
                    <h5>ISBN: {book.isbn}</h5>
                    <div className="description"><b>Description: </b>{book.description || 'No Description available'}</div>
                    <Link className="btn btn-primary detail" to={`/books/${book._id}/edit`}>Edit Book</Link>
                    <button
                        className="btn btn-danger"
                        onClick={this.onDeleteClick.bind(this)}

                    >
                        Delete Book
                    </button>
                    <Link className="back-to-list" to="/">Back to list</Link>
                    
                </div>
            </div>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return { book: state.books[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchBookDetails, deleteBook })(BookDetails);