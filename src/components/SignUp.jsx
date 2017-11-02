import React, { Component } from 'react';
import { Link } from 'react-router';
import { firebaseApp } from "../firebase";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: {
                message: ""
            }
        }
    }

    signUp() {
        // console.log('this.state', this.state);
        const {email, password} = this.state;
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .catch(error => {
                this.setState({
                    error
                })
            });
    }


    render() {
        return (
            <div className="form-inline">
                <h2>Sign Up</h2>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="email"
                        onChange={e => this.setState({email: e.target.value})}
                    />
                    <input
                        className="form-control"
                        type="password"
                        placeholder="password"
                        onChange={e => this.setState({password: e.target.value})}
                    />
                    <button
                        className="btn btn-success"
                        type="button"
                        onClick={() => this.signUp()}
                    >Sign Up
                    </button>
                    <div>{this.state.error.message}</div>
                    <div><Link to="/login">Already a user ?</Link></div>
                </div>
            </div>
        );
    }

}