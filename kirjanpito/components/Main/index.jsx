import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import CourseList from '../CourseList';
import Calendar from '../Calendar';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';
import * as RootNavigation from './RootNavigation.js';
import { logOut } from '../../reducers/loginReducer';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../theme.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Sentry from '@sentry/react-native';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ submitLogout }) => {
  const user = useSelector((state) => state.login.user);
  return (
    <DrawerContentScrollView>
      <View style={styles.user}>
        <Text style={styles.userText}>{user.fullName}</Text>
      </View>
      <DrawerItem
        label='Ohjaustilastot'
        onPress={() => RootNavigation.navigate('Ohjaustilastot')}
      />
      <DrawerItem
        label='Kurssit'
        onPress={() => RootNavigation.navigate('Kurssit')}
      />
      <DrawerItem
        label='Kirjaudu ulos'
        onPress={submitLogout}
        icon={() => (
          <MaterialCommunityIcons color='black' size={24} name='logout' />
        )}
      />
    </DrawerContentScrollView>
  );
};

const Main = () => {
  const dispatch = useDispatch();
  const submitLogout = async () => {
    dispatch(logOut());
  };
  return (
    <View style={styles.default}>
      <NavigationContainer ref={navigationRef}>
        <Drawer.Navigator
          initialRouteName='Ohjaustilastot'
          drawerContent={() => (
            <CustomDrawerContent submitLogout={submitLogout} />
          )}
        >
          <Drawer.Screen name='Ohjaustilastot' component={Calendar} />
          <Drawer.Screen name='Kurssit' component={CourseList} />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  navHeader: {
    height: 80,
  },
  navHeaderTitle: {
    fontSize: theme.fontSizes.heading,
  },
  user: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  userText: {
    fontWeight: 'bold',
  },
});
