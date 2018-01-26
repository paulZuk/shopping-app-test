import React, { Component } from 'react';
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

    signUp() {

    }


    render() {
        const inputStyle = {
            marginRight:'5px',
            marginBottom:'10px',
        };
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                        <h1
                            style={{
                                textAlign:'center',
                                fontSize:'50px',
                                marginBottom:'50px',
                                paddingTop: '100px',
                                color: 'white',
                            }}
                        >Shopping App
                        </h1>
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
                                placeholder="E-mail"
                                onChange={e => this.setState({email: e.target.value})}
                            />
                            <input
                                style={{...inputStyle, marginBottom:'50px'}}
                                className="form-control"
                                type="password"
                                placeholder="Password"
                                onChange={e => this.setState({password: e.target.value})}
                            />
                            <button
                                style={{width: '40%', marginBottom: '10px'}}
                                className="btn btn-success"
                                type="button"
                                onClick={() => this.logIn()}
                            >Log in
                            </button>
                            <div>{this.state.error.message}</div>
                            <button
                                className='btn btn-primary'
                                style={{width: '40%'}}
                                onClick={() => this.signUp()}
                            >Sign up ?

                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
