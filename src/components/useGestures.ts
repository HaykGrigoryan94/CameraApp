import { Gesture } from 'react-native-gesture-handler';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { identity4, Matrix4, multiply4, toMatrix3 } from 'react-native-redash';
import { Skia, SkMatrix, useSharedValueEffect } from '@shopify/react-native-skia';
import { concat, vec3 } from './MatrixHelpers';

const useGestures = (skMatrix: any, dimensions: any) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedScale = useSharedValue(1);
  const savedRotation = useSharedValue(0);
  const matrix = useSharedValue(identity4);
  const offset = useSharedValue(identity4);
  const origin = useSharedValue(vec3(0, 0, 0));

  const { x, y, width, height } = dimensions;

  useSharedValueEffect(() => {
    if (skMatrix) {
      (skMatrix.current as SkMatrix) = Skia.Matrix(toMatrix3(matrix.value) as any);
    }
  }, matrix);

  const pan = Gesture.Pan().onChange(e => {
    matrix.value = multiply4(Matrix4.translate(e.changeX, e.changeY, 0), matrix.value);
  });

  const handleRotate = Gesture.Rotation()
    .onBegin(e => {
      origin.value = [e.anchorX, e.anchorY, 0];
      offset.value = matrix.value;
    })
    .onChange(e => {
      matrix.value = concat(offset.value, origin.value, [{ rotateZ: e.rotation }]);
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const handleScale = Gesture.Pinch()
    .onBegin(e => {
      origin.value = [e.focalX, e.focalY, 0];
      offset.value = matrix.value;
    })
    .onChange(e => (matrix.value = concat(offset.value, origin.value, [{ scale: e.scale }])))
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const newX = x + (width / 2) * Math.cos(rotation.value) + (height / 2) * Math.sin(rotation.value);
  const newY = y + (height / 2) * Math.cos(rotation.value) + (width / 2) * Math.sin(rotation.value);

  const styles = useAnimatedStyle(() => ({
    position: 'absolute',
    left: x,
    top: y,
    width,
    height,
    transform: [
      { translateX: -newX },
      { translateY: -newY },
      { matrix: matrix.value as any },
      { translateX: newX },
      { translateY: newY },
    ],
  }));

  return { pan, rotate: handleRotate, scale: handleScale, styles };
};

export default useGestures;
