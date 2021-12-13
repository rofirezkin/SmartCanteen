import {combineReducers} from 'redux';
import {registerReducer} from './auth';
import {globalReducer} from './global';
import { menuReducer } from './menu';
import {cartItems} from './cartItems'

const reducer = combineReducers({registerReducer, globalReducer, menuReducer, cartItems }); //combine reducer karena reducer akan banyak

export default reducer;
