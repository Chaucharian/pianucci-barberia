class ForescastService {

  static getTodayForecast(_cityName = "Mar del plata") {
    return fetch(`http://dataservice.accuweather.com/currentconditions/v1/${_cityName}`);
  }

  static getZipCodeByCity(_name) {
    //return fetch.get()
  }

}

export default ForescastService;
