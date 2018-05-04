import React from 'react';
import HomeScreen from './screens/home';
import VideoScreen from './screens/video';
import SettingsScreen from './screens/settings';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';

console.disableYellowBox = true;

const RootStack = StackNavigator(
  {
    main: { screen: HomeScreen, },
    video: { screen: VideoScreen, },
    settings: { screen: SettingsScreen, },
  },
);

export default class App extends React.Component {
    render() {
        return (
            <RootStack />
        )
    }
}
