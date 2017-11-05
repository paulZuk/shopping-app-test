import React, { Component } from 'react';

class MainLayout extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1
                        style={{
                            textAlign:'center',
                            marginBottom: '50px',
                            color:"white",
                        }}
                    >
                        Shopping App
                    </h1>
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default MainLayout;
