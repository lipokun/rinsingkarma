import React, { Component } from 'react'
import { 
    View,
    StyleSheet,
    Text, 
    TouchableOpacity 
} from 'react-native'

export default class Add extends Component {

    constructor(props) {
        super(props)

        this.goHome = this.goHome.bind(this)
    }

    goHome() {
        this.props.navigator.push({ rules : true })
    }

    render() {
        return (
            <View>
                <Text>Add view !</Text>
                <TouchableOpacity onPress={this.goHome}>
                    <View style={styles.button}>
                        <Text>Home</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    button : {
        backgroundColor : "red",
        padding : 20
    }
})