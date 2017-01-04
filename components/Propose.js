import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    TextInput
} from 'react-native'
import Button from './Button'
import StorageManager from './../services/StorageManager'
import Config from './../config'

export default class Propose extends Component {

  constructor(props) {
      super(props),
      this.state = {
        ruleTitle : ""
      }

      this.StorageManager = new StorageManager()

      this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(){
    // console.log(this.state.ruleTitle)
    this.StorageManager.get('@User:token').then(token => {
      if(token){
        // console.log(token)
          fetch(Config.API.get('regles/create'), {
            method : 'POST',
            body : JSON.stringify({
              title : this.state.ruleTitle,
              token : token
            })
          }).then(response => response.json())
          .then(result => {
            if(result.success){
              this.StorageManager.set('@User.token', result.newtoken).then(() => {
                this.props.navigator.push({ ranking : true})
              })
            }
          })
      }else{
        this.props.navigator.jumpTo({goPropose : true})//push pas nécessaire => perf (on aura pas de retour en arrière à prévoir)
      }
    })

  }

  render() {
      return (
          <View style={styles.container}>
              <Text>Propose une règle</Text>
              <TextInput
                style={styles.input}
              onChangeText={(ruleTitle) => this.setState({ ruleTitle : ruleTitle})}
                placeholder="écris..."
                value={this.state.ruleTitle}
                />
                <Button
                 label="Créer la règle"
                 style={styles.submit}
                 onPress={this.onSubmit} />
          </View>
      )
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : "center",
    justifyContent : "center"
  },
  input : {
    width : Dimensions.get('window').width / 2
  },
  submit : {
    marginTop : 20,
    width : Dimensions.get('window').width / 2
  }
})
