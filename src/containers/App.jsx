import React, {PropTypes} from 'react';
import Login from './Login';

class App extends React.Component {
    componentDidMount() {
      console.log("asds")
    }

    render() {
      return (
        <div className="container-fluid">
          <div className="container">
            <div className="row">
              asdsd
              <Login />
            </div>
          </div>
        </div>
      );
    }
}

App.PropTypes = {
  panel: PropTypes.object.isRequired,
};

export default App;
