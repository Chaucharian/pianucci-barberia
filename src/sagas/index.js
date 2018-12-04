import { takeLatest, takeEvery } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import  * as type  from '../actions/types';
import { loadWeather } from './loadWeather';
import {loadDashboardSequenced} from './loadDashboardSequenced';
import {loadDashboardNonSequenced} from './loadDashboardNonSequenced';
import {loadDashboardNonSequencedNonBlocking, isolatedForecast, isolatedFlight } from './loadDashboardNonSequencedNonBlocking';

function* rootSaga() {
  /*The saga is waiting for a action called LOAD_DASHBOARD to be activated */
  yield [
   takeLatest(type.LOAD_DASHBOARD, loadWeather)
    ];
}

export default rootSaga;
 