import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: "",
        }
    }
    addClick() {
        const { item } = this.state;
        const { email } = this.props.user;
        const { firebaseRef } = this.props;

        let id = Math.floor(Math.random()*100000);

        firebase.database().ref('lists/' + firebaseRef + "/items/" + id).set({
            item,
            id: id,
            email,
            finished: false,
            quantity: 0,
            qType: "",
        });
    }
    render() {
        return (
            <div className="form-group form-inline col-sm-8">
                <div className="row">
                    <div className="col-sm-7">
                        <input
                            style={{width:'100%'}}
                            className="form-control"
                            type="text"
                            placeholder="Item's name"
                            onChange={e => this.setState({item: e.target.value})}
                        />
                    </div>
                    <div className="col-sm-5">
                        <button
                            type="button"
                            style={{width:'100%'}}
                            className="btn btn-primary
                            "
                            onClick={() => this.addClick()}
                        >Add item
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user, firebaseRef } = state;
    // console.log('add item', state);
    return {
        user,
        firebaseRef
    };
}

export default connect(mapStateToProps, null)(AddItem);