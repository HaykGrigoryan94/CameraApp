import {
  Skia,
  Image,
  Canvas,
  SkImage,
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

function CanvasTest({ url, setUrl }: any) {
  const [pickedSticker, setPickedSticker] = useState('')
  const [image1, setImage1] = useState<SkImage | null>(null);
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
    setImage1(snapshot);
    const data = snapshot?.encodeToBase64()
    console.log(snapshot, typeof image1?.encodeToBase64())

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

  return !image ? null : (
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

      <TopLayout />
      <CenterLayout openSlider={() => setSliderOpen(!sliderOpen)} />
      <BottomLayout onPress={takeSnapshot} onRemove={() => setUrl(null)} />
      {sliderOpen && <SlideUpContainer onPress={(sticker: any) => setPickedSticker(sticker)} goBack={() => setSliderOpen(!sliderOpen)} />}
    </>
  );
}

export default CanvasTest;
