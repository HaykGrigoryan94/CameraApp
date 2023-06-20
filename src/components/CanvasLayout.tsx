import {Dimensions, Text, TouchableOpacity, View, StyleSheet, Image, Animated} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {icons, stickers} from '../constants';

const {width, height} = Dimensions.get('window');

export function TopLayout() {
  return (
    <View style={[styles.top, styles.position]}>
      <TouchableOpacity>
        <Image source={icons.close} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

export function CenterLayout({openSlider}: any) {
  return (
    <View style={[styles.center, styles.position]}>
      <TouchableOpacity>
        <Image source={icons.text} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={openSlider}>
        <Image source={icons.sticker} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

export function BottomLayout({onPress, onRemove}: any) {
  return (
    <View style={[styles.bottom, styles.position]}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>Save in the gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onRemove}>
        <Text>Remove</Text>
      </TouchableOpacity>
    </View>
  );
}

export function CanvasLayout() {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity>
          <Image source={icons.close} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={icons.flash} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.center}>
        <TouchableOpacity>
          <Image source={icons.text} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={icons.sticker} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button}>
          <Text>Save in the gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function SlideUpContainer({onPress, goBack}: any) {
  const animated = new Animated.Value(0);
  const duration = 1000;
  const stickerList = (el: any) => {
    console.log(width);
    return (
      <TouchableOpacity style={styles.stickerContainer} onPress={() => onPress(el.sticker)}>
        <Image source={el.sticker} style={styles.sticker} />
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View style={[{transform: [{translateY: animated}]}, styles.slider]}>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={goBack}>
          <Image source={icons.goBack} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search GIPHY..."
            placeholderTextColor="white"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={stickers}
        renderItem={({item}) => stickerList(item)}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={styles.flatListWrapper}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'space-between',
    zIndex: 1,
    width,
    height,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
    width,
  },
  center: {
    height: '15%',
    justifyContent: 'space-evenly',
    marginTop: height - (height / 100) * 70,
  },
  bottom: {
    width,
    height: '10%',
    alignItems: 'center',
    marginTop: height - (height / 100) * 15,
  },
  position: {
    position: 'absolute',
    zIndex: 1,
  },
  icon: {
    tintColor: 'white',
    width: 30,
    height: 30,
  },
  button: {
    width: '80%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  slider: {
    width,
    height: height - height / 100,
    backgroundColor: 'rgba(20, 20, 20, 0.80)',
    marginTop: height - (height / 100) * 80,
    position: 'absolute',
    zIndex: 1,
    borderRadius: 10,
  },
  stickerContainer: {
    alignItems: 'center',
    padding: 10,
  },
  sticker: {
    width: 100,
    height: 100,
  },
  flatListWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    width,
    flexDirection: 'row',
    alignItems: 'center',
    height: '10%',
  },
  searchInput: {
    width: '80%',
    height: '20%',
    backgroundColor: 'rgba(159, 159, 159)',
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
    color: 'white',
  },
});
