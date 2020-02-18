import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import {pick} from 'lodash'

document.addEventListener("DOMContentLoaded", () => {
    
    let store; //sets the state's current user memo, deletes the windows memo

    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: pick(window.currentUser, 'id', 'name', 'email') }
            },
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    }
    else {
        store = configureStore()
    }

    //testing
    window.getState = store.getState
    // window.dispatch = store.dispatch
    //testing


    let root = document.getElementById("root")
    ReactDOM.render(<Root store={store} />, root)
})
