//Vote.js is a component to vote a rule (morale or not moral)

import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Config from './../config'
import StorageManager from './../services/StorageManager'

export default class Vote extends Component {

    constructor(props) {
        super(props)

        this.StorageManager = new StorageManager()
        this.onVote = this.onVote.bind(this)
        this.renderText = this.renderText.bind(this)
    }

    onVote() {
        // fetch(Config.API.get(''))
        const vote = this.props.non ? -1 : 1
        this.StorageManager.get('@User:token').then(token => {
            if(token) {
                fetch(Config.API.get('regles/vote'), {
                    method : 'POST',
                    body : JSON.stringify({
                      token : token,
                      vote : vote,
                      idrule : this.props.idRule
                    })
                }).then(response => response.json()).then(result => {
                  if(result.success) {
                      this.StorageManager.set('@User:token', result.newtoken)
                      //faire disparaitre la règle de la liste
                      alert("Merci por ton vote :)")
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
                    onPress={this.onVote}>
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
