import React, { Component } from 'react';
import { firebaseData } from "../firebase";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { setItems } from "../actions";

class ItemList extends Component {
    
    componentDidMount() {
        firebaseData.on('value', snapshot => {
            let list = [];
            snapshot.forEach(elem => {
                list.push({
                    email: elem.val().email,
                    item: elem.val().item
                });
            });
            this.props.setItems(list);
        });

    }

    render() {
        return (
            <div className="row">
                <ul
                    className="col-sm-8 col-sm-offset-2"
                    style={{listStyle:'none'}}
                >
                    {
                        this.props.items.map((elem,index) => {
                            return (
                                <li
                                    key={index}
                                >{elem.item}
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
    console.log('item list props',state);
    return {
        items: state.items
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);