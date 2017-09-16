import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.css';
import App from './App';
import reducer from "./reducers/reducer";
import {createStore} from "redux";

const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.dispatch({type:''});
ReactDOM.render(<App store={store}/>, document.getElementById('root'));
