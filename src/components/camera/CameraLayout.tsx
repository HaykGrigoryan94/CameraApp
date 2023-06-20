import {Dimensions, Text, TouchableOpacity, View, StyleSheet, Image, Animated} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import { icons } from '../../constants';


const {width, height} = Dimensions.get('window');


export function TopLayout() {
  return (
    <View style={[styles.top, styles.position]}>
      <TouchableOpacity>
        <Image source={icons.close} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={icons.flash} style={styles.icon} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
    width,
  },
})