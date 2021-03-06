import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../../reducers/studentPanelReducer';
import { getAccessKey } from '../../utils/authStorage';
import { loadStatistics } from '../../reducers/statisticsReducer';
import url from '../../config/url';
import * as Sentry from '@sentry/react-native';

// parsing hour interval from time object
const parseClockTime = (time) => {
  const hour = time.split('T')[1].split(':')[0];
  const clockTime = `klo ${parseInt(hour) - 1} - ${hour}`;
  return clockTime;
};

// student statistics item for FlatList component
const ListItem = ({ item, index, loadPage }) => {
  const isActive = useSelector((state) => state.panel.active);
  const panelIndex = useSelector((state) => state.panel.index);
  const selectedCourse = useSelector((state) => state.courses.selectedCourse);
  const dispatch = useDispatch();

  const setActivePanel = (index) => {
    dispatch(setActive(index));
  };

  // increase and decrease students amount
  const addStudent = async (time, courseId) => {
    const key = await getAccessKey();
    try {
      if (time && selectedCourse) {
        const path = `${url}/api/statistics/add/`;
        const response = await fetch(path, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Key': key,
          },
          body: JSON.stringify({
            time,
            course: courseId,
          }),
        });
        loadPage();
      }
    } catch (e) {
      Sentry.captureException(e);
    }
  };

  const removeStudent = async (time, courseId) => {
    const key = await getAccessKey();
    try {
      if (time && selectedCourse) {
        const path = `${url}/api/statistics/remove/`;
        const response = await fetch(path, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Key': key,
          },
          body: JSON.stringify({
            time,
            course: courseId,
          }),
        });
        loadPage();
      }
    } catch (e) {
      Sentry.captureException(e);
    }
  };

  // non-active students panel
  const basicPanel = (
    <View style={styles.students}>
      <Text>{item.students}</Text>
    </View>
  );

  // active students panel
  const activePanel = (
    <View style={styles.students}>
      <TouchableOpacity
        onPress={() => removeStudent(item.time, selectedCourse.id)}
      >
        <View style={styles.leftIcon}>
          <AntDesign name='minussquareo' size={40} color='black' />
        </View>
      </TouchableOpacity>
      <View style={styles.number}>
        <Text>{item.students}</Text>
      </View>
      <TouchableOpacity
        onPress={() => addStudent(item.time, selectedCourse.id)}
      >
        <View style={styles.rightIcon}>
          <AntDesign name='plussquareo' size={40} color='black' />
        </View>
      </TouchableOpacity>
    </View>
  );

  const panel = isActive && panelIndex === index ? activePanel : basicPanel;

  return (
    <TouchableOpacity onPress={() => setActivePanel(index)}>
      <View style={styles.hourRow}>
        <View style={styles.time}>
          <Text>{parseClockTime(item.time)}</Text>
        </View>
        {panel}
      </View>
    </TouchableOpacity>
  );
};

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  hourRow: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  time: {
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderStyle: 'solid',
  },
  students: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  leftIcon: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListItem;
