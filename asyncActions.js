
const redux = require('redux');
const { thunk } = require('redux-thunk');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const axios = require('axios');

// Initial state
const initial_state = {
    loading: false,
    data: [],
    error: ''
};

// action type
const FETCH_USER_REQUESTS       = 'FETCH_USER_REQUESTS';
const FETCH_USER_SUCCESS        = 'FETCH_USER_SUCCESS';
const FETCH_USER_ERROR          = 'FETCH_USER_ERROR';

// set action 
const fetch_user_req = () =>{
    return {
        type: FETCH_USER_REQUESTS
    }
}

const fetch_user_success = (users) =>{
    return {
        type: FETCH_USER_SUCCESS,
        payload: users
    }
}

const fetch_user_error = (error) =>{
    return {
        type: FETCH_USER_ERROR,
        payload: error
    }
}

// create reducer
const reducer = (state = initial_state, action) =>{
    switch(action.type){
        case FETCH_USER_REQUESTS:
            return {
                ...state,
                loading: true
            }

        case FETCH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }

        case FETCH_USER_ERROR:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }
        
        default: return state;
    }
}

// set action creators
const fetchUsers = () =>{
    return function (dispatch){
        dispatch(fetch_user_req())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((res) =>{
            const users = res.data;
            dispatch(fetch_user_success(users));
        })
        .catch((error) =>{
            const err = error.message;
            dispatch(fetch_user_error(err));
        })
    }
}

const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(()=> {console.log(store.getState())});
store.dispatch(fetchUsers());