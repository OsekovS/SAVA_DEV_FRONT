// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
// import state from './components/redux/redux-store'

// ReactDOM.render(<App appState={state}/>, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

import * as serviceWorker from './serviceWorker';
import store from "./components/redux/redux-store";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';





// let rerenderEntireTree = (state) => {

    ReactDOM.render(
        <BrowserRouter>
        <Provider store={store}>
            <App state={store.getState()} dispatch={store.dispatch.bind(store)} store={store} />
        </Provider>
        </BrowserRouter>, document.getElementById('root'));
// }

// rerenderEntireTree(store.getState());

// store.subscribe(() => {
//     let state = store.getState();
//     rerenderEntireTree(state);
// });


// let rerenderEntireTree = (state) => {
//     ReactDOM.render(
//         <BrowserRouter>
//             <App state={state} dispatch={store.dispatch.bind(store)} store={store} />
//         </BrowserRouter>, document.getElementById('root'));
// }

// rerenderEntireTree(store.getState());

// store.subscribe(() => {
//     let state = store.getState();
//     rerenderEntireTree(state);
// });

// API
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
