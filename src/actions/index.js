import axios from 'axios';

export const FETCH_BOOKS = 'fetch_books';
export const CREATE_BOOK = 'create_book';
export const CREATE_USER = 'create_user';
export const LOGIN_USER = 'login_user';
export const FETCH_BOOK_DETAILS = 'fetch_book_details';
export const EDIT_BOOK = 'edit_book';
export const EDIT_PROFILE = 'edit_profile';
export const DELETE_BOOK = 'delete_book';
export const DELETE_PROFILE = 'delete_profile';
export const FETCH_PROFILE = 'fetch_profile';
export const keys = {};

const ROOT_URL = 'http://localhost:3000';

export function login(values, callback) {
    const request = axios.post(`${ROOT_URL}/users/login`, values).then(res => {
        keys.token = res.data.token;
        keys.uid = res.data.user._id;
        console.log(keys.token);
        callback(true);
    }).catch(() => callback(false));
    return {
        type: LOGIN_USER,
        payload: request
    };
}
export function signup(values, callback) {
    const request = axios.post(`${ROOT_URL}/users`, values).then(res => {
        keys.token = res.data.token;
        keys.uid = res.data.user._id;
        callback(true);
    }).catch(() => callback(false));
   // console.log(keys.token);
    return {
        type: CREATE_USER,
        payload: request
    }
}
export function fetchBooks() {
    const request = axios.get(`${ROOT_URL}/books`);
   // console.log(keys.token);
    return {
        type: FETCH_BOOKS,
        payload: request
    };
}
export function fetchBookDetails(id) {
    const request = axios.get(`${ROOT_URL}/books/${id}`);
   // console.log(keys.token);
    return {
        type: FETCH_BOOK_DETAILS,
        payload: request
    }
}
export function fetchProfile() {
    const request = axios.get(`${ROOT_URL}/users/me`,
    {
        headers: {
          'Authorization': `Bearer ${keys.token}` 
        }
    });
    console.log(keys.token);
    return {
        type: FETCH_PROFILE,
        payload: request
    }
}
export function createBook(values, callback) {
    const request = axios.post(`${ROOT_URL}/books`, values, 
    {
        headers: {
          'Authorization': `Bearer ${keys.token}` 
        }
    }).then(() => callback(true)).catch(() => callback(false));
 //   console.log(keys.token);
    return {
        type: CREATE_BOOK,
        payload: request
    };
}
export function editBook(id, values, callback) {
    const request = axios.patch(`${ROOT_URL}/books/${id}`, values,
    {
        headers: {
          'Authorization': `Bearer ${keys.token}` 
        }
    }).then(() => callback(true)).catch(() => callback(false));
   // console.log(request);
    return {
        type: EDIT_BOOK,
        payload: request
    }
}
export function editProfile(id, values, callback) {
    const request = axios.patch(`${ROOT_URL}/users/me`, values,
    {
        headers: {
          'Authorization': `Bearer ${keys.token}` 
        }
    }).then(() => callback(true)).catch(() => callback(false));
   // console.log(request);
    return {
        type: EDIT_PROFILE,
        payload: request
    }
}
export function deleteBook(id, callback) {
    const request = axios.delete(`${ROOT_URL}/books/${id}`,
    {
        headers: {
          'Authorization': `Bearer ${keys.token}` 
        }
    }).then(() => callback(true)).catch(() => callback(false));
   // console.log(keys.token);
    return {
        type: DELETE_BOOK,
        payload: id
    }
}
export function deleteProfile(id, callback) {
    const request = axios.delete(`${ROOT_URL}/users/${id}`,
    {
        headers: {
          'Authorization': `Bearer ${keys.token}` 
        }
    }).then(() => callback(true)).catch(() => callback(false));
   // console.log(keys.token);
    return {
        type: DELETE_PROFILE,
        payload: id
    }
}