import { BUY_CAKE } from "./actionType"

// action creator/ customer order
const buy_cake = () =>{
    return {
        type: BUY_CAKE,
        info: 'First Redux Action'
    }
};

// total cake the restaurant has
let initial_state = {
    total_cake: 20
};

// create a reducer / chef will create the item
const reducer = (state = initial_state, action) =>{
    switch(action.type){
        case BUY_CAKE: return {
            total_cake: state.total_cake - 1
        };

        default: return state;
    }
}