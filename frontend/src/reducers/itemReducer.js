// A reducer is where our state will go.
// This is where we check our actions

import uuid from 'uuid';
import { GET_ITEMS, ADD_ITEM, DEL_ITEM, EDIT_ITEM, ITEMS_LOADING} from '../actions/types';

const initState = {
    items: [   
        // // Values are the arrays
        // { id: uuid(), name: 'Zach Tatman', phone: '954 706 2286', email: ''},
        // { id: uuid(), name: 'Huy Pham', phone: '954 706 2286', email: ''},
        // { id: uuid(), name: 'Zach Tatman', phone: '954 706 2286', email: ''},
        // { id: uuid(), name: 'Zach Tatman', phone: '954 706 2286', email: ''},
        // { id: uuid(), name: 'Zach Tatman', phone: '954 706 2286', email: ''},
        // { id: uuid(), name: 'Zach Tatman', phone: '954 706 2286', email: ''},
        // { id: uuid(), name: 'Zach Tatman', phone: '954 706 2286', email: ''}
    ],
    loading: false

};

// This function takes in a state and action obj with a certain type.
export default function(state = initState, action) {
    switch(action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case DEL_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            }
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case ITEMS_LOADING:
            return {
                ...state, 
                loading: true
            }
        // case EDIT_ITEM:
        //     return  {
        //         ...state,
        //         items: state.items.map()
        //     };
        default: 
            return state;
    }
}