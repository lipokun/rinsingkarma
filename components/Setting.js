import React, { Component } from 'react'
import ImagePicker from 'react-native-image-picker'

import { 
    TouchableOpacity, 
    View, 
    StyleSheet,
    Text
} from 'react-native' 
import Button from './Button'

const options = {
    title : "Ajouter une photo",
    takePhotoButtonTitle : "Prendre une photo",
    chooseFromLibraryButtonTitle : "Choisir dans ma librairie",
    cancelButtonTitle : "Annuler",
    mediaType : "photo",
    quality : 0.4,
    maxWidth : 900,
    maxHeight : 900
};

export default class Setting extends Component {

    constructor(props) {
        super(props)

        this.openPicker = this.openPicker.bind(this)
    }

    openPicker() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log(response)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={this.openPicker} 
                    label="Upload" />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center"
    }
})