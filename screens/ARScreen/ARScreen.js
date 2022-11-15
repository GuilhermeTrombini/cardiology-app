import React, {useState} from 'react';
import {
  ViroARScene,
  ViroText,
  ViroARSceneNavigator,
  ViroTrackingStateConstants,
  ViroScene,
  ViroSkyBox,
  ViroOrbitCamera,
  ViroDirectionalLight,
  ViroAmbientLight,
  ViroNode,
  Viro3DObject,
  ViroMaterials,
  ViroVRSceneNavigator,
  ViroBox,
  ViroPolyline,
  ViroFlexView,
} from '@viro-community/react-viro';

import styles from './styles';

const MainScene = diagnosticList => {
  const [text, setText] = useState('Initializing AR...');

  const handlePositions = name => {
    switch (name) {
      case 'Veia Cava Superior':
        return {card: [-0.3, 0.4, -1], lineEnd: [0.21, -0.18, -0.05]};
      case 'Veia Cava Inferior':
        return {card: [-0.4, -0.3, -1.1], lineEnd: [0.47, 0.2, -0.06]};
      case 'Artéria Pulmonar Direita':
        return {card: [-0.4, 0, -1.1], lineEnd: [0.4, 0.1, -0.06]};
      case 'Veia Pulmonar Direita':
        return {card: [-0.5, 0, -1.15], lineEnd: [0.52, 0.05, -0.04]};
      case 'Átrio Direto':
        return {card: [-0.3, 0, -1.1], lineEnd: [0.21, 0, 0]};
      case 'Valva Tricúspide':
        return {card: [-0.3, -0.1, -1], lineEnd: [0.21, 0.11, 0]};
      case 'Valva Pulmonar':
        return {card: [-0.3, -0.1, -0.7], lineEnd: [0.21, 0.16, -0.2]};
      case 'Ventrículo Direito':
        return {card: [-0.3, -0.3, -0.9], lineEnd: [0.21, 0.16, 0]};
      case 'Ventrículo Esquerdo':
        return {card: [0.3, -0.3, -0.9], lineEnd: [-0.21, 0.18, 0.05]};
      case 'Valva Mitral':
        return {card: [0.35, -0.05, -0.9], lineEnd: [-0.25, 0.03, -0.03]};
      case 'Átrio Esquerdo':
        return {card: [0.35, -0.05, -1.06], lineEnd: [-0.25, 0.03, 0.02]};
      case 'Veias Pulmonares Esquerda':
        return {card: [0.35, 0, -0.9], lineEnd: [-0.25, 0.04, -0.05]};
      case 'Artéria Pulmonar Esquerda':
        return {card: [0.35, 0.07, -1.1], lineEnd: [-0.24, 0.028, 0.12]};
      case 'Valva Aórtica':
        return {card: [0.3, 0.3, -0.7], lineEnd: [-0.35, -0.2, -0.3]};
      case 'Aorta':
        return {card: [0.3, 0.3, -0.9], lineEnd: [-0.3, -0.1, -0.1]};

      default:
        return {card: [], lineEnd: []};
    }
  };

  const handleViroTexts = () =>
    diagnosticList.map(item => {
      const {card, lineEnd} = handlePositions(item.name);

      return (
        <>
          <ViroFlexView
            key={item.name}
            height={0.75}
            width={2.5}
            position={card}
            backgroundColor={'#fff'}
            transformBehaviors={['billboardY']}
            scale={[0.15, 0.15, 0.15]}>
            <ViroText
              text={item.name}
              style={styles.textName}
              transformBehaviors={['billboardY']}
              textLineBreakMode="Justify"
              textClipMode="None"
            />
          </ViroFlexView>
          <ViroPolyline
            position={card}
            points={[[0, 0, 0], lineEnd]}
            thickness={0.007}
          />
        </>
      );
    });

  function onInitialized(state, reason) {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroSkyBox
        source={{
          nx: require('./res/grid_bg.jpg'),
          px: require('./res/grid_bg.jpg'),
          ny: require('./res/grid_bg.jpg'),
          py: require('./res/grid_bg.jpg'),
          nz: require('./res/grid_bg.jpg'),
          pz: require('./res/grid_bg.jpg'),
        }}
      />
      <ViroOrbitCamera
        position={[0, 0, 0.5]}
        active={true}
        focalPoint={[0, 0, -1]}
      />
      <ViroDirectionalLight direction={[0, 0, -1]} color="#ffffff" />

      <ViroAmbientLight color="#aaaaaa" />

      <ViroNode position={[0, 0, -1]}>
        <Viro3DObject
          source={require('./res/heart.obj')}
          materials={['heart']}
          type="OBJ"
        />
      </ViroNode>
      <ViroText
        text="Heart"
        position={[0.0, 0.0, -3]}
        style={styles.textName}
        transformBehaviors={['billboardY']}
      />

      {handleViroTexts()}
    </ViroARScene>
  );
};

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.textName}
      />
    </ViroARScene>
  );
};

const ARScreen = ({route}) => {
  const {diagnosticList} = route.params;
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: () => MainScene(diagnosticList),
      }}
    />
  );
};

export default ARScreen;

const materials = ViroMaterials.createMaterials({
  heart: {
    lightingModel: 'Blinn',
    diffuseTexture: require('./res/Heart_D3.jpg'),
    specularTexture: require('./res/Heart_S2.jpg'),
    writesToDepthBuffer: true,
    readsFromDepthBuffer: true,
  },
});
