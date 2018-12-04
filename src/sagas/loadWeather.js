import { call, put } from 'redux-saga/effects';
import {fetchWeather } from './apiCalls';
import { fetchWeatherSuccess, fetchWeatherFailure } from '../actions/weather';

export function* loadWeather() {
  console.log("ADAS");
  try {
    //Get User Info
    const weather = yield call(fetchWeather);

    //Tell the store to save the user Info also activate loadDashboardSecuenced
    yield put(fetchWeatherSuccess(weather));

  } catch(error) {
    yield put(fetchWeatherFailure('Fetching failed'));
  }
}
