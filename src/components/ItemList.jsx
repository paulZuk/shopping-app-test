import React, { Component } from 'react';
import { firebaseData } from "../firebase";
import * as firebase from 'firebase';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { setItems } from "../actions";

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qType: "",
            quantity: 0
        }
    }


    componentDidMount() {
        firebaseData.on('value', snapshot => {
            let list = [];
            snapshot.forEach(elem => {
                list.push({
                    email: elem.val().email,
                    item: elem.val().item,
                    finished: elem.val().finished,
                    quantity: elem.val().quantity,
                    qType: elem.val().qType
                });
            });
            list.forEach((elem,index) => {
                elem.id = Object.keys(snapshot.val())[index];
            });
            this.props.setItems(list);
        });
    }

    deleteItem(e,id) {
        e.stopPropagation();
        firebase.database().ref('items/' + id).remove();
    }

    markFinishedToogle(id) {

        console.log(this.props.items);
        const { items } = this.props;

        items.forEach(item => {
            if(item.id === id) {
                if(item.finished){
                    firebase.database().ref('items/' + id).update({
                        finished:false
                    });
                } else {
                    firebase.database().ref('items/' + id).update({
                        finished:true
                    });
                }
            }
        })
    }

    quantityUpdate(e,id) {
        this.setState({
            quantity: e.target.value
        }, () => {
            firebase.database().ref('items/' + id).update({
                quantity:this.state.quantity
            });
        })
    }
    qTypeUpdate(e,id) {
        this.setState({
            qType: e.target.value
        }, () => {
            firebase.database().ref('items/' + id).update({
                qType:this.state.qType
            });
        })
    }

    stopPropagation(e) {
        e.stopPropagation();
    }

    render() {
        console.log('ItemList props', this.props);
        console.log('ItemList state', this.state);
        return (
            <div className="row">
                <ul
                    className="list-group col-sm-6 col-sm-offset-3"
                    style={{
                        listStyle:'none',
                        paddingLeft:'15px',
                    }}
                >
                    {
                        this.props.items.map(elem => {
                            return (
                                <li
                                    key={elem.id}
                                    className="list-group-item"
                                    onClick={() => this.markFinishedToogle(elem.id)}
                                    style={elem.finished? {backgroundColor:'lightgreen'}: {backgroundColor:'white'}}
                                >
                                    <h3
                                        style={elem.finished ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}
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
                                        style={{float:'right', paddingLeft:'30px', cursor:'pointer'}}
                                        onClick={e => this.deleteItem(e,elem.id)}
                                    >
                                        X
                                    </span>

                                    <span style={{float:'right'}}>
                                        {elem.email}
                                    </span>

                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setItems }, dispatch)

}

function mapStateToProps(state) {
    // console.log('item list props',state);
    return {
        items: state.items
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);