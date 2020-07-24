import React, { useState } from 'react';
import { View, Text, Button, Dimensions, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const ListItem = ({ item, addCourse, removeCourse }) => {
  const editor = useSelector((state) => state.editor.isActive);

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

const window = Dimensions.get('window');

const styles = StyleSheet.create({
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
});

export default ListItem;
