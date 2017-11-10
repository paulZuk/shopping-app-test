import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { setItems, markFinished, deleteItem,updateItem } from "../actions";

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qType: "",
            quantity: 0,
        }
    }

    deleteFromList(e,id) {
        e.stopPropagation();

        const { firebaseRef, deleteItem } = this.props;

        deleteItem(id);
        firebase.database().ref('lists/' + firebaseRef + '/items/' + id).remove();
    }

    markFinishedToogle(id) {
        this.props.markFinished(id);
        
        const { items, firebaseRef } = this.props;

        items.forEach(item => {
            if (item.id === id) {
                item.finished ? item.finished = true : item.finished = false;
                firebase.database().ref('lists/' + firebaseRef + '/items/' + id).update({
                    finished:item.finished
                });
            }
        })
    }

    quantityUpdate(e,id) {
        this.setState({
            quantity: e.target.value
        }, () => {
            this.props.updateItem(id, "quantity", this.state.quantity);

            let { items, firebaseRef } = this.props;

            items.forEach(item => {
                if (item.id === id) {
                    firebase.database().ref('lists/' + firebaseRef + '/items/' + id).update({
                        quantity: item.quantity
                    });
                }
            })
        })
    }
    qTypeUpdate(e,id) {
        this.setState({
            qType: e.target.value
        }, () => {
            this.props.updateItem(id, "qType", this.state.qType);

            let { items,firebaseRef } = this.props;

            items.forEach(item => {
                if (item.id === id) {
                    firebase.database().ref('lists/' + firebaseRef + '/items/' + id).update({
                        qType: item.qType
                    });
                }
            })
        })
    }

    stopPropagation(e) {
        e.stopPropagation();
    }

    render() {
        // console.log('ItemList props', this.props);
        // console.log('ItemList state', this.state);
        let lists = Object.values(this.props.lists);
        let items = [];

        lists.forEach(list => {
            if(list.active) {
                if(typeof list.items !== "undefined"){
                    items = Object.values(list.items);
                }
            }
        });

        if(typeof items === "undefined"){
            return null
        }

        return (
            <ul
                className="list-group col-sm-8"
                style={{
                    listStyle:'none',
                    paddingLeft:'15px',
                }}
            >
                {
                    items.map(elem => {
                        let h3style = {
                            marginTop:'0',
                            padding:'5px 0'
                        };
                        elem.finished ?
                            Object.assign(h3style, {textDecoration: 'line-through'})
                            : Object.assign(h3style, {textDecoration: 'none'});

                        return (
                            <li
                                key={elem.id}
                                className="list-group-item"
                                onClick={() => this.markFinishedToogle(elem.id)}
                                style={elem.finished? {backgroundColor:'lightgreen'}: {backgroundColor:'white'}}
                            >
                                <h3
                                    style={h3style}
                                >
                                    {elem.item}
                                </h3>

                                <select
                                    onClick={e => this.stopPropagation(e)}
                                    onChange={e => this.qTypeUpdate(e,elem.id)}
                                    value={elem.qType}
                                    disabled={elem.finished}
                                >
                                    <option value="pieces">pieces</option>
                                    <option value="kg">kg</option>
                                    <option value="g">g</option>
                                </select>

                                <input
                                    type="text"
                                    value={elem.quantity}
                                    style={{
                                        marginLeft:'2%',
                                        width:'30px',
                                    }}
                                    disabled={elem.finished}
                                    onClick={e => this.stopPropagation(e)}
                                    onChange={e => this.quantityUpdate(e,elem.id)}
                                />

                                <span
                                    className="glyphicon glyphicon-trash"
                                    style={{float:'right', paddingLeft:'30px', cursor:'pointer'}}
                                    onClick={e => this.deleteFromList(e,elem.id)}
                                >
                                </span>

                                <span
                                    style={{float:'right'}}
                                    className="glyphicon glyphicon-user"
                                >
                                    &nbsp;
                                    {elem.email.slice(0, elem.email.indexOf('@'))}
                                </span>

                            </li>
                        )
                    })
                }
            </ul>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setItems, markFinished, deleteItem, updateItem }, dispatch)

}

function mapStateToProps(state) {
    // console.log('item list props',state);
    const { firebaseRef,lists } = state;
    return {
        items: state.items,
        firebaseRef,
        lists
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);