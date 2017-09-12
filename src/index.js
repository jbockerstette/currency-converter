import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.css';
import App from './App';
import reducer from "./reducers/reducer";
import {createStore} from "redux";

const store = createStore(reducer);
ReactDOM.render(<App store={store}/>, document.getElementById('root'));
