import React, {PropTypes} from 'react';

const Dashboard = ({title, data = {}}) => {

    const {forecast} = data;

    const displayForecast = () => {
      return (!!forecast) ? forecast.forecast : null;
    };

   return (<div className="o-dashboard panel panel-default">
      <div className="panel-heading"><h4>{title}</h4></div>
      <div className="panel-body">
          <div className="i-forecast">
            <strong>Weather Forecast:</strong>  {displayForecast() || <span className="loading"></span>}
          </div>
      </div>
    </div>);
};

Dashboard.propTypes = {
  data : PropTypes.object,
  title : PropTypes.string
};

export default Dashboard;
