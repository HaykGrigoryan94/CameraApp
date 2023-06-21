import { Dimensions, Text, TouchableOpacity, View, StyleSheet, Image, Animated } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { icons } from '../../constants';


const { width, height } = Dimensions.get('window');


export const TopLayout = ({ flash }: any) => {
  return (
    <View style={[styles.top, styles.position]}>
      <TouchableOpacity>
        <Image source={icons.close} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={flash}>
        <Image source={icons.flash} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

export const BottomLayout = ({ goToGallery, takePic, flip }: any) => {
  return (
    <View style={[styles.bottom, styles.position]}>
      <TouchableOpacity onPress={goToGallery}>
        <Image source={icons.gallery} style={styles.bottomIcons} />
      </TouchableOpacity>
      <TouchableOpacity onPress={takePic}>
        <Image source={icons.shutter} style={styles.shutterIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={flip}>
        <Image source={icons.flip} style={styles.bottomIcons} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  position: {
    position: 'absolute',
    zIndex: 1,
  },
  icon: {
    tintColor: 'white',
    width: 30,
    height: 30,
  },
  top: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
    width,
  },
  bottom: {
    width,
    height: '10%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: height - (height / 100) * 20,
  },
  shutterIcon: {
    width: 72,
    height: 72
  },
  bottomIcons: {
    width: 46,
    height: 46
  }
})