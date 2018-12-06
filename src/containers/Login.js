import React, {PropTypes} from 'react';
import Header from '../components/Header';
import * as actionType from '../actions/app'; 

class Login extends React.Component {

    componentWillMount() {
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