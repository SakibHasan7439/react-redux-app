const redux = require('redux');
const reduxLogger = require('redux-logger');


const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const BUY_CAKE = 'BUY_CAKE';
const BUY_PIZZA = 'BUY_PIZZA';

// action creator/ customer order
const buy_cake = () =>{
    return {
        type: BUY_CAKE,
        info: 'First Cake Action'
    }
};

const buy_pizza = () =>{
    return {
        type: BUY_PIZZA,
        info: 'First Pizza Action'
    }
}

// total cake the restaurant has
let initial_cake_state = {
    total_cake: 20
};

let initial_pizza_state = {
    total_pizza: 10
};

// create a reducer / chef will create the item
const cake_reducer = (state = initial_cake_state, action) =>{
    switch(action.type){
        case BUY_CAKE: return {
            ...state,
            total_cake: state.total_cake - 1
        };
        
        default: return state;
    }
}

const pizza_reducer = (state = initial_pizza_state, action) =>{
    switch(action.type){
        case BUY_PIZZA: return {
            ...state,
            total_pizza: state.total_pizza - 1
        }

        default: return state;
    }
}

const rootReducers = combineReducers({
    cake: cake_reducer,
    pizza: pizza_reducer
});

const store = createStore(rootReducers, applyMiddleware(logger));
console.log('initial state :>> ', store.getState());
// console.log('Store :>> ', store);
const unsubscribe = store.subscribe(() => {});
store.dispatch(buy_cake());
store.dispatch(buy_cake());
store.dispatch(buy_cake());
store.dispatch(buy_pizza());

unsubscribe();