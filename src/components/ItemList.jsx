import React, { Component } from 'react';
import { firebaseData } from "../firebase";
import * as firebase from 'firebase';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { setItems } from "../actions";

class ItemList extends Component {
    
    componentDidMount() {
        firebaseData.on('value', snapshot => {
            let list = [];
            console.log('snapshot',Object.keys(snapshot.val())[0]);
            snapshot.forEach(elem => {
                list.push({
                    email: elem.val().email,
                    item: elem.val().item,
                });
            });
            list.forEach((elem,index) => {
                elem.id = Object.keys(snapshot.val())[index];
            });
            this.props.setItems(list);
        });
    }

    deleteItem(id) {
        firebase.database().ref('items/' + id).remove();
    }

    render() {
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
                                >{elem.item}
                                    <span
                                        style={{float:'right', paddingLeft:'30px', cursor:'pointer'}}
                                        onClick={()=>this.deleteItem(elem.id)}
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