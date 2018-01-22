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
        const inputStyle = {
            marginRight:'5px',
            marginBottom:'10px',
            width:'90%'
        };
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-8">
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
                            className="d-flex justify-content-center align-items-center flex-column ">
                            <input
                                style={inputStyle}
                                className="form-control"
                                type="text"
                                placeholder="email"
                                onChange={e => this.setState({email: e.target.value})}
                            />
                            <input
                                style={inputStyle}
                                className="form-control"
                                type="password"
                                placeholder="password"
                                onChange={e => this.setState({password: e.target.value})}
                            />
                            <button
                                style={{width: '30%', marginBottom: '10px'}}
                                className="btn btn-success"
                                type="button"
                                onClick={() => this.logIn()}
                            >Log in
                            </button>
                            <div>{this.state.error.message}</div>
                            <button
                                className='btn btn-danger'
                                style={{width: '30%'}}
                            >Sign up ?

                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}