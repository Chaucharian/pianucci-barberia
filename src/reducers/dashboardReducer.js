import * as actionType from '../actions/types'

export const dashboard = (state = {}, action)  => {
  switch(action.type) {
    case actionType.FETCH_WEATHER:
    console.log(action);
    return Object.assign({}, state, action.payload);
    break;
    case actionType.FETCH_WEATHER_SUCCESS:
      return Object.assign({}, state, action.payload);
    break;
    case actionType.FETCH_WEATHER_FAILURE:
      return Object.assign({}, state, action.payload);
    break;
    case actionType.LOAD_DASHBOARD:
    return Object.assign({}, state, action.payload);
    break;
    default :
      return state;
  }
};