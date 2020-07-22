import React, { useState, useEffect } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  Text,
  Button,
} from 'react-native';
import AppBar from '../AppBar';
import url from '../../config/url';
import { useDispatch, useSelector } from 'react-redux';
import { loadCourses } from '../../reducers/courseReducer';
import { RadioButton } from 'react-native-paper';
import {
  setFilterEditor,
  hideFilterEditor,
} from '../../reducers/filterEditorReducer';
import {
  loadFilteredList,
  setFilteredList,
} from '../../reducers/courseFilterReducer';

const ListItem = ({ item, addCourse, removeCourse }) => {
  const editor = useSelector((state) => state.editor.isActive);

  // items state
  const [selected, setSelected] = useState(false);

  const selectCourse = () => {
    setSelected(true);
    addCourse(item);
  };

  const dropCourse = () => {
    setSelected(false);
    removeCourse(item);
  };

  const buttonTitle = selected ? 'Poista' : 'Valitse';
  const buttonFunction = selected ? dropCourse : selectCourse;

  const SelectButton = () => (
    <Button title={buttonTitle} onPress={buttonFunction} />
  );

  const selector = editor ? <SelectButton /> : <View />;

  return (
    <View style={selected ? styles.selectedItem : styles.item}>
      <View style={styles.course}>
        <Text style={styles.itemTextBold}>{item.title}</Text>
        <Text style={styles.itemText}>{item.shortTitle}</Text>
      </View>
      <View style={styles.selector}>{selector}</View>
    </View>
  );
};

const CourseList = () => {
  const courses = useSelector((state) => state.courses.courses);
  const editor = useSelector((state) => state.editor.isActive);
  const dispatch = useDispatch();

  const [editorList, setEditorList] = useState([]);

  const addCourse = async (course) => {
    const isListed = await editorList.find((item) => item.id === course.id);
    if (!isListed) {
      const list = editorList.concat(course);
      setEditorList(list);
    }
  };

  const removeCourse = (course) => {
    const list = editorList.filter((item) => item.id !== course.id);
    setEditorList(list);
  };

  const saveFilteredList = () => {
    dispatch(setFilteredList(editorList));
    dispatch(hideFilterEditor());
  };

  const EditButton = () => {
    return (
      <Button
        title='Muokkaa filtteriä'
        onPress={() => dispatch(setFilterEditor())}
      />
    );
  };

  const SaveButton = () => {
    return <Button title='Tallenna muutokset' onPress={saveFilteredList} />;
  };

  const activeButton = editor ? <SaveButton /> : <EditButton />;

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(loadCourses());
    }
  }, []);

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <AppBar title='Kurssit' />
      {activeButton}
      <FlatList
        data={courses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            addCourse={addCourse}
            removeCourse={removeCourse}
          />
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default CourseList;

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: window.width,
    backgroundColor: 'black',
  },
  item: {
    borderStyle: 'solid',
    borderWidth: 1,
    height: 60,
    width: window.width,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectedItem: {
    borderStyle: 'solid',
    borderWidth: 1,
    height: 60,
    width: window.width,
    backgroundColor: '#86929e',
    alignItems: 'center',
    flexDirection: 'row',
  },
  course: {
    width: 240,
  },
  selector: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  itemText: {
    marginLeft: 10,
  },
  itemTextBold: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
  },
  headerBar: {
    height: 40,
    backgroundColor: '#f0951f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
  },
});
