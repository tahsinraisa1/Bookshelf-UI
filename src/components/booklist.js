import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchBooks  }from '../actions';


class Booklist extends Component {
    componentDidMount(){
        this.props.fetchBooks();
    }
    renderBooks() {
        return _.map(this.props.books, book => {
            return (
                <li className="list-group-item" key={book._id}>
                    <Link to={`/books/${book._id}`}>
                        {book.title} - {book.author}
                    </Link>
                </li>
            );
        });
    }

    render() {
        //console.log(this.props.books);
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/books/new">
                        Add Book
                    </Link>
                </div>
                <h3 className="upper-h">Books</h3>
                <br></br>
                <ul className="list-group">
                    {this.renderBooks()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { books: state.books}
}

export default connect(mapStateToProps, { fetchBooks }) (Booklist); 