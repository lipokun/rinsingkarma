//Play.js a view in which the player will play the game to evaluate his/her karma
//it use the component Jouer and we try the compenent ListView for lazyloading

import React, { Component } from 'react'
import {
    View,
    Text,
    ListView,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'
import Jouer from './Jouer'
import Config from './../config'
import StorageManager from './../services/StorageManager'
import Button from './Button'

export default class Play extends Component {

    constructor(props) {
        super(props)

        //système de stockage (ici: token user)
        this.StorageManager = new StorageManager()

        this.state = {
            rules : [],
            ds : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }

        this.renderRow = this.renderRow.bind(this)
        this.footerLV = this.footerLV.bind(this)
        this.goKarma = this.goKarma.bind(this)
    }

    // Juste un petit test de geoloc perso

    // componentWillMount() {
    //     navigator.geolocation.getCurrentPosition(position => {
    //         console.log(position)
    //     })
    // }

    componentDidMount() {
      this.StorageManager.get('@User:token').then(token => {
          if(token) {
              console.log("Le token envoyé: "+token)
              fetch(Config.API.get('regles/RulesForUser'), {
                  method : 'POST',
                  body : JSON.stringify({ token : token })
              }).then(response => response.json()).then(result => {
                if(result.success) {
                  this.setState({ rules : result.rules })
                }else{
                  console.log(result.message)
                }
              })
          }
      })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textCenter}>As-tu déjà réalisé ces actions dans ta vie</Text>
                <ListView
                  enableEmptySections={true}
                  dataSource={this.state.ds.cloneWithRows(this.state.rules)}
                  renderRow={this.renderRow}
                  renderFooter={this.footerLV}/>
            </View>
        )
    }

    renderRow(rule, index) {
        return (
            <View
                key={index}
                style={styles.row}>
                <Jouer non idRule={rule.id}/>
                <View style={styles.ruleInfo}>
                    <Text style={styles.textCenter}>{rule.title}</Text>
                </View>
                <Jouer oui idRule={rule.id}/>
            </View>
        )
    }

    footerLV(){
      return(
        <Button
            onPress={this.goKarma}
            label="Calculer mon Karma" />
      )
    }

    goKarma(){
      this.StorageManager.set('@User:played', "true").then(() => {
        this.props.navigator.push({karma : true})
      })
    }

}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#eee",
        padding : 10,
        justifyContent : "center",
    },
    row : {
        borderColor : "#ddd",
        borderWidth : 1,
        borderRadius : 3,
        marginBottom : 10,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-around",
        paddingVertical : 10
    },
    ruleInfo : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center",
    },
    textCenter : {
        textAlign : "center"
    }
})
