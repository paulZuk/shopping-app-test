import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setLists, markActiveList, setListName } from "../actions/index";

class Lists extends Component {

    markActive(id) {
        this.props.markActiveList(id);
        // console.log('markactive', this.props.lists);

        this.props.lists.forEach(elem => {
            
            firebase.database().ref('lists/' + elem.name).update({
                active: elem.active
            });
            
            if(elem.id === id) {
                this.props.setListName(elem.name)
            }
        })

        
    }

    render() {
        if(this.props.firebaseRef === null|| this.props.lists.length === 0){
            return null;
        }
        console.log('LIST PROPS', this.props);
        return (
            <ul
                className="list-group col-sm-4"
                style={{paddingLeft:'15px'}}
            >
                {
                    this.props.lists.map(list => {
                        return (
                            <li
                                key={list.id}
                                className={`list-group-item ${ list.active && 'active'}`}
                                onClick={() => this.markActive(list.id,list.name)}

                            >{list.name}
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ setLists, markActiveList, setListName }, dispatch);
}

function mapStateToProps(state) {
    // console.log('LIST STATE', state);
    const { lists, firebaseRef } = state;
    return {
        lists,
        firebaseRef,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);

