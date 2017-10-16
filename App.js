import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

import Video from 'react-native-video';
import LightVideo from './lights.mp4';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressBar from 'react-native-progress/Bar';

function secondsToTime(time) {
  return ~~(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + time % 60;
}
export default class App extends Component<{}> {
state = {
  paused: false,
  progress: 0,
  duration: 0,
};

handleMainButtonTouch = () => {
  if (this.state.progress >= 1 ) {
    this.player.seek(0);
  }
  this.setState(state => {
    return {
      paused: !state.paused
    }
  })
}

handleProgressPress = (e) => {
const position = e.nativeEvent.locationX;
const progress = (position / 250) * this.state.duration;
this.player.seek(progress);
}
handleEnd = () => {
  this.setState({ paused: true })
}
handleProgress = (progress) => {
  this.setState({
    progress: progress.currentTime / this.state.duration
  })
}
handleLoad = (meta) => {
this.setState({
  duration: meta.duration
})
}


  render() {
    const { width } = Dimensions.get("window");
    const height = width * .5625;
    return (
      <View style={styles.container}>
<View>

<Video repeat
source={LightVideo}
paused={this.state.paused}
style={{ width: "100%" , height}}
resizeMode="contain"
onLoad={this.handleLoad}
onProgress={this.handleProgress}
onEnd={this.handleEnd}
ref={ref => this.player = ref}
/>
<View style={styles.controls}>
<TouchableWithoutFeedback onPress={this.handleMainButtonTouch}>
<Icon name={!this.state.paused ? "pause" : "play"}
size={30} color="#fff" />
</TouchableWithoutFeedback>
<TouchableWithoutFeedback onPress={this.handleProgressPress}>
<View>
<ProgressBar
progress={this.state.progress}
color="#fff"
unfilledColor="rgba(255,255,255,.5)"
borderColor="#fff"
width={250}
height={20}
/>
<Text style={styles.duration}>
{secondsToTime(Math.floor(this.state.progress * this.state.duration))}</Text>
</View>
</TouchableWithoutFeedback>
</View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 250
  },
controls: {
  backgroundColor: "rgba(0,0,0,0.5)",
  height: 48,
  left: 0,
  bottom: 0,
  right: 0,
  position: "absolute",
  flexDirection: "row",
  alignItems: 'center',
  justifyContent: 'space-around',
  paddingHorizontal: 10,
},
mainButton: {
  marginRight: 15,
},
duration: {
  color: "#fff",
  marginLeft: 15,
},
});
