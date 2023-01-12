import ImageView from "react-native-image-viewing";
import React from 'react';
import { Image, StyleSheet , View, Button, BackHandler,Text} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import Loader from "../components/Loader";
import { loadImages } from "../helpers/HelperFunctions";
import app from "../configs/firebaseConfig";
import {getAuth, onAuthStateChanged} from "firebase/auth";
const Gallery = (props) => {
    const [isOpen, setIsOpen] = React.useState(true);
    const [images, setImages] = React.useState([]);
    const closeGallery = () => {
        console.log('called')
        setIsOpen(false);
        props.navigation.goBack();
    }
    // const [imageIndex, setImageIndex] = React.useState(0);
    React.useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                loadImages(user).then((res) => {
                    // console.log(res);
                    setImages(res);
                });
            }
        });
    }, []);
    if(images.length === 0){
        return <View style={{backgroundColor: 'black', flex: 1,justifyContent: 'center'}}><Loader loading={true}/></View>
    }
    return (
        <View>
            <ImageView images={images} imageIndex={0} visible={isOpen} onRequestClose={closeGallery} />
        </View>
    )
};

const styles = StyleSheet.create({
    gridList: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default Gallery;
