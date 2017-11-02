import React, { Component } from 'react';
import { firebaseApp } from "../firebase";
import { connect } from 'react-redux';
import AddItem from './AddItem';
import ItemList from "./ItemList";

class App extends Component {
    logOut() {
        firebaseApp.auth().signOut();
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <AddItem />
                </div>
                <div className="row">
                    <ItemList />
                </div>
                <div className="row">
                    <button
                        className="btn btn-danger col-sm-offset-2"
                        onClick={() => this.logOut()}
                    >Log out
                    </button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    // console.log('state', state);
    return {};

}

export default connect(mapStateToProps, null)(App);