//list.js I replaced this component (depreciated) by the component Rules.js

import React, { Component } from 'react'
import {
    View,
    Text,
    ListView,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native'
import Vote from './Vote'
import Config from './../config'

export default class List extends Component {

    constructor(props) {
        super(props)

        this.state = {
            rules : [],
            ds : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }

        this.renderRow = this.renderRow.bind(this)
        this.headerLV = this.headerLV.bind(this)
        this.footerLV = this.footerLV.bind(this)
    }

    // componentWillMount() {
    //     navigator.geolocation.getCurrentPosition(position => {
    //         console.log(position)
    //     })
    // }

    componentDidMount() {
        fetch(Config.API.get('regles'))
            .then((response) => response.json())
            .then((rules) => {
                this.setState({ rules : rules })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                  <ListView
                      enableEmptySections={true}
                      dataSource={this.state.ds.cloneWithRows(this.state.rules)}
                      renderRow={this.renderRow}
                      renderHeader={this.headerLV}
                      renderFooter={this.footerLV} />
            </View>
        )
    }

    renderRow(rule, index) {
        return (
            <View
                key={index}
                style={styles.row}>
                <Vote down idRule={rule.id}/>
                <View style={styles.ruleInfo}>
                    <Text style={styles.textCenter}>{rule.title}</Text>
                </View>
                <Vote up idRule={rule.id}/>
            </View>
        )
    }

    headerLV(){
      return(
        <Image
            source={{ uri : "http://www.risingkarma.com/assets/img/karmaTop.JPG" }}
            style={styles.imgHeaderFooter} />
      )
    }

    footerLV(){
      return(
        <Image
            source={{ uri : "http://www.risingkarma.com/assets/img/karmaBottom.JPG" }}
            style={styles.imgHeaderFooter} />
      )
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
    },
    imgHeaderFooter: {
      width : Dimensions.get('window').width,
      height: 80
    }
})
