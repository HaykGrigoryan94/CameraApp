/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions
} from 'react-native';


import CanvasTest from './src/components/CanvasTest'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import CameraComponent from './src/components/camera/index'

const { width, height } = Dimensions.get('window')


function App(): JSX.Element {
  const [url, setUrl] = useState(null);


  return (
    <SafeAreaView style={styles.container}>
      {!url ? <CameraComponent setUrl={(url: any) => setUrl(url)} /> :
        <GestureHandlerRootView>
          <CanvasTest url={url} setUrl={(url: any) => setUrl(url)} />
        </GestureHandlerRootView>
      }
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
  }
});

export default App;
