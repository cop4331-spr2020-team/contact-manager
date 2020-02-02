import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// Empty obj
const initState = {};

// Middleware obj
const middleware = [thunk];

// createStore takes in ()
const store = createStore(
    rootReducer, 
    initState, 
    compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;