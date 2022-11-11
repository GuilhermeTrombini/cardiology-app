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
import {} from './styles';

const HomeScreen = ({navigation}) => {
  const [diagnosticList, setDiagnosticList] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [currentDescription, setCurrentDescription] = useState('');
  const [isNewDiagnostic, setIsNewDiagnostic] = useState(true);

  const listOfHeartFields = [
    'Veia Cava Superior',
    'Veia Cava Inferior',
    'Artéria Pulmonar Direita',
    'Veia Pulmonar Direita',
    'Átrio Direto',
    'Valva Tricúspide',
    'Valva Pulmonar',
    'Ventrículo Direito',
    'Ventrículo Esquerdo',
    'Valva mitral',
    'Átrio Esquerdo',
    'Veias Pulmonares Esquerda',
    'Artéia Pulmonar Direita',
    'Valva Aórtica',
    'Aorta',
  ];

  const onChangeText = value => {
    setCurrentDescription(value);
  };

  const addNewItemToList = () => {
    const currentDiagnosticList = diagnosticList;

    if (diagnosticList.length > 0) {
      diagnosticList.map((item, index) => {
        if (item?.name.indexOf(selected) !== -1) {
          currentDiagnosticList.splice(index, 1);
        }
      });
    }

    currentDiagnosticList.push({
      name: selected,
      description: currentDescription,
    });

    setDiagnosticList(currentDiagnosticList);
  };

  const updateList = () => {
    setIsNewDiagnostic(false);
  };

  useEffect(() => {
    if (!isNewDiagnostic) {
      addNewItemToList();
    }
  }, [isNewDiagnostic]);

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView style={styles.scrollViewContainer}>
        {isNewDiagnostic ? (
          <View>
            <SText style={styles.defaultText}>
              Parece que você ainda não adicionou nenhum campo ao diagnóstico
            </SText>
            {!!selected && <SText>Selected: label = {selected}</SText>}
            <Dropdown
              label="Selecione a área desejada"
              list={listOfHeartFields}
              onSelect={setSelected}
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              placeholderTextColor="#000"
              placeholder="Adicione a descrição da fisiologia aqui ..."
            />
            <ButtonIcon
              label="Adicionar"
              isDisabled={!selected}
              onPress={updateList}
            />
          </View>
        ) : (
          diagnosticList.map((item, index) => {
            return (
              <View key={`${item}-${index}`}>
                <SText style={styles.defaultText}>{item.name}</SText>
                <TextInput
                  style={styles.input}
                  onChangeText={text => onChangeText(text, item.name)}
                  placeholder="Adicione a descrição da fisiologia aqui ..."
                  placeholderTextColor="#000"
                  value={item.description}
                />
              </View>
            );
          })
        )}
        <ButtonIcon
          label="Ir para visualização AR"
          isDisabled={!selected}
          onPress={() => navigation.navigate('ARScreen', {diagnosticList})}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
});
