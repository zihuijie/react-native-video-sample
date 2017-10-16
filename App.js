import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import Video from 'react-native-video';
import LightVideo from './lights.mp4';

export default class App extends Component<{}> {

  render() {

    return (
      <View style={styles.container}>

      <Video
      repeat
      source={LightVideo}
      resizeMode="cover"
      style={StyleSheet.absoluteFill}
      />
      <View>
      <Text style={styles.header}>Login</Text>
      <TextInput
      placeholder="Email"
      style={styles.input}
      />
      <TextInput
      placeholder="Password"
      secureTextEntry
      style={styles.input}
      />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
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
  header: {
    fontSize: 30,
    backgroundColor:"transparent",
    color: '#fff',
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor:'#fff',
    marginVertical: 15,
    paddingLeft: 15,
  }
});
