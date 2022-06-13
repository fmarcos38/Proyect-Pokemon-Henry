import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Reducer';

//herramienta
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//creo store
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

//exporto
export default store;