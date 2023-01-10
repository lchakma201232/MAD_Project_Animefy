import ImageView from "react-native-image-viewing";
import React from 'react';
import { Image, StyleSheet , View, Button, BackHandler} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
// import { BackHandler } from 'react-native';
const Gallery = (props) => {
    const [isOpen, setIsOpen] = React.useState(true);
    const closeGallery = () => {
        console.log('called')
        setIsOpen(false);
        props.navigation.goBack();
    }
    const [images, setImages] = React.useState([]);
    const loadImages = async () => {
        const album = await MediaLibrary.getAlbumAsync('AnimeGAN');
        const assets = await MediaLibrary.getAssetsAsync({ album: album});
        const tempImages = assets.assets.map((asset) => {
            return {
                id: asset.id, uri: asset.uri}
            });
        tempImages.reverse();
        console.log('called');
        setImages(tempImages);
    }
    React.useEffect(() => {
        loadImages();
    }, []);

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
