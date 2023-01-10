import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
async function Animefy(base64, url, version) {
    const json = {
        "data": [
            "data:image/jpeg;base64," + base64,
            version
        ]
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
    });
    const data = await response.json();
    const base64Image = data.data[0].split(',')[1];
    const curr_time_since_epoch = Date.now();
    const uri = FileSystem.cacheDirectory + curr_time_since_epoch + '.jpg';
    await FileSystem.writeAsStringAsync(uri, base64Image, { encoding: 'base64' });
    return uri;
}
async function loadImages() {
    const album = await MediaLibrary.getAlbumAsync('AnimeGAN');
    const assets = await MediaLibrary.getAssetsAsync({ album: album});
    const tempImages = assets.assets.map((asset) => {
        return {
            id: asset.id, uri: asset.uri}
        });
    tempImages.reverse();
    return tempImages;
}

export { Animefy, loadImages };