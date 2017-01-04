import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ListView
} from 'react-native'
import StorageManager from './../services/StorageManager'
import Button from './Button'
import Loader from './Loader'
import Config from './../config'

export default class Ranking extends Component {

  constructor(props){
    super(props)

    this.state = {
      pending : false,
      nbUsers : false,
      rankUser : false,
      ranking : [],
      ds : new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2})
    }

    this.StorageManager = new StorageManager()

    this.goPlay = this.goPlay.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }

  componentWillMount() {
    this.setState({pending : true})
    this.StorageManager.get('@User:token').then(token => {
      if(token){
        fetch(Config.API.get('user/ranking'), {
          method  : 'POST',
          body    : JSON.stringify({
            token : token
          })
        })
        .then(response => response.json())
        .then(result => {
          this.setState({pending : false})
          if(result.success){
            this.StorageManager.set('@User:token', result.newtoken).then(() => {
              console.log(result)
              this.setState({rankUser : result.rang})
              this.setState({nbUsers : result.nbUsers})
              this.setState({ ranking : result.ranking})
            })
          }
        })
      }else{
        this.setState({pending : false})
        this.props.navigator.jumpTo({login : true})
      }
    })
  }

  render() {
    if(this.state.pending){
      return <Loader />
    }

    return(
      <View style={style.container}>
        <Text>
          Voici ton rang {this.state.rankUser} (sur {this.state.nbUsers} joueurs)
        </Text>
        <View style={style.ranking}>
          <ListView
            enableEmptySections={true}
            dataSource={this.state.ds.cloneWithRows(this.state.ranking)}
            renderRow={this.renderRow}
          />
        </View>
        <Button
          label="Améliorer mon karma"
          onPress={this.goPlay}
          />
      </View>
    )
  }

  renderRow(ranking,index){
    return(
      <View
        key={index}>
        <View>
          <Text>{ranking.login} : {ranking.karma}</Text>
        </View>
      </View>
    )
  }

  goPlay(){
    this.StorageManager.set('@User:played',"false").then(()=>{
      this.props.navigator.push({play : true})
    })
  }
}

const style = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : "center",
    justifyContent : "center"
  },
  ranking : {
    borderWidth : 2,
    borderColor : "#808080",
    marginBottom : 20,
    width : Dimensions.get('window').width*80/100,
    alignItems : "center",
    justifyContent : "center"
  }
})
