import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import BooksReducer from './reducer_books';
import UsersReducer from './reducer_users';

const rootReducer = combineReducers({
  books: BooksReducer,
  users: UsersReducer,
  form: formReducer 
});

export default rootReducer;
