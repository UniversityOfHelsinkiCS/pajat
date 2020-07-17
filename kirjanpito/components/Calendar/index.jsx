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
import url from '../../config/url';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../../reducers/studentPanelReducer';
import { getAccessKey } from '../../utils/authStorage';
import { loadCourses, setCourseId } from '../../reducers/courseReducer';

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

// student statistics item
const ListItem = ({ item, index, courseId, render, setRender }) => {
  const isActive = useSelector((state) => state.panel.active);
  const panelIndex = useSelector((state) => state.panel.index);
  const dispatch = useDispatch();

  const setActivePanel = (index) => {
    dispatch(setActive(index));
  };

  const renderPage = () => {
    setRender(render + 1);
  };

  // increase and decrease students amount

  const addStudent = async (time, course) => {
    const key = await getAccessKey();
    try {
      if (time && course) {
        const path = `${url}/api/statistics/add/`;
        const response = await fetch(path, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Key': key,
          },
          body: JSON.stringify({
            time,
            course,
          }),
        });
        renderPage();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeStudent = async (time, course) => {
    const key = await getAccessKey();
    try {
      if (time && course) {
        const path = `${url}/api/statistics/remove/`;
        const response = await fetch(path, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Key': key,
          },
          body: JSON.stringify({
            time,
            course,
          }),
        });
        renderPage();
      }
    } catch (e) {
      console.log(e);
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
      <TouchableOpacity onPress={() => removeStudent(item.time, courseId)}>
        <View style={styles.leftIcon}>
          <AntDesign name='minussquareo' size={40} color='black' />
        </View>
      </TouchableOpacity>
      <View style={styles.number}>
        <Text>{item.students}</Text>
      </View>
      <TouchableOpacity onPress={() => addStudent(item.time, courseId)}>
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

const CalendarView = () => {
  const courses = useSelector((state) => state.courses.courses);
  const courseId = useSelector((state) => state.courses.courseId);
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const parsedDate = date.toISOString().split('T')[0];
  const [statistics, setStatistics] = useState([]);

  const [show, setShow] = useState(false);
  const mode = 'date';
  const [render, setRender] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  useEffect(() => {
    const getStatistics = async () => {
      try {
        const result = await fetch(
          `${url}/api/statistics/${courseId}/${parsedDate}/`
        );
        let json = await result.json();
        setStatistics(json);
      } catch (e) {
        console.log(e);
      }
    };
    if (courses.length === 0) {
      dispatch(loadCourses());
    }
    if (courseId) {
      getStatistics();
      console.log('render stats');
    }
  }, [date, courseId, render]);

  const changeCourse = (value) => {
    if (value) {
      dispatch(setCourseId(value));
    }
  };

  const ItemSeparator = () => <View style={styles.separator} />;

  const courseList = courses.map((course) => ({
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
            courseId={courseId}
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
