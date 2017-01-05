//Jouer.js : this component make a link between a button type (jouer) and its action
//when you click on this component, it will update the API DB to tell if you have done or not one another action

import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Config from './../config'
import StorageManager from './../services/StorageManager'

export default class Jouer extends Component {

    constructor(props) {
        super(props)

        this.StorageManager = new StorageManager()
        this.onPlay = this.onPlay.bind(this)
        this.renderText = this.renderText.bind(this)
    }

    onPlay() {

        const jouer = this.props.non ? -1 : 1
        //get connexion token in StorageManager if it exists
        this.StorageManager.get('@User:token').then(token => {
            if(token) {
                fetch(Config.API.get('regles/playRule'), {
                    method : 'POST',
                    body : JSON.stringify({
                      token : token,
                      vote : jouer,
                      idrule : this.props.idRule
                    })
                }).then(response => response.json()).then(result => {
                  if(result.success) {
                      this.StorageManager.set('@User:token', result.newtoken)
                      // **ToImprove** This is a basic test for now. I will provide a better feedback to the player
                      alert("c'est noté :)")//
                  }
                })
            } else {
                this.props.navigator.push({ login : true })
            }
        })
    }

    renderText() {
        if(this.props.oui) {
            return <Text>oui</Text>
        }

        if(this.props.non) {
            return <Text>non</Text>
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={this.onPlay}>
                    <View style={styles.button}>
                        {this.renderText()}
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#eee",
        alignItems : "center",
        justifyContent : "center"
    },
    button : {
        borderRadius : 10,
        backgroundColor : "#ff5722",
        alignItems : "center",
        justifyContent : "center",
        padding : 10
    }
})
