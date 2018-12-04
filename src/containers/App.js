import React, {PropTypes} from 'react';

class App extends React.Component {
    render() {
      return (
        <div className="container-fluid">
          <div className="container">
            <div className="row">
              { this.props.panel }
              <a href="https://github.com/andresmijares/async-redux-saga" target="_new">Check the repo here</a>
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
