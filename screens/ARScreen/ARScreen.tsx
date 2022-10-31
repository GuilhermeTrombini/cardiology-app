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
} from '@viro-community/react-viro';

import styles from './styles';

const MainScene = () => {
  return (
    <ViroARScene>
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
        position={[0, 0, -0]}
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
        style={styles.helloWorldTextStyle}
        transformBehaviors={['billboardY']}
      />
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
        style={styles.helloWorldTextStyle}
      />
    </ViroARScene>
  );
};

const ARScreen = () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: MainScene,
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
