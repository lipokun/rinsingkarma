import React, { Component } from 'react'
import { 
    View,
    StyleSheet,
    Text, 
    TouchableOpacity 
} from 'react-native'
import Config from './../config'

export default class Button extends Component {

    constructor(props) {
        super(props)

        this.onPress = this.onPress.bind(this)
    }

    onPress() {
        this.props.onPress()
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.onPress}>
                <View 
                    style={[styles.button, this.props.style]}>
                    <Text style={styles.text}>{this.props.label.toUpperCase()}</Text>
                </View>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    button : {
        alignItems : "center",
        justifyContent : "center",
        backgroundColor : Config.COLORS.main,
        padding : 20
    },
    text : {
        color : Config.COLORS.white
    }
})

Button.defaultProps = {
    onPress : () => {},
    style : {}
}