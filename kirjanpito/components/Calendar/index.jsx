import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
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

const parseClockTime = (time) => {
  const hour = time.split('T')[1].split(':')[0];
  const clockTime = `klo ${parseInt(hour) - 1} - ${hour}`;
  return clockTime;
};

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

const ListItem = ({ item }) => {
  return (
    <View style={styles.hourRow}>
      <View style={styles.time}>
        <Text>{parseClockTime(item.time)}</Text>
      </View>
      <View style={styles.students}>
        <Text>{item.students}</Text>
      </View>
    </View>
  );
};

const CalendarView = () => {
  const [date, setDate] = useState(new Date());
  const parsedDate = date.toISOString().split('T')[0];

  const [courseId, setCourseId] = useState(1);
  const [courses, setCourses] = useState([]);
  const [statistics, setStatistics] = useState([]);

  const [show, setShow] = useState(false);
  const mode = 'date';

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  useEffect(() => {
    const getStatistics = async () => {
      try {
        const result = await fetch(
          `http://0c3f024331fb.ngrok.io/api/statistics/${courseId}/${parsedDate}/`
        );
        let json = await result.json();
        setStatistics(json);
      } catch (e) {
        console.log(e);
      }
    };
    const getCourses = async () => {
      try {
        const result = await fetch('http://0c3f024331fb.ngrok.io/api/courses/');
        const json = await result.json();
        setCourses(json);
      } catch (e) {
        console.log(e);
      }
    };
    if (courses.length === 0) {
      getCourses();
    }
    getStatistics();
  }, [date, courseId]);

  const changeCourse = (value) => {
    if (value) {
      setCourseId(value);
    }
  };

  const ItemSeparator = () => <View style={styles.separator} />;

  const courseList = courses.map((course) => ({
    label: course.title,
    value: course.id,
  }));

  const days = ['Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su'];

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
        renderItem={({ item }) => <ListItem item={item} />}
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
    backgroundColor: theme.colors.buttonPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 40,
    margin: 4,
  },
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
    flex: 1,
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
