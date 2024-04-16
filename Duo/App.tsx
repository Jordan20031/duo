import React, { useEffect } from 'react';
import { StyleSheet, StatusBar, View, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';

const VideoPlayer = () => {
  useEffect(() => {
    async function setOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }

    setOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Video
        source={require('./img/Super Mario Maker 2 Online .mp4')}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        style={styles.video}
        useNativeControls={false}
      />
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: height,  // Échange de la largeur et de la hauteur pour le mode paysage
    height: width,
  },
});

export default VideoPlayer;
