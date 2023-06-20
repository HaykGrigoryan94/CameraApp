import { rect } from '@shopify/react-native-skia';
import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');

export const icons = {
  close: require('./assets/icons/close.png'),
  flash: require('./assets/icons/thunder.png'),
  text: require('./assets/icons/edit-text.png'),
  sticker: require('./assets/icons/sticker.png'),
  goBack: require('./assets/icons/arrow.png'),
};

export const stickers = [
  { sticker: require('./assets/stickers/camera.png'), id: 0 },
  { sticker: require('./assets/stickers/cat.png'), id: 1 },
  { sticker: require('./assets/stickers/follow-us.png'), id: 2 },
  { sticker: require('./assets/stickers/gaming.png'), id: 3 },
  { sticker: require('./assets/stickers/good-morning.png'), id: 4 },
  { sticker: require('./assets/stickers/i-love-you.png'), id: 5 },
  { sticker: require('./assets/stickers/lettering.png'), id: 6 },
  { sticker: require('./assets/stickers/like.png'), id: 7 },
  { sticker: require('./assets/stickers/live-streaming.png'), id: 8 },
  { sticker: require('./assets/stickers/miss-you.png'), id: 9 },
  { sticker: require('./assets/stickers/offline.png'), id: 10 },
  { sticker: require('./assets/stickers/party-time.png'), id: 11 },
  { sticker: require('./assets/stickers/party.png'), id: 12 },
  { sticker: require('./assets/stickers/suitcase.png'), id: 13 },
  { sticker: require('./assets/stickers/turntable.png'), id: 14 },
];

const stickerDimensions = {
  stickerX: 32,
  stickerY: 20,
  stickerWidth: 100,
  stickerHeight: 100,
};

export const locationStickerDimensions = rect(
  stickerDimensions.stickerX,
  stickerDimensions.stickerY,
  stickerDimensions.stickerWidth,
  stickerDimensions.stickerHeight,
);
