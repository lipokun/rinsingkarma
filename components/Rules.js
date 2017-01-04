import React, { Component } from 'react'
import {
    View,
    Text,
    ListView,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'
import Vote from './Vote'
import Config from './../config'
import StorageManager from './../services/StorageManager'
import Button from './Button'

export default class Rules extends Component {

    constructor(props) {
        super(props)

        //système de stockage (ici: token user)
        this.StorageManager = new StorageManager()

        this.state = {
            rules : [],
            ds : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }

        this.renderRow = this.renderRow.bind(this)
        this.goPropose = this.goPropose.bind(this)
        this.footerLV = this.footerLV.bind(this)
    }

    // componentWillMount() {
    //     navigator.geolocation.getCurrentPosition(position => {
    //         console.log(position)
    //     })
    // }

    componentDidMount() {
      this.StorageManager.get('@User:token').then(token => {
          if(token) {
              fetch(Config.API.get('regles/virginsRules'), {
                  method : 'POST',
                  body : JSON.stringify({ token : token })
              }).then(response => response.json()).then(result => {
                  this.setState({ rules : result.rules })
              })
          }
      })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textCenter}>Ces règles te semblent-elles morales ?</Text>

                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.ds.cloneWithRows(this.state.rules)}
                    renderRow={this.renderRow}
                    renderFooter={this.footerLV} />
            </View>
        )
    }

    renderRow(rule, index) {
        return (
            <View
                key={index}
                style={styles.row}>
                <Vote non idRule={rule.id}/>
                <View style={styles.ruleInfo}>
                    <Text style={styles.textCenter}>{rule.title}</Text>
                </View>
                <Vote oui idRule={rule.id}/>
            </View>
        )
    }

    footerLV(){
      return(
        <Button
            label="Propose une règle"
            onPress={this.goPropose} />
      )
    }

    goPropose(){
      this.props.navigator.push({ goPropose : true })
      // console.log({ propose : true })
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
