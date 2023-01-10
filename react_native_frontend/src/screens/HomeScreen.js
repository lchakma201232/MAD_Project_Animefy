import { Camera, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from "firebase/auth";
export default function HomeScreen(props) {
    
    const navigation = useNavigation();
    const auth = getAuth();
    const user = auth.currentUser;
    
    console.log(user)
    
    React.useEffect(() => {
        navigation.setOptions({
            title: 'Home',
            headerStyle: {
                backgroundColor: '#14511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'normal',
            },
            headerRight: () => (
                <Text style={{ color: 'white', marginRight: 10, fontSize: 20 }}>{
                    user.displayName
                }</Text>
            ),
        });
    }, [navigation]);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const cameraRef = React.useRef(null);
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    
    // alert(user)

    if (!permission) {
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
            setImageBase64(base64Image);
            const curr_time_since_epoch = Date.now();
            const uri = FileSystem.cacheDirectory + curr_time_since_epoch + '.jpg';
            await FileSystem.writeAsStringAsync(uri, base64Image, { encoding: 'base64' });
            setImage(uri);
            setImageLoading(false);
        }
    }
    async function saveImage() {
        if (image) {
            //ask for permission
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;


            } else {
                const asset = await MediaLibrary.createAssetAsync(image);
                await MediaLibrary.createAlbumAsync('AnimeGAN', asset, false);
                alert('Image saved at AnimeGAN album');
            }
        }
    }
    async function chooseImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.cancelled) {
            console.log('capturing');
            setImage(result.assets[0].uri);
            const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' });
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
            setImageBase64(base64Image);
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
                    <TouchableOpacity style={styles.button2} onPress={() => setImage(null)}>
                        {/* //go back to camera */}
                        <MaterialCommunityIcons name="camera" size={32} color="#000" />

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={saveImage}>
                        {/* //save image */}
                        <MaterialCommunityIcons name="content-save" size={32} color="#000" />
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
                    <TouchableOpacity style={styles.button} onPress={chooseImage}>
                        <MaterialCommunityIcons name="image" size={32} color="#fff" />
                    </TouchableOpacity>

                </View>
            </Camera>
        </View>
    );
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