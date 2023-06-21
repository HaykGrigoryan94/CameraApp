import {
  Skia,
  Image,
  Canvas,
  useImage,
  useValue,
  makeImageFromView,
} from '@shopify/react-native-skia';
import React, { useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { locationStickerDimensions } from "../constants";
import { TopLayout, CenterLayout, BottomLayout, SlideUpContainer } from './CanvasLayout';
import useGestures from './useGestures';

const { width, height } = Dimensions.get('window');

const CanvasComponent = ({ url, setUrl }: any) => {
  const [pickedSticker, setPickedSticker] = useState('')
  const [sliderOpen, setSliderOpen] = useState<boolean>(false)

  const pictureMatrix = useValue(Skia.Matrix());
  const locationMatrix = useValue(Skia.Matrix());

  const ref = useRef(null)
  const image = useImage(url.uri);
  const sticker = useImage(pickedSticker)

  const { pan, rotate, scale, styles } = useGestures(locationMatrix, locationStickerDimensions);

  const takeSnapshot = async () => {
    if (ref.current == null) return;
    // Take the snapshot of the view
    const snapshot = await makeImageFromView(ref);
    const data = snapshot?.encodeToBase64()

    if (data) {
      const path = `${FileSystem.cacheDirectory}${data.slice(0, 7)}.png`;
      FileSystem.writeAsStringAsync(
        path,
        data.replace("data:image/png;base64,", ""),
        { encoding: FileSystem.EncodingType.Base64 }
      )
        .then(() => FileSystem.getInfoAsync(path))
        .then(res => {
          MediaLibrary.saveToLibraryAsync(res.uri)
          setUrl(false)
        })
        .catch(console.error);
    };
  };

  const composed = Gesture.Simultaneous(
    pan,
    Gesture.Simultaneous(scale, rotate)
  );

  return (
    <>
      <Canvas style={{ width, height }} ref={ref}>
        <Image x={0} y={0} fit="cover" image={image} width={width} height={height} matrix={pictureMatrix} />
        {sticker &&
          <Image image={sticker} matrix={locationMatrix} rect={locationStickerDimensions} />
        }
      </Canvas>
      <GestureDetector gesture={composed}>
        <Animated.View style={styles} />
      </GestureDetector>

      <TopLayout onRemove={() => setUrl(null)} />
      <CenterLayout openSlider={() => setSliderOpen(!sliderOpen)} />
      <BottomLayout onPress={takeSnapshot} />
      {sliderOpen && <SlideUpContainer onPress={(sticker: any) => setPickedSticker(sticker)} goBack={() => setSliderOpen(!sliderOpen)} />}
    </>
  );
}

export default CanvasComponent;
