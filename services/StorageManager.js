//StorageManager.js is a service that use AsyncStorage
//We will use it to get the same comportment as sessions in php

import { AsyncStorage } from 'react-native'

export default class StorageManager {

    set(key, value) {
        if(!key) return false
        return AsyncStorage.setItem(key, value)
    }

    get(key) {
        return AsyncStorage.getItem(key)
    }

}
