import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const store = createStore(reducer, applyMiddleware(thunk)); // memerlukan sebuah parameter berupa reducer yaitu kumpulan state global

export default store;
