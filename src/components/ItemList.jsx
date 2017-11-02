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
                    className="list-group col-sm-6 col-sm-offset-3"
                    style={{
                        listStyle:'none',
                        paddingLeft:'15px',
                    }}
                >
                    {
                        this.props.items.map((elem,index) => {
                            return (
                                <li
                                    key={index}
                                    className="list-group-item"
                                >{elem.item}
                                    <span style={{float:'right', paddingLeft:'30px'}}>
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
    console.log('item list props',state);
    return {
        items: state.items
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);