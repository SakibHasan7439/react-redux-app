
const redux = require('redux');
const createStore = redux.createStore;

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

// set action creators

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

const store = createStore(reducer);