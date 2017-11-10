import React, { Component } from 'react';
import * as firebase from 'firebase'
import { connect } from 'react-redux';

class AddList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: ""
        }
    }

    addList() {
        const { email } = this.props.user;

        firebase.database().ref("lists/" + this.state.list).set({
            id: Math.random(),
            name: this.state.list,
            user: email,
            active: false,
            items:[]
        });

       this.nameList.value = "";
    }

    render() {
        return (
            <div className="form-group form-inline col-sm-4">
                <div className="row">
                    <div className="col-sm-7">
                        <input
                            style={{width:'100%'}}
                            className="form-control"
                            type="text"
                            ref={el => this.nameList = el}
                            placeholder="List's name"
                            onChange={e => this.setState({list: e.target.value})}
                        />
                    </div>
                    <div className="col-sm-5">
                        <button
                            type="button"
                            style={{width:'100%'}}
                            className="btn btn-primary"
                            onClick={() => this.addList()}
                        >Add list
                        </button>
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, null)(AddList);