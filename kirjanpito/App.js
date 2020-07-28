import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  AsyncStorage,
} from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Main from './components/Main';
import Login from './components/Login';
import store from './store';
import { loadUser } from './reducers/loginReducer';
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn:
    'https://f0ca387254fb4623b5623f8f615c276f@sentry.toska.cs.helsinki.fi/16',
  enableInExpoDevelopment: true,
  debug: true,
});

const LoadingScreen = () => {
  return <View style={styles.container}></View>;
};

const App = () => {
  const isLogin = useSelector((state) => state.login.isLogin);
  const isLoading = useSelector((state) => state.login.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <SafeAreaView style={styles.default}>
      {isLoading && <LoadingScreen />}
      {!isLoading && isLogin ? <Main /> : <Login />}
    </SafeAreaView>
  );
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4ca165',
    opacity: 0.8,
    flex: 1,
  },
  default: {
    flex: 1,
    backgroundColor: 'black',
  },
});
