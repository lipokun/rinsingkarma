import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions,
    ActivityIndicator,
    Image
} from 'react-native'
import Button from './Button'
import Loader from './Loader'
import StorageManager from './../services/StorageManager'
import Config from './../config'

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            login : "martin",
            password : "123456",
            pending : false,
            type : "connexion",
            errorMessage : ""
        }

        //système de stockage (ici: token user)
        this.StorageManager = new StorageManager()

        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillMount() {
        this.setState({ pending : true })
        this.StorageManager.set('@User:played', "false").then(() => {
          this.StorageManager.get('@User:token').then(token => {
              if(token) {
                  fetch(Config.API.get('login/connexionViaToken'), {
                      method : 'POST',
                      body : JSON.stringify({ token : token })
                  }).then(response => response.json()).then(result => {
                      if(result.success) {
                          this.props.navigator.push({ play : true })
                          // console.log(this.props.navigator)
                      }
                      this.setState({ pending : false })
                  })
              } else {
                  this.setState({ pending : false })
              }
          })
        })
    }

    updateUsername(userName) {
        this.setState({login : userName })
        if(this.state.type == "inscription") {
          let uriApi = 'login/uniqLogin?login='+this.state.login
          return fetch(Config.API.get(uriApi))
          .then(response => response.json())
          .then(result => {
            this.setState({ errorMessage : (result.success) ? "" : result.message })
            console.log(result.message)
          })
            // Api.get("/login/uniqLogin?login=" + this.state.login).then((response) => {
            //     this.setState({ errorMessage : (response.success) ? "" : response.message });
            //     console.log(response.message)
            // });
        }else{
          this.setState({ errorMessage : "" })
        }
    }

    onSubmit() {
        let endpoint = (this.state.type == "connexion") ? "/login/connexion" : "/login/createAccount";

        this.setState({ pending : true })
        fetch(Config.API.get(endpoint), {
            method : 'POST',
            body : JSON.stringify({
                login : this.state.login,
                pass : this.state.password
            })
        }).then(response => response.json())
        .then(result => {
            if(result.success) {
                this.StorageManager.set('@User:token', result.token).then(() => {
                    this.props.navigator.push({ play : true })
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
                <Image
                    source={{ uri : Config.API.get('assets/img/karmaTop.JPG') }}
                    style={styles.imgHeaderFooter} />
                <View style={styles.formChoiceContainer}>
                    <TouchableOpacity onPress={() => { this.setState({ type : "connexion" }) }}>
                        <View style={[ styles.formChoice, (this.state.type == "connexion") ? { borderColor : "#2196F3" } : null ]}>
                            <Text>Connexion</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.setState({ type : "inscription" }) }}>
                        <View style={[ styles.formChoice, (this.state.type == "inscription") ? { borderColor : "#2196F3" } : null ]}>
                            <Text>Inscription</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.updateUsername.bind(this)}
                        placeholder="Login"
                        value={this.state.login} />

                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({ password : password })}
                        placeholder="Password"
                        value={this.state.password} />
                    <Text>{this.state.errorMessage}</Text>
                    <Button
                        label={this.state.type}
                        style={styles.submit}
                        onPress={this.onSubmit} />
                </View>
                <Image
                    source={{ uri : Config.API.get('assets/img/karmaBottom.JPG') }}
                    style={styles.imgHeaderFooter} />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : "center",
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: Config.COLORS.white
    },
    input : {
        width : Dimensions.get('window').width / 2
    },
    submit : {
        marginTop : 20,
        width : Dimensions.get('window').width / 2
    },
    imgHeaderFooter: {
      width : Dimensions.get('window').width,
      height: 80
    },
    formChoiceContainer : {
        width : Dimensions.get("window").width,
        flexDirection : "row",
        justifyContent : "space-around",
        alignItems : "center"
    },
    formChoice : {
        borderColor : "transparent",
        padding : 10
    }
})
