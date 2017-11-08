import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setLists, markActiveList } from "../actions/index";

class Lists extends Component {
    
    componentDidMount() {
        let data = firebase.database().ref('lists');
        data.on('value', snapshot => {
            let list = [];
            snapshot.forEach(elem => {
                list.push({
                    name: elem.val().name,
                    user: elem.val().user,
                    id: elem.val().id,
                    active: elem.val().active,
                });
            });
            this.props.setLists(list);

        });
    }

    markActive(id) {
        this.props.markActiveList(id);
        console.log('markactive', this.props.lists);

        this.props.lists.forEach(elem => {
            firebase.database().ref('lists/' + elem.name).update({
                active: elem.active
            });
        })

        
    }

    render() {
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
    return bindActionCreators({ setLists, markActiveList }, dispatch);
}

function mapStateToProps(state) {
    const { lists } = state;
    return {
        lists,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);

