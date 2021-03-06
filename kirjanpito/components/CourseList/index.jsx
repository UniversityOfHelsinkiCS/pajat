import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Dimensions, Button } from 'react-native';
import AppBar from '../AppBar';
import { useDispatch, useSelector } from 'react-redux';
import { loadCourses } from '../../reducers/courseReducer';
import {
  setFilteredList,
  loadFilteredList,
  setFilterEditor,
  hideFilterEditor,
} from '../../reducers/courseFilterReducer';
import ListItem from './ListItem';
import { getCourseList, removeCourseList } from '../../utils/courseStorage';

const CourseList = () => {
  const courses = useSelector((state) => state.courses.courses);
  const editor = useSelector((state) => state.filter.isActive);
  const filteredList = useSelector((state) => state.filter.filteredList);
  const dispatch = useDispatch();

  const [editorList, setEditorList] = useState([]);

  const resetFilter = () => {
    removeCourseList();
    setFilteredList([]);
  };

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

  const editFilterList = async () => {
    const list = await getCourseList();
    setEditorList(list);
    dispatch(setFilterEditor());
  };

  const EditButton = () => {
    return <Button title='Muokkaa filtteriä' onPress={editFilterList} />;
  };

  const SaveButton = () => {
    return <Button title='Tallenna muutokset' onPress={saveFilteredList} />;
  };

  const activeButton = editor ? <SaveButton /> : <EditButton />;

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(loadCourses());
    }
    dispatch(loadFilteredList());
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
            filteredList={filteredList}
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
