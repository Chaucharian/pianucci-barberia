import { combineReducers } from 'redux';
import user from './userReducer';
import { dashboard } from './dashboardReducer';


 const rootReducer = combineReducers({
   dashboard
 });

 export default rootReducer;
