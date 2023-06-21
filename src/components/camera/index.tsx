import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

import { TopLayout, BottomLayout } from './CameraLayout';

export default function CameraComponent({ setUrl }: any) {
  const cameraRef = useRef<any>();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean>(false);
  const [photo, setPhoto] = useState<any>();
  const [cameraDirection, setCameraDirection] = useState(CameraType.back)
  const [flashMode, setFlashMode] = useState(2)

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


  const toggleCameraType = () => {
    setCameraDirection(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  const toggleFlash = () => {
    setFlashMode(flashMode === 3 ? 2 : 3)
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setUrl(result)
    }
  };

  return (
    <Camera style={styles.container} ref={cameraRef} flashMode={flashMode} type={cameraDirection}>
      <TopLayout flash={() => toggleFlash()} />
      <BottomLayout takePic={takePic} flip={toggleCameraType} goToGallery={() => pickImage()} />
    </Camera>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
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
