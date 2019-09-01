class ForescastService {

  static getTodayForecast(cityName = "Mar del plata") {
    return fetch(`http://dataservice.accuweather.com/currentconditions/v1/${cityName}`);
  }

  static getZipCodeByCity(_name) {
    //return fetch.get()
  }

}

export default ForescastService;
