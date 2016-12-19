import React, { Component } from 'react'
import { 
    View, 
    Text,
    ListView,
    StyleSheet
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
    }

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
                    renderRow={this.renderRow} />
            </View>
        )
    }

    renderRow(rule, index) {
        return (
            <View 
                key={index} 
                style={styles.row}>
                <Vote down />
                <View style={styles.ruleInfo}>
                    <Text style={styles.textCenter}>{rule.title}</Text>
                </View>
                <Vote up />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#eee",
        padding : 10
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