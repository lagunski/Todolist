import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./app/App";
import {Provider} from "react-redux";
import reportWebVitals from "./reportWebVitals";
import {store} from "./app/store";


ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals()
