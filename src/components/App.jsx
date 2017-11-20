import React, { Component } from 'react';
import { firebaseApp } from "../firebase";
import { connect } from 'react-redux';
import AddItem from './AddItem';
import ItemList from './ItemList';
import Lists from "./Lists";
import AddList from "./AddList";
import * as firebase from 'firebase';
import { bindActionCreators } from 'redux';
import { setLists, setListName, setItems } from "../actions/index";
import firebaseRef from "../reducers/firebaseRef";


class App extends Component {
    logOut() {
        firebaseApp.auth().signOut();
    }

    componentDidMount() {
        this.getLists();
    }

    getLists() {
        let data = firebase.database().ref('lists');
        data.on('value', snapshot => {
            let list = [];
            console.log(snapshot.val());
            snapshot.forEach(elem => {
                // console.log(elem.val());
                list.push({
                    name: elem.val().name,
                    user: elem.val().user,
                    id: elem.val().id,
                    active: elem.val().active,
                    items: elem.val().items
                });
            });

            list.forEach(list => {
                if(list.active) {
                    this.props.setListName(list.name);

                    if( typeof list.items !== "undefined") {
                        this.props.setItems(Object.values(list.items));
                    }
                }
            });
            this.props.setLists(list);
        });
    }

    render() {
        return (
            <div className="col-xs-12">
                <div className="row">
                    <button
                        className="btn btn-danger center-block"
                        style={{margin: '20px auto'}}
                        onClick={() => this.logOut()}
                    >Log out
                    </button>
                </div>
                <div className="row">
                    <div>
                        <h2 style={{textAlign:'center', color:'white', marginBottom:'30px'}}
                        >
                            {this.props.firebaseRef !== ""? this.props.firebaseRef : "Choose list"}
                        </h2>
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
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { lists, firebaseRef }  = state;
    // console.log(state);
    return {
        lists,
        firebaseRef
    };

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setLists, setListName, setItems }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);