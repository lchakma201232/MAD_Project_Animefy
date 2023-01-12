import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React,{useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { showImageLibrary } from '../helpers/HelperFunctions';
import IconTray from '../components/IconTray';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import PlaceholderView from '../components/PlaceholderView';
import Loader from '../components/Loader';
const PreviewScreen = (props) => {
    const [imageLoading, setImageLoading] = useState(false);
    const [imagePlaceholder, setImagePlaceholder] = useState(null)
    const navigation = useNavigation();
    React.useEffect(() => {
        props.navigation.setOptions({
            title: 'Preview',
            headerStyle: {
                backgroundColor: '#3ca794',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'normal',
            },
            headerRight: () => (
                <View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('ImageGallery')}>
                        <MaterialCommunityIcons name="image-multiple" size={24} color="white" style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);
    const image = props.route.params.image;
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
        const result = await showImageLibrary();
        if (result) {
            setImagePlaceholder(result);
            setImageLoading(true);
            const base64 = await FileSystem.readAsStringAsync(result, { encoding: 'base64' });
            const url = 'https://akhaliq-animeganv2.hf.space/api/predict';
            const uri = await Animefy(base64, url, 'version 2');
            setImageLoading(false);
            props.navigation.navigate('Preview', { image: uri });
        }
    }
    

    if (imageLoading) return (
        <View style={styles.mainContainer}>
            <PlaceholderView uri={imagePlaceholder} />
            <Loader loading={true} />
        </View>);
    return (
        <View style={styles.container2}>
            <View style={styles.container}>
                {/* <View style={styles.container3}> */}
                    <Image source={{ uri: image }} style={styles.imageContainer} />
                {/* </View> */}
            <IconTray capture={() => props.navigation.navigate('HomeDrawer')} chooseImage={chooseImage} type="preview" saveImage={saveImage} />
            </View>
        </View>
    );

}
const styles = StyleSheet.create({
    mainContainer: {
        // flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',

    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'black',
        height: 380
    },
    container2: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        height: '100%',
    },
    container3: {
        // flex: 1,
        // margin: 64,,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        // width: 400
        width: '100%',
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

export default PreviewScreen