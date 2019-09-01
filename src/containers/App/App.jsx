import React, {PropTypes} from 'react';
import styles from './App.less';

class App extends React.Component {
    componentDidMount() {
      console.log("asds")
    }

    render() {
      return (
        <div className={styles.App}>
          <div>
            Hola GATO
          </div>
          <div>
        PEDAZOD EE GIL
          </div>
          <div>
          TE VA A MORI
          </div>
        </div>
      );
    }
}

App.PropTypes = {
  panel: PropTypes.object.isRequired,
};

export default App;
