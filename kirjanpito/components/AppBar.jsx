import theme from '../theme';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AppBar = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.appBar}>
      <View style={styles.leftIcon}></View>
      <View style={styles.appBarTitle}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.rightIcon}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <View style={styles.iconFrame}>
            <MaterialIcons name='menu' size={40} color='black' />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppBar;

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: theme.colors.primary,
    height: 70,
    width: window.width,
    flexDirection: 'row',
  },
  appBarTitle: {
    height: 70,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: theme.fontSizes.heading,
  },
  leftIcon: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 70,
  },
  rightIcon: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 70,
  },
  iconFrame: {
    width: 70,
    alignItems: 'center',
  },
  header: {
    color: 'white',
    fontSize: theme.fontSizes.heading,
  },
});
