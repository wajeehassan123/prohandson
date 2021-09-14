import {createStore,applyMiddleware,combineReducers} from 'redux';

import userReducer from './reducers/userReducer';

const mainReducers=combineReducers({
user:userReducer
})

const store=createStore(mainReducers);
export default store;