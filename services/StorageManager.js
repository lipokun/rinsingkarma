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