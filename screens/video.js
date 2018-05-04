import React from 'react';
import {StyleSheet,Text,View,Button,TouchableOpacity,Image,ScrollView,WebView} from 'react-native';

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const { params } = navigation.state;
    return{
      title: params.title,
    };
  };
  render() {
    const { params } = this.props.navigation.state;
    const link = params ? params.link : null;
      return(
          <WebView
              source={{uri: `${link}`}}
          />
      );
  }
}

export default HomeScreen
