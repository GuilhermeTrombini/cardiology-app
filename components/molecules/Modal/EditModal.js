import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Pressable, View, TextInput} from 'react-native';
import {listOfHeartFields} from '../../../screens/Home/HomeScreen';
import ButtonIcon from '../../atoms/Button/ButtonIcon';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import IconButton from '../../atoms/IconButton/IconButton';
import SText from '../../atoms/Text/SText';

const EditModal = ({
  isVisible,
  isEditing,
  title = '',
  description = '',
  onSaveModalChanges,
  onClose,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditingModal, setIsEditingModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [currentDescription, setCurrentDescription] = useState('');

  const onChangeText = value => {
    setCurrentDescription(value);
  };

  useEffect(() => {
    console.log(isEditing);
    if (isVisible) {
      setModalVisible(true);
    }
    if (isEditing) {
      setIsEditingModal(true);
    }
  }, [isVisible, isEditing]);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <IconButton
              style={styles.buttonClose}
              iconName="cross"
              iconSize={15}
              onPress={() => {
                onClose();
                setModalVisible(!modalVisible);
              }}
            />
            <SText style={styles.infoText}>Selecione as opções desejadas</SText>
            <Dropdown
              label="Selecione a área desejada"
              list={listOfHeartFields}
              initialValue={title}
              onSelect={setSelectedItem}
            />
            <TextInput
              defaultValue={description}
              style={styles.input}
              onChangeText={onChangeText}
              placeholderTextColor="#000"
              placeholder="Adicione a descrição da fisiologia aqui ..."
            />
            <ButtonIcon
              style={styles.button}
              label="Salvar"
              onPress={() => {
                setModalVisible(!modalVisible);
                onSaveModalChanges(
                  selectedItem,
                  currentDescription,
                  title,
                  isEditingModal,
                );
                setIsEditingModal(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  infoText: {
    fontSize: 19,
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 150,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    paddingTop: 40,
    textAlign: 'left',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  buttonClose: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 100,
    marginTop: 30,
    marginBottom: 30,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: '#000',
  },
});

export default EditModal;
