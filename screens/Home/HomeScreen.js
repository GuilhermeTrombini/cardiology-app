import React, {useState} from 'react';
import {ScrollView, View, StatusBar, StyleSheet} from 'react-native';
import ButtonIcon from '../../components/atoms/Button/ButtonIcon';
import SText from '../../components/atoms/Text/SText';
import ListCard from '../../components/molecules/ListCard/ListCard';
import EditModal from '../../components/molecules/Modal/EditModal';
import styles from './styles';

export const listOfHeartFields = [
  'Veia Cava Superior',
  'Veia Cava Inferior',
  'Artéria Pulmonar Direita',
  'Veia Pulmonar Direita',
  'Átrio Direto',
  'Valva Tricúspide',
  'Valva Pulmonar',
  'Ventrículo Direito',
  'Ventrículo Esquerdo',
  'Valva Mitral',
  'Átrio Esquerdo',
  'Veias Pulmonares Esquerda',
  'Artéria Pulmonar Esquerda',
  'Valva Aórtica',
  'Aorta',
];

const HomeScreen = ({navigation}) => {
  const [diagnosticList, setDiagnosticList] = useState([]);
  const [selected, setSelected] = useState({name: '', description: ''});
  const [isModalVisible, setModalVisibile] = useState(false);
  const [isEditingModal, setIsEditingModal] = useState(false);

  const onCloseModal = () => {
    setModalVisibile(false);
    setIsEditingModal(false);
  };

  const editItemOnList = item => {
    setModalVisibile(true);
    setIsEditingModal(true);
    setSelected(item);
  };

  const removeItemFromList = currentItem => {
    if (diagnosticList.length > 0) {
      const filtered = diagnosticList.filter(
        item => item.name !== currentItem.name,
      );
      setDiagnosticList(filtered);
    }
  };

  const addNewItemToList = (title, description, oldTitle, isEditing) => {
    let currentDiagnosticList = diagnosticList;

    if (diagnosticList.length > 0) {
      const filtered = isEditing
        ? diagnosticList.filter(item => item.name !== oldTitle)
        : diagnosticList.filter(item => item.name !== title);
      currentDiagnosticList = filtered;
    }

    currentDiagnosticList.push({
      name: title,
      description: description,
    });

    setDiagnosticList(currentDiagnosticList);
    setModalVisibile(false);
    setIsEditingModal(false);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        nestedScrollEnabled>
        <StatusBar barStyle={'dark-content'} />
        <EditModal
          isVisible={isModalVisible}
          isEditing={isEditingModal}
          title={selected.name}
          description={selected.description}
          onSaveModalChanges={addNewItemToList}
          onClose={onCloseModal}
        />

        <SText style={styles.welcomeText}>Bem vindo!</SText>
        {diagnosticList.map(item => {
          return (
            <ListCard
              key={item.name}
              title={item.name}
              description={item.description}
              onPressDelete={() => removeItemFromList(item)}
              onPressEdit={() => editItemOnList(item)}
            />
          );
        })}
        <View>
          <ButtonIcon
            label="+"
            fontSize={30}
            onPress={() => setModalVisibile(true)}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomButtonContainer}>
        <ButtonIcon
          label="Ir para visualização AR"
          isDisabled={diagnosticList.length === 0}
          onPress={() => navigation.navigate('ARScreen', {diagnosticList})}
        />
      </View>
    </>
  );
};

export default HomeScreen;
