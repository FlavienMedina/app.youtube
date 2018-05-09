import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ScrollView, Picker, AsyncStorage } from 'react-native';
import { CONFIG } from '../constants/index';
import { createStore } from 'redux';
import { connect } from 'react-redux'

const YOUTUBE = CONFIG.YOUTUBE;
const STORAGE = CONFIG.STORAGE;

class SettingsScreen extends React.Component {
  state = { region: '', regionsList: [] }

  updateRegion = (region) => {
    AsyncStorage.setItem(STORAGE.CURRENT_REGION, region).then(() => {
      this.setState({region})
      this.props.dispatch({ type: 'NEW_REGION', payload: {region} })
    })
  }

  async componentWillMount() {
    try {
      const value = await AsyncStorage.getItem(STORAGE.AVAILABLE_REGIONS);
      if (value !== null) {
        this.setState({regionsList: JSON.parse(value)})
      }
      else {
        fetch(`${YOUTUBE.BASE_URL}/i18nRegions?key=${YOUTUBE.API_KEY}&part=snippet,id`)
          .then(res => res.json())
          .then(res => {
            const regions = []
            res.items.forEach(item => {regions.push({id:item.id, name:item.snippet.name})})
            const str = JSON.stringify(regions)
            AsyncStorage.setItem(STORAGE.AVAILABLE_REGIONS, str).then(() => {
              this.setState({regionsList: regions})
            })
          })
      }
    } catch (error) { console.log(error); }
  }
  render() {
    const items = this.state.regionsList.map((item, index) => {
      return ( <Picker.Item label = {item.name} value = {item.id}/>)
    })
    return (
      <View>
        <Picker selectedValue={this.state.region} onValueChange={this.updateRegion}>
          {items}
        </Picker>
        <Text>{this.props.region}</Text>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    region: state.region
  }
}

export default connect(mapStateToProps)(SettingsScreen)
