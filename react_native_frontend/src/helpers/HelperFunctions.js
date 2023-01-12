import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import {
  updateCredit,
  checkCredit,
  getImages,
  addImage,
} from "./AuthFunctions";
// import app from "../configs/firebaseConfig";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
async function Animefy(base64, url, version, user) {
  const json = {
    data: ["data:image/jpeg;base64," + base64, version],
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });
  const data = await response.json();
  const base64Image = data.data[0].split(",")[1];
  checkCredit(user).then((credit) => {
    console.log(credit);
    updateCredit(user, credit - 1);
  });
  addImage(user, base64Image).then(() => {
    console.log("Image added");
  });
  const curr_time_since_epoch = Date.now();
  const uri = FileSystem.cacheDirectory + curr_time_since_epoch + ".jpg";
  await FileSystem.writeAsStringAsync(uri, base64Image, { encoding: "base64" });
  return uri;
}
async function loadImages(user) {
  const images = await getImages(user);
  // console.log(images)
  const uris = [];
  images.forEach((element) => {
    const base64 = element.base64;
    // console.log(base64)
    const uri = FileSystem.cacheDirectory + element.timestamp + ".jpg";
    FileSystem.writeAsStringAsync(uri, base64, { encoding: "base64" });
    uris.push({ id: element.timestamp, uri: uri });
  });
  uris.reverse();
  return uris;
}
async function showImageLibrary() {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    quality: 1,
  });
  if (!result.canceled) {
    return result.uri;
  }
  return null;
}

export { Animefy, loadImages, showImageLibrary };
