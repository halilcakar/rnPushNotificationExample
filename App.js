import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AppState } from 'react-native';

import PushController from './src/PushController';

import PushNotification from 'react-native-push-notification';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.sendNotification = this.sendNotification.bind(this);
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  };

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  };

  // This will notify the user in 3 seconds after sending the app to the 
  // background (like after pressing the home button or switching apps)
  handleAppStateChange(appState) {
    console.log(appState);
    if (appState === 'background') {
      PushNotification.localNotificationSchedule({
        color: "#DE5F43",
        title: "AppState::background",
        message: 'Since background::Scheduled::done!', // (required)
        date: new Date(Date.now() + (3 * 1000)) // in 3 secs
      });
    } 
    else if(appState === 'active') {
      PushNotification.localNotification({
        title: "componentDidMount",
        message: 'componentDidMount::done!',
        color: "#DE5F43"
      });
    }
  };

  sendNotification() {
    PushNotification.localNotification({
      color: "#DE5F43", // (optional) default: system default
      id: '123',
      title: "Button Notification", // (optional)
      message: 'sendNotification::done!'

    });

    // Schedule a notification
    PushNotification.localNotificationSchedule({
      title: 'Button Scheduled Notification',
      message: 'Button Scheduled delay notification message 5sec::done!', // (required)
      color: "#DE5F43",
      date: new Date(Date.now() + (5 * 1000)) // in 3 secs
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <PushController />
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Button title='Press here for a notification' onPress={this.sendNotification} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
