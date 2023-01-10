import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

const PlaceholderView = (props) => {
    return (
        <View style={styles.container2}>
            <View style={styles.container}>
                <View style={styles.container3}>
                    <Image source={{ uri: props.uri }} style={styles.imageContainer} />
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'black',

    },
    container: {
        // flex: 1
        justifyContent: 'center',
        alignItems: 'center',
        // height: '100%',
        // height: '100%',
        width: 400,
        height: 400,

    },
    container3: {
        // margin: 64,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        // width: 400
        width: '100%',
    },
    container2: {
        // flex: 2,
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    }, button2: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    imageContainer: {
        // flex: 1,
        width: 300,
        height: 300,
    },
});

export default PlaceholderView