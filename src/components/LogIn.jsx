import React, { Component } from 'react';
import { Link } from 'react-router';
import { firebaseApp } from "../firebase";


export default class Login extends Component {
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

    logIn() {
        // console.log('this.state', this.state);
        const {email, password} = this.state;
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .catch(error => {
                this.setState({
                    error
                })
            });
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="form-inline col-sm-8 col-sm-offset-2">
                        <h2
                            style={{
                                textAlign:'center',
                                color:'white',
                            }}
                        >Log In
                        </h2>
                        <div
                            style={{
                                margin:'20px 18%',
                            }}
                            className="form-group">
                            <input
                                style={{
                                    marginRight:'5px',
                                    marginBottom:'5px'
                                }}
                                className="form-control"
                                type="text"
                                placeholder="email"
                                onChange={e => this.setState({email: e.target.value})}
                            />
                            <input
                                style={{
                                    marginRight :'5px',
                                    marginBottom:'5px'
                                }}
                                className="form-control"
                                type="password"
                                placeholder="password"
                                onChange={e => this.setState({password: e.target.value})}
                            />
                            <button
                                className="btn btn-success"
                                type="button"
                                onClick={() => this.logIn()}
                            >Log in
                            </button>
                            <div>{this.state.error.message}</div>
                            <div style={{paddingTop:'10px'}}>
                                <Link to="signup">Sign Up instead</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}