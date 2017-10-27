import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore();

document.addEventListener("DOMContentLoaded", function() {
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <div className="container">
                    <Route exact path="/" component={LogIn}/>
                    <Route path="/app" component={App}/>
                    <Route path="/login" component={LogIn}/>
                    <Route path="/signup" component={SignUp}/>
                </div>
            </Router>
        </Provider>,
        document.getElementById('root')
    );
});

