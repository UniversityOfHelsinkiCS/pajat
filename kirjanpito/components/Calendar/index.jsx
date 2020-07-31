import React, { useState, useEffect } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  Text,
  Button,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import theme from '../../theme';
import AppBar from '../AppBar';
import url from '../../config/url';
import { useDispatch, useSelector } from 'react-redux';
import { loadCourses, setCourseId } from '../../reducers/courseReducer';
import { loadFilteredList } from '../../reducers/courseFilterReducer';
import ListItem from './ListItem';
import * as Sentry from '@sentry/react-native';

// parsing hour interval from Date object
const parseClockTime = (time) => {
  const hour = time.split('T')[1].split(':')[0];
  const clockTime = `klo ${parseInt(hour) - 1} - ${hour}`;
  return clockTime;
};

// Dropdown selector of React Native Picker Select component
const Dropdown = (props) => {
  return (
    <RNPickerSelect
      onValueChange={(value) => props.changeCourse(value)}
      items={props.courses}
      placeholder={{
        label: 'Valitse kurssi',
        value: '',
      }}
    />
  );
};

// calendar view component
const CalendarView = () => {
  const courses = useSelector((state) => state.courses.courses);
  const courseId = useSelector((state) => state.courses.courseId);
  const filteredList = useSelector((state) => state.filter.filteredList);
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const parsedDate = date.toISOString().split('T')[0];
  const [statistics, setStatistics] = useState([]);

  // configuration of React Native Picker component
  const [show, setShow] = useState(false);
  const mode = 'date';

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  // dummy state for forcing useEffect hook to run after inserting students data to database
  const [render, setRender] = useState(0);

  useEffect(() => {
    const getStatistics = async () => {
      try {
        const result = await fetch(
          `${url}/api/statistics/${courseId}/${parsedDate}/`
        );
        let json = await result.json();
        setStatistics(json);
      } catch (e) {
        Sentry.captureException(e);
      }
    };
    const getCourses = () => {
      try {
        dispatch(loadCourses());
        dispatch(loadFilteredList());
      } catch (e) {
        Sentry.captureException(e);
      }
    };
    getCourses();
    if (courseId) {
      getStatistics();
    }
  }, [date, courseId, render]);

  const changeCourse = (value) => {
    if (value) {
      dispatch(setCourseId(value));
    }
  };

  const ItemSeparator = () => <View style={styles.separator} />;

  const displayList = filteredList[0] ? filteredList : courses;

  const courseList = displayList.map((course) => ({
    label: course.title,
    value: course.id,
  }));

  const days = ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'];

  const dateTitle = `${days[date.getDay()]} ${date.toLocaleDateString(
    'fi-FI'
  )}`;

  return (
    <View style={styles.container}>
      <AppBar title='Ohjaustilastot' />
      <View>
        <Text style={styles.infoText}>Valitse päivämäärä ja kurssi:</Text>
      </View>
      <View style={styles.dateButton}>
        <Button onPress={() => setShow(!show)} title={dateTitle} />
      </View>
      <View style={styles.drop}>
        <Dropdown changeCourse={changeCourse} courses={courseList} />
      </View>
      <View>
        {show && (
          <DateTimePicker
            testID='dateTimePicker'
            value={date}
            mode={mode}
            is24Hour={true}
            display='default'
            onChange={onChange}
            textColor='black'
          />
        )}
      </View>
      <View style={styles.subHead}>
        <View style={styles.subHeadLeft}>
          <Text>Aika</Text>
        </View>
        <View style={styles.subHeadRight}>
          <Text>Opiskelijoita</Text>
        </View>
      </View>
      <FlatList
        data={statistics}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ListItem
            item={item}
            index={index}
            render={render}
            setRender={setRender}
          />
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: window.width,
    backgroundColor: 'black',
  },
  container: { backgroundColor: 'white', flex: 1 },
  time: { height: 50 },
  day: {
    backgroundColor: 'gray',
  },
  infoText: {
    marginLeft: 4,
  },
  drop: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 40,
    margin: 4,
  },
  subHead: {
    width: window.width,
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  subHeadLeft: {
    width: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderStyle: 'solid',
  },
  subHeadRight: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  dateButton: {
    backgroundColor: theme.colors.buttonPrimary,
    margin: 4,
  },
});

export default CalendarView;
