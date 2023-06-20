import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function CameraComponent({ setUrl }: any) {
  const cameraRef = useRef<any>();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean>(false);
  const [photo, setPhoto] = useState<any>();
  const [flashMod, setFlashMod] = useState(2);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  }
  if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>;
  }

  const takePic = async () => {
    const options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    if (cameraRef) {
      const newPhoto = await cameraRef.current.takePictureAsync(options);
      setUrl(newPhoto);
      setPhoto(newPhoto);
    }
  };

  return (
    <Camera style={styles.container} ref={cameraRef} flashMode={flashMod}>
      <View style={styles.buttonContainer}>
        <Button title="Flash" onPress={() => setFlashMod(flashMod === 3 ? 2 : 3)} />
        <Button title="Take Pic" onPress={takePic} />
        <Button title="flip" onPress={takePic} />
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    width: '100%',
    justifyContent: 'space-between',
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
  },
});
