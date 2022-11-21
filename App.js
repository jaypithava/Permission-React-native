import {StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {Permission, PERMISSION_TYPE} from './src/AppPermission';

export default class App extends Component {
  componentDidMount() {
    Permission.requestMultiple([
      PERMISSION_TYPE.microphone,
      PERMISSION_TYPE.photo,
    ]);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>React-Native Permission Demo</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 30,
  },
});
