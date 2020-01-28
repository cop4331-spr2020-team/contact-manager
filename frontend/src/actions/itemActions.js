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
}