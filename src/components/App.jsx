import React, { Component } from 'react';
import { firebaseApp } from "../firebase";
import { connect } from 'react-redux';
import AddItem from './AddItem';
import ItemList from './ItemList';
import Lists from "./Lists";
import AddList from "./AddList";

class App extends Component {
    logOut() {
        firebaseApp.auth().signOut();
    }
    render() {
        return (
            <div className="col-xs-12">
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-4">
                        <h2 style={{textAlign:'center', color:'white'}}>List 1</h2>
                    </div>
                </div>
                <div className="row">
                    <AddList />
                    <AddItem />
                </div>
                <div className="row">
                    <Lists />
                    <ItemList />
                </div>
                <div className="row">
                    <button
                        className="btn btn-danger "
                        style={{marginBottom:'20px'}}
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