import React, { Component } from 'react'
import { Navigator } from 'react-native'
import List from './List'
import Add from './Add'
import Login from './Login'

export default class App extends Component {

    constructor(props) {
        super(props)

        this.renderScene = this.renderScene.bind(this)
    }

    render() {
        return (
            <Navigator
                initialRoute={{ login : true }}
                configureScene={route => route.SceneConfigs ? route.SceneConfigs : Navigator.SceneConfigs.FloatFromBottomAndroid}
                renderScene={this.renderScene}
             />
        )
    }

    renderScene(route, navigator) {
        if(route.rules) return <List />
        if(route.add) return <Add navigator={navigator} />
        if(route.login) return <Login navigator={navigator} />
    }

}