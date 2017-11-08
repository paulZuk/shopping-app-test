import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import MainLayout from './components/MainLayout';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer, routerMiddleware, push, replace } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { firebaseApp } from "./firebase";
import user from "./reducers/user";
import items from "./reducers/items";
import lists from "./reducers/lists";
import { logIn } from "./actions";

const middleware = routerMiddleware(browserHistory);

const rootReducer = combineReducers({
    user,
    lists,
    items,
    routing: routerReducer,
});

export const store = createStore(
    rootReducer,
    applyMiddleware(middleware)
);

const history = syncHistoryWithStore(browserHistory, store);

firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
        // console.log('user log in or sign up', user);
        const { email } = user;
        store.dispatch(logIn(email));
        store.dispatch(push('/app'));
    } else {
        // console.log('user sign out or still sign in');
        store.dispatch(replace('/login'));
    }
});


document.addEventListener("DOMContentLoaded", function() {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <Route exact path="/" component={MainLayout}>
                    <IndexRoute component={LogIn}/>
                    <Route path="/app" component={App}/>
                    <Route path="/login" component={LogIn}/>
                    <Route path="/signup" component={SignUp}/>
                </Route>
            </Router>
        </Provider>,
        document.getElementById('root')
    );
});

