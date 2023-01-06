import { Camera, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react';
export default function HomeScreen() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const cameraRef = React.useRef(null);
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    // useEffect(() => {
    //     setImageLoading(false);
    // }, [image]);
    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }
    async function capture() {
        if (cameraRef.current) {
            console.log('capturing...')
            const photo = await cameraRef.current.takePictureAsync();
            const base64 = await FileSystem.readAsStringAsync(photo.uri, { encoding: 'base64' });
            setImageLoading(true);
            const url = 'https://akhaliq-animeganv2.hf.space/api/predict';
            const json = {
                "data": [
                    "data:image/jpeg;base64," + base64,
                    "version 2"
                ]
            }
            console.log('sending...')
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(json),
            });
            console.log('receiving...')
            const data = await response.json();
            console.log(data);
            const base64Image = data.data[0].split(',')[1];
            const curr_time_since_epoch = Date.now();
            const uri = FileSystem.cacheDirectory + curr_time_since_epoch + '.jpg';
            await FileSystem.writeAsStringAsync(uri, base64Image, { encoding: 'base64' });
            setImage(uri);
            setImageLoading(false);
        }
    }

    if (imageLoading) return <Text>Loading...</Text>
    if (image) {
        return (
            <View style={styles.container2}>
                <View style={styles.container}>
                    <View style={styles.container3}>
                        <Image source={{ uri: image }} style={styles.imageContainer} />
                    </View>
                    <TouchableOpacity style={styles.button2} onPress={()=>setImage(null)}>
                        {/* //go back to camera */}
                        <MaterialCommunityIcons name="camera" size={32} color="#000" />

                    </TouchableOpacity>
                    {/* </View> */}
                </View>
            </View>
        );
    }
    return (
        <View style={styles.mainContainer}>
            {/* {image && <Image source={{ uri: image }}/>} */}
            <Camera style={styles.camera} type={type} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <MaterialCommunityIcons name="camera-switch" size={32} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={capture}>
                        <MaterialCommunityIcons name="camera" size={32} color="#fff" />
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
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
        height: 330,
        
    },
    container3:{
        // margin: 64,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        // width: 400
        width:'100%',
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
    },button2: {
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