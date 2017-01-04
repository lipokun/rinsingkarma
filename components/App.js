import React, { Component } from 'react'
import { Navigator } from 'react-native'
import List from './List'
import Add from './Add'
import Login from './Login'
import Setting from './Setting'
import Rules from './Rules'
import Propose from './Propose'
import Play from './Play'
import Karma from './Karma'
import Ranking from './Ranking'

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
        if(route.rules) return <Rules navigator={navigator}/>
        if(route.add) return <Add navigator={navigator} />
        if(route.karma) return <Karma navigator={navigator} />
        if(route.login) return <Login navigator={navigator} />
        if(route.setting) return <Setting navigator={navigator} />
        if(route.goPropose) return <Propose navigator={navigator} />
        if(route.play) return <Play navigator={navigator} />
        if(route.ranking) return <Ranking navigator={navigator} />
    }

}
