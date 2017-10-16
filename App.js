import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions
} from 'react-native';

import Video from 'react-native-video';
import Sample from './sample.mp4';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class App extends Component<{}> {

  state = {
    buffering: true,
    animated: new Animated.Value(0)
  };
handleLoadStart = () => {
  this.triggerBufferAnimation();
}

triggerBufferAnimation = () => {
  this.loopingAnimation = Animated.loop(
    Animated.timing(this.state.animated, {
      toValue: 1,
      duration: 350,
    })
  ).start();
}

handleBuffer = (meta) => {
  meta.isBuffering && this.triggerBufferAnimation();

  if (this.loopingAnimation && !meta.isBuffering) {
    this.loopingAnimation.stopAnimation();
  }
  this.setState({
    buffering: meta.isBuffering
  })
}
  render() {
    const { width } = Dimensions.get("window");
    const height = width * 0.5625;
  const { buffering } = this.state;
  const interpolatedAnimation = this.state.animated.interpolate({
    inputRange: [0,1],
    outputRange: ["0deg", "360deg"]
  });

  const rotateStyle = {
    transform: [
      { rotate: interpolatedAnimation },
    ]
  }
    return (
      <View style={styles.container}>
      <View style={buffering ? styles.buffering : undefined} >
      <Video source={Sample}
      resizeMode="contain"
      onLoadStart={this.handleLoadStart}
      onBuffer={this.handleBuffer}
      />
      <View style={styles.videoCover}>
     {buffering && <Animated.View style={rotateStyle}>
      <Icon name="circle-o-notch" size={30} color="#fff" />
      </Animated.View>}
      </View>

      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 250,
  },
  videoCover: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  buffering: {
    backgroundColor:"#000",
  },
});
