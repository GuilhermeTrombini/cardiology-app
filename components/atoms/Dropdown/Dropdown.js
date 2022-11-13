import React, {useRef, useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from '../icon/Icon';
import SText from '../Text/SText';

const Dropdown = ({label, list, initialValue, onSelect}) => {
  const [visible, setVisible] = useState(false);
  const DropdownButton = useRef();
  const [dropdownTop, setDropdownTop] = useState(0);
  const [selected, setSelected] = useState(initialValue);

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const onItemPress = item => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
        <SText style={styles.buttonText}>{item}</SText>
      </TouchableOpacity>
    );
  };

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}>
          <View style={[styles.dropdown, {top: dropdownTop}]}>
            <FlatList
              bounces={false}
              data={list}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item}-${index}`}
              scrollEnabled
              nestedScrollEnabled
              showsVerticalScrollIndicator
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <>
      <TouchableOpacity
        ref={DropdownButton}
        style={styles.button}
        onPress={toggleDropdown}>
        <SText style={styles.buttonText}>
          {(selected && selected) || label}
        </SText>
        {visible ? <Icon name="arrow-up" /> : <Icon name="arrow-down" />}
        {renderDropdown()}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 10,
    zIndex: 1,
    position: 'relative',
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  overlay: {
    width: '75%',
    height: '100%',
  },
  dropdown: {
    position: 'absolute',
    left: 50,
    backgroundColor: '#fff',
    width: '100%',
    height: '25%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
    overflow: 'scroll',
  },
});

export default Dropdown;
