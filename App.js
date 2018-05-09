import React from 'react';
import HomeScreen from './screens/home';
import VideoScreen from './screens/video';
import SettingsScreen from './screens/settings';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

console.disableYellowBox = true;

const initial_state = {
  region: ''
};

function reducer(state = initial_state, action) {
  switch (action.type) {
    case 'NEW_REGION':
      return {
        region: action.payload.region
      }
    case 'CLEAR_REGION':
      return {
        region: 'FR'
      }
    default:
      return state
  }
}

const store = createStore(reducer);

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
          <Provider store={store}>
            <RootStack />
          </Provider>        )
    }
}
