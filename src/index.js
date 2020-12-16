import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import Booklist from './components/booklist';
import NewBook from './components/books_new';
import LoginForm from './components/login_form';
import SignupForm from './components/signup_form';
import BookDetails from './components/book_detail';
import EditBook from './components/edit_book';
import EditProfile from './components/edit_profile';
import ShowProfile from './components/profile_show';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/books/:id/edit" component={EditBook}></Route>
          <Route path="/signup" component={SignupForm}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/books/new" component={NewBook}></Route>
          <Route path="/books/:id" component={BookDetails}></Route>
          <Route path="/users/me/edit" component={EditProfile}></Route>
          <Route path="/users/me" component={ShowProfile}></Route>
          <Route path="/" component={Booklist}></Route>
          
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
