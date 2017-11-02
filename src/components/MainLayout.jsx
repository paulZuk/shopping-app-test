import React, { Component } from 'react';

class MainLayout extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1
                        style={{
                            textAlign:'center',
                            marginBottom: '50px'
                        }}
                    >
                        Shopping App
                    </h1>
                </div>
                <div className="row">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default MainLayout;
