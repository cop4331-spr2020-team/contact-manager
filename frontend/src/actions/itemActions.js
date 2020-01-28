import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DEL_ITEM, EDIT_ITEM, ITEMS_LOADING } from './types';


// This is the action: GET ITEM
export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get('http://localhost:8080/api/contacts')
        .then(res => 
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })
        )
};

// This is the action: DEL ITEM
export const deleteItem = id => {
    return {
        type: DEL_ITEM,
        payload: id
    };
};

// This is the action: ADD ITEM
export const addItem = item => {
    return {
        type: ADD_ITEM,
        payload: item
    };
};

// This is the action: EDIT ITEM
export const editItem = item => {
    return {
        type: EDIT_ITEM,
        payload: item     
    };
}

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}