import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import * as api from '../../services/api';
import { useSelector, selectAuth, useStateValue } from '../../context';
import * as appActions from '../../actions/app';

export function useUserLoggedIn() {
  const [, dispatch] = useStateValue();
  const firebase = useSelector(selectAuth);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data } = useQuery(
    ['user/getData', userId],
    (key, userId) => api.getUserData(userId),
    {
      enabled: userId,
    },
  );

  // watch user session
  useEffect(() => {
    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setLoading(false);
      }
    });
  }, [firebase]);
  // if there's a session fill context user
  useEffect(() => {
    if (data) {
      dispatch(appActions.userLoggedIn(data.user));
      dispatch(appActions.setDaysOff(data.daysOff));
      setLoading(false);
    }
  }, [data]);

  return loading;
}
