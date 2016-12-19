import React, { Component } from 'react'
import { 
    View,
    StyleSheet,
    Text, 
    TouchableOpacity,
    TextInput,
    Dimensions,
    ActivityIndicator 
} from 'react-native'
import Button from './Button'
import Loader from './Loader'
import StorageManager from './../services/StorageManager'
import Config from './../config'

export default class Add extends Component {

    constructor(props) {
        super(props)
        this.state = {
            login : "christophe3",
            password : "123456",
            pending : false
        }

        //système de stockage (ici: token user)
        this.StorageManager = new StorageManager()

        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillMount() {
        this.setState({ pending : true })
        this.StorageManager.get('@User:token').then(token => {
            if(token) {
                fetch(Config.API.get('login/connexionViaToken'), {
                    method : 'POST',
                    body : JSON.stringify({ token : token })
                }).then(response => response.json()).then(result => {
                    if(result.success) {
                        this.props.navigator.push({ rules : true })
                    }

                    this.setState({ pending : false })
                })
            } else {
                this.setState({ pending : false })
            }
        })
    }

    onSubmit() {
        this.setState({ pending : true })
        fetch(Config.API.get('login/connexion'), {
            method : 'POST',
            body : JSON.stringify({
                login : this.state.login,
                pass : this.state.password
            })
        }).then(response => response.json())
        .then(result => {
            if(result.success) {
                this.StorageManager.set('@User:token', result.token).then(() => {
                    this.props.navigator.push({ rules : true })
                })
            }

            this.setState({ pending : false })
        })
    }

    render() {

        if(this.state.pending) {
            return <Loader />
        }

        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={(login) => this.setState({ login : login })}
                    placeholder="Login" 
                    value={this.state.login} />
                
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password : password })}
                    placeholder="Password"  
                    value={this.state.password} />
                
                <Button 
                    label="Connexion" 
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