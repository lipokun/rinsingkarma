import React, { Component } from 'react'
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity 
} from 'react-native'
import Config from './../config'

export default class Vote extends Component {

    constructor(props) {
        super(props)

        this.onVote = this.onVote.bind(this)
        this.renderText = this.renderText.bind(this)
    }

    onVote() {
        // fetch(Config.API.get(''))
    }

    renderText() {
        if(this.props.up) {
            return <Text>Up !</Text>
        }

        if(this.props.down) {
            return <Text>Down !</Text>
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