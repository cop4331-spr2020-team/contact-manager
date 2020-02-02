// TO-DO: Add an authorization reducer later

import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

export default combineReducers({
    item: itemReducer
    // , authReducer... and so on other reducers
});