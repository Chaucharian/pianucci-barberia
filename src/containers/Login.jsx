import React, {PropTypes} from 'react';
import * as actionType from '../actions/app'; 

class Login extends React.Component {

    componentDidMount() {
        console.log('das');
    }

    render() {
        return (
            <div className="container">
                <div className="logo"></div>
                <button>Facebook</button>
                <div className="sing-in-form">
                    <input type="text"/>
                    <input type="password"/>
                    <button>Ingresar</button>
                </div>
            </div>
        );
    }

}

export default Login;