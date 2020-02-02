<<<<<<< HEAD
import { GET_ITEMS, ADD_ITEM, DEL_ITEM, EDIT_ITEM } from './types';


// This is the action: GET ITEM
export const getItems = () => {
    return {
        type: GET_ITEMS
    };
};

// This is the action: DEL ITEM
export const deleteItem = id => {
    return {
        type: DEL_ITEM,
        payload: id
    };
};

export const addItem = item => {
    return {
        type: ADD_ITEM,
        payload: item
    };
};

export const editItem = item => {
    return {
        type: EDIT_ITEM,
        payload: item      
    };
=======
import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DEL_ITEM, EDIT_ITEM, ITEMS_LOADING, SEARCH_ITEM } from './types';

// This is the action: GET ITEM
export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios
        .get('/api/contacts')
        .then(res => 
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })
        )
    };

// This is the action: SEARCH ITEM
export const searchItem = () => dispatch =>{
    axios
    .get('/api/contacts')
    .then(res => 
        dispatch({
            type: SEARCH_ITEM,
            payload: res.data
        })
    )
}

// This is the action: ADD ITEM
export const addItem = item => dispatch => {
    axios.
    post('/api/contact', item)
    .then(res => 
        dispatch({
            type: ADD_ITEM,
            payload: res.data
        })
    )
};

// This is the action: DEL ITEM
export const deleteItem = id => dispatch => {
    axios
    .delete(`/api/contact/${id}`)
    .then(res => 
        dispatch({
            type: DEL_ITEM,
            payload: id
        })
    )
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
>>>>>>> contactcard
}