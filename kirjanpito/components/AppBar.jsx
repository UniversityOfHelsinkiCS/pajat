import theme from '../theme';
import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';

const AppBar = () => {
  return (
    <View style={styles.appBar}>
      <Text style={styles.header}>Kurssit</Text>
    </View>
  );
};

export default AppBar;

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: theme.colors.secondary,
    height: 70,
    width: window.width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: 'white',
    fontSize: theme.fontSizes.heading,
  },
});
