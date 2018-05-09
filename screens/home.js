import React from 'react';
import {StyleSheet,Text,View,Button,TouchableOpacity,Image,ScrollView,AsyncStorage} from 'react-native';
import { CONFIG } from '../constants/index';
import { Icon } from 'react-native-elements'
import { createStore } from 'redux';
import { connect } from 'react-redux'

const YOUTUBE = CONFIG.YOUTUBE;
const STORAGE = CONFIG.STORAGE;

class HomeScreen extends React.Component {
  state = {
    region:'',
    videoList: []
  }
  static navigationOptions = ({navigation}) =>{
    return {
      headerTitle: 'Youtube',
      headerStyle: {
        backgroundColor: '#FF0000',
      },
      headerRight: (
        <TouchableOpacity>
          <Icon onPress={() => navigation.navigate("settings")} style={{float:'right'}} name="settings"/>
        </TouchableOpacity>
      ),
    }
  };

  goToWebView = (id,title) => {
     let link = "https://www.youtube.com/watch?v="+id;
     this.props.navigation.navigate("video", {link,title} )
   };
   callApi = (region) =>{
     const url = `${YOUTUBE.BASE_URL}/search?key=${YOUTUBE.API_KEY}&chart=mostPopular&maxResults=10&order=rating&part=snippet`
     fetch(`${url}&regionCode=${region}`)
     .then(res => res.json())
     .then(res => {
       const videos = []
       res.items.forEach(item => { videos.push(item) })
       this.setState({ videoList: videos })
       return;
     })
   }
  componentDidMount(){
    try{
      AsyncStorage.getItem(STORAGE.CURRENT_REGION).then((result) => {
        if (result) {
          this.props.dispatch({ type: 'NEW_REGION', payload: { region : result } })
          this.callApi(result)
        }
        else {
          const region = 'FR';
          this.props.dispatch({ type: 'NEW_REGION', payload: { region } })
          this.callApi( region)
        }
      })
    }
    catch(error) {
      console.log(error);
    }
  }

  render() {
    const items = this.state.videoList.map((item, index) => {
      return(
        <TouchableOpacity style={styles.container} onPress={() => this.goToWebView(item.id.videoId,item.snippet.title)}>
          <Image style={{width:350, height: 200,resizeMode:'cover'}} source={{uri:item.snippet.thumbnails.high.url}}/>
          <Text>{item.snippet.title}</Text>
        </TouchableOpacity>
      )
    })
    return (
      <ScrollView>
        <Text>Popular videos of {this.props.region}</Text>
        {items}
      </ScrollView>
    )
  }

  static getDerivedStateFromProps(next_props, prev_state) {}
  componentDidUpdate(prev_props, prev_state) {
    this.callApi(prev_props.region);
    return null;
  }
}

function mapStateToProps(state) {
  return {
    region: state.region
  }
}

export default connect(mapStateToProps)(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50,
  },
  items: {
    marginTop: 10,
    backgroundColor: '#C42E2F',
    padding: 20,
    width: '90%'
  },
  item: {
    width: '100%',
    fontSize: 15
  },
});
