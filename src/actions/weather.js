import * as type from './types';

export const fetchWeather = location => ({
    type: type.FETCH_WEATHER,
    location: location
}); 

export const fetchWeatherSuccess = data => ({
    type: type.FETCH_WEATHER_SUCCESS,
    conditions: data
}); 

export const fetchWeatherFailure = data => ({
    type: type.FETCH_WEATHER_FAILURE,
    conditions: data
}); 