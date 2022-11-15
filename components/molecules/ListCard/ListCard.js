import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import IconButton from '../../atoms/IconButton/IconButton';
import SText from '../../atoms/Text/SText';

const ListCard = ({title, description, onPressEdit, onPressDelete}) => {
  return (
    <View style={styles.cardContainer}>
      <View>
        <SText style={styles.title}>{title}</SText>
        <SText style={styles.description}>{description}</SText>
      </View>
      <View style={styles.iconContainer}>
        <IconButton
          iconName="pencil"
          iconSize={20}
          color="#007AFF"
          onPress={onPressEdit}
        />
        <IconButton
          iconName="bin"
          iconSize={20}
          color="#d90f0f"
          onPress={onPressDelete}
        />
      </View>
    </View>
  );
};

export default ListCard;

const styles = StyleSheet.create({
  cardContainer: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    paddingRight: 30,
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 20,
    minHeight: 100,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 20,
    color: '#000',
  },
  description: {
    fontSize: 15,
    color: '#000',
  },
});
