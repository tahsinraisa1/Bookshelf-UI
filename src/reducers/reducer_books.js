import _ from 'lodash';
import { DELETE_BOOK, FETCH_BOOKS, FETCH_BOOK_DETAILS, EDIT_BOOK } from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_BOOK_DETAILS:
           // console.log(action.payload.data);
            return { ...state, [action.payload.data._id] : action.payload.data };
        case FETCH_BOOKS:
            return _.mapKeys(action.payload.data, '_id');
        case DELETE_BOOK:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}