import React from 'react';
import ReactDOM from 'react-dom';
import { StateProvider, useStateValue } from '../state/rootState';

const Componnent = () => {
  const [{theme}] = useStateValue();
  return (
    <p>{theme.primary}</p>
  );
}

const App = () => {
  const initialState = {
    theme: { primary: 'green' }
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeTheme':
        return {
          ...state,
          theme: action.newTheme
        };
        
      default:
        return state;
    }
  };
  
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
        <Componnent ></Componnent>
    </StateProvider>
  );
}

export default App;