import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  TextInput,
  StyleSheet,
} from 'react-native';
import ButtonIcon from '../../components/atoms/Button/ButtonIcon';
import Dropdown from '../../components/atoms/Dropdown/Dropdown';
import SText from '../../components/atoms/Text/SText';
import ListCard from '../../components/molecules/ListCard/ListCard';
import EditModal from '../../components/molecules/Modal/EditModal';
import {} from './styles';

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
  const [currentDescription, setCurrentDescription] = useState('');
  const [isNewDiagnostic, setIsNewDiagnostic] = useState(true);
  const [isModalVisible, setModalVisibile] = useState(false);

  const onCloseModal = () => {
    setModalVisibile(false);
  };

  const editItemOnList = () => {
    setModalVisibile(true);
  };

  const removeItemFromList = currentItem => {
    let currentDiagnosticList = [];
    if (diagnosticList.length > 0) {
      diagnosticList.map((item, index) => {
        if (item?.name.indexOf(currentItem) !== -1) {
          currentDiagnosticList.splice(index, 1);
        }
      });
    }
    setDiagnosticList(currentDiagnosticList);
  };

  const addNewItemToList = (title, description) => {
    let currentDiagnosticList = diagnosticList;

    if (diagnosticList.length > 0) {
      diagnosticList.map((item, index) => {
        if (item?.name.indexOf({name: title, description}) !== -1) {
          currentDiagnosticList.splice(index, 1);
        }
      });
    }

    currentDiagnosticList.push({
      name: title,
      description: description,
    });

    setDiagnosticList(currentDiagnosticList);
    setModalVisibile(false);
  };

  useEffect(() => {}, []);

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        nestedScrollEnabled>
        <StatusBar barStyle={'dark-content'} />
        <EditModal
          isVisible={isModalVisible}
          title={selected.name}
          description={selected.description}
          onSaveModalChanges={addNewItemToList}
          onClose={onCloseModal}
        />

        <SText style={styles.welcomeText}>Bem vindo!</SText>
        {diagnosticList.map((item, index) => {
          return (
            <ListCard
              key={item.name}
              title={item.name}
              description={item.description}
              onPressDelete={removeItemFromList}
              onPressEdit={editItemOnList}
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

const styles = StyleSheet.create({
  welcomeText: {
    color: '#000',
    fontSize: 30,
    marginBottom: 20,
  },
  defaultText: {
    color: '#000',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: '#000',
  },
  scrollViewContainer: {
    padding: 30,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});
