import React, { Component } from 'react';
import { firebaseData } from '../firebase';
import { connect } from 'react-redux';

class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: ""
        }
    }
    addClick() {
        const { item } = this.state;
        const { email } = this.props.user;

        firebaseData.push({
            item,
            email,
            finished: false,
            quantity: 0,
            qType: "",
        });
    }
    render() {
        return (
            <div className="form-group col-sm-4 col-sm-offset-4">
                <div className="row">
                    <input
                        style={{marginBottom:'5px'}}
                        className="form-control"
                        type="text"
                        placeholder="item's name"
                        onChange={e => this.setState({item: e.target.value})}
                    />
                </div>
                <div className="row">
                    <button
                        type="button"
                        className="btn btn-success col-xs-2 col-xs-offset-5"
                        onClick={() => this.addClick()}
                    >Add
                    </button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state;
    // console.log('add item', state);
    return {
        user,
    };
}

export default connect(mapStateToProps, null)(AddItem);