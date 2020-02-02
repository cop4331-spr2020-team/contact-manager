// A reducer is where our state will go.
// This is where we check our actions

import uuid from 'uuid';
<<<<<<< HEAD
import { GET_ITEMS, ADD_ITEM, DEL_ITEM } from '../actions/types';

const initState = {
    items: [   
        // Values are the arrays
        { id: uuid(), name: 'Zach Tatman', phone: '954 706 2286', email: ''},
        { id: uuid(), name: 'Huy Pham', phone: '954 706 2286', email: ''},
        { id: uuid(), name: 'Zach Tatman', phone: '954 706 2286', email: ''},
        { id: uuid(), name: 'Zach Tatman', phone: '954 706 2286', email: ''},
        { id: uuid(), name: 'Zach Tatman', phone: '954 706 2286', email: ''},
        { id: uuid(), name: 'Zach Tatman', phone: '954 706 2286', email: ''},
        { id: uuid(), name: 'Zach Tatman', phone: '954 706 2286', email: ''}
    ]
};

=======
import { GET_ITEMS, ADD_ITEM, DEL_ITEM, EDIT_ITEM, SEARCH_ITEM, ITEMS_LOADING} from '../actions/types';
const _ = require('lodash')

const initState = {
    items: {
        data: [],
        filtered_data: undefined

    },
    page: 1,
    loading: false
};




>>>>>>> contactcard
// This function takes in a state and action obj with a certain type.
export default function(state = initState, action) {
    switch(action.type) {
        case GET_ITEMS:
<<<<<<< HEAD
            return {
                ...state
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
    //     case EDIT_ITEM:
    //         return {
    //             ...state,
    //             items: state.items.copyWithin
    //         };
=======
            return console.log(action.payload.data) || {
                ...state,
                items: {
                    ...state.items,
                    data: action.payload.data
                },
                loading: false
            }
            case SEARCH_ITEM:
                const {payload} = action
                const filtered_data =  _.filter()
                return console.log(action.payload.data) || {
                    ...state,
                    items: {
                        ...state.items,
                        data: action.payload.data
                    },
                    loading: false
                }
        case DEL_ITEM:
            return {
                ...state,
                items: {
                    ...state.items,
                    data: state.items.data.filter(item => item._id !== action.payload)
                }
            }
        // Does not work
        case ADD_ITEM:
            return {
                ...state,
                items: {
                    ...state.items,
                    data: [...state.items.data, action.payload.data]
                },
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
>>>>>>> contactcard
        default: 
            return state;
    }
}