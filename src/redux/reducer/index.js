import {combineReducers} from 'redux';
import {registerReducer} from './auth';
import {globalReducer} from './global';
import { menuReducer } from './menu';

const reducer = combineReducers({registerReducer, globalReducer, menuReducer}); //combine reducer karena reducer akan banyak

export default reducer;
