import {combineReducers} from 'redux';
import {registerReducer} from './auth';
import {globalReducer} from './global';
import {optionReducer} from './option';
import {menuReducer} from './menu';
import {cartItems} from './cartItems';
import {transactionsReducer} from './transactions';
import {loadingReducer} from './loading';
const reducer = combineReducers({
  registerReducer,
  loadingReducer,
  globalReducer,
  optionReducer,
  menuReducer,
  transactionsReducer,

  cartItems,
}); //combine reducer karena reducer akan banyak

export default reducer;
