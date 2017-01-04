import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Image
} from 'react-native'
import Button from './Button'
import Loader from './Loader'
import StorageManager from './../services/StorageManager'
import Config from './../config'

export default class Karma extends Component {

  constructor(props) {
    super(props)
    this.state = {
      karma : "0",
      pending : false,
      illus : Config.API.get('assets/img/karmaNeutreCenter.JPG'),
      conseil : "Pour le moment. Evalue le... si tu l'oses",
      routeToRules : false,
      labelBtn : "Jouer"
    }

    this.StorageManager = new StorageManager()

    this.goPlay = this.goPlay.bind(this)

  }

  componentWillMount(){
    this.setState({ pending : true })

    this.StorageManager.get('@User:played').then(played => {
      if("true"===played){
        this.setState({routeToRules : true})
        this.setState({labelBtn : "Aide ton prochain à évaluer son Karma"})
      }
    })

    this.StorageManager.get('@User:token').then(token => {
      if(token) {
        // console.log('le token en cours: '.token)
        fetch(Config.API.get('user/myKarma'), {
          method : 'POST',
          body : JSON.stringify({ token : token })
        }).then(response => response.json()).then(result => {
          if(result.success) {
            this.StorageManager.set('@User:token', result.newtoken).then(() => {
              this.setState({ karma : result.karma })
              this.setState({ pending : false })
              if(result.karma != 0){
                if(result.karma > 0 ){
                  this.setState({ illus : Config.API.get('assets/img/karmaBonCenter.JPG') })
                  this.setState({ conseil : "Hey, c'est positif :) continue" })
                }else{
                  this.setState({ illus : Config.API.get('assets/img/karmaMauvaisCenter.JPG') })
                  this.setState({ conseil : "Houlà, il va falloir travailler" })
                }
              }
              // console.log(result.karma)
            })
          }else{
            this.setState({ pending : false })
            console.log(result.message)
          }
        })
      }else{
        this.setState({ pending : false })
        // console.log('pas de token a envoyer')
        this.props.navigator.jumpTo({ login : true })
      }
    })
  }

  render(){
    if(this.state.pending){
      return <Loader />
    }

    return(
      <View style={styles.container}>
          <Image
              source={{ uri : "http://www.risingkarma.com/assets/img/karmaTop.JPG" }}
              resizeMode={Image.resizeMode.contain}
              style={styles.imgHeaderFooter} />
          <View style={styles.center}>
            <Text>Ton Karma est à : {this.state.karma} sur 1000</Text>
            <Text>{this.state.conseil}</Text>
          </View>
          <Image
              source={{ uri : this.state.illus }}
              resizeMode={Image.resizeMode.contain}
              style={styles.imgCentrale} />
          <View>
            <Button
              label={this.state.labelBtn}
              onPress={this.goPlay} />
          </View>
          <Image
              source={{ uri : "http://www.risingkarma.com/assets/img/karmaBottom.JPG" }}
              resizeMode={Image.resizeMode.contain}
              style={styles.imgHeaderFooter} />
      </View>
   )
  }

  goPlay(){
    if(this.state.routeToRules){
      this.props.navigator.push({ rules : true })
    }else{
      this.props.navigator.push({ play : true })
    }
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'center',
    flexDirection : 'column',
    justifyContent : 'space-between',
    backgroundColor : Config.COLORS.white
  },
  imgHeaderFooter : {
    width : Dimensions.get('window').width,
    height: (Dimensions.get('window').height / 100)*15
  },
  imgCentrale : {
    width : Dimensions.get('window').width,
    height: (Dimensions.get('window').height / 100)*50
  },
  center : {
    alignItems : 'center'
  }
})
