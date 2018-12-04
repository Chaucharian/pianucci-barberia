/* eslint-disable react/prop-types */
import React from 'react';
import {connect} from 'react-redux';
import Dashboard from '../components/Dashboard';
import Mixin from './CustomMixin';
import fetchWeather from '../actions/weather';
import * as actionType from '../actions/app';

const Panel = (props) => {
  return(
      <div className="col-md-4">
        <Dashboard title="Forescast" data={props.dashboard} />
      </div>
    );
};

let PanelMixed = Mixin(Panel);

const mapStateToProps = state => ({
    user : state.user,
    dashboard : state.dashboard
});

const mapDispatchToProps = dispatch => {
  return {
    loadDashboard : function() {
      return dispatch(actionType.loadDashBoard());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelMixed);
