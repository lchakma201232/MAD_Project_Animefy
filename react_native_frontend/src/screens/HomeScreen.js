import { Camera, CameraType } from "expo-camera";
import * as FileSystem from "expo-file-system";
import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  PanResponder,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import IconTray from "../components/IconTray";
import { Animefy, showImageLibrary } from "../helpers/HelperFunctions";
import Loader from "../components/Loader";
import PlaceholderView from "../components/PlaceholderView";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../configs/firebaseConfig";
import { checkCredit } from "../helpers/AuthFunctions";
export default function HomeScreen(props) {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = React.useRef(null);
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // Only set pan responder if the swipe is to the right
      return gestureState.dx < -200;
    },
    onPanResponderRelease: (evt, gestureState) => {
      // Navigate to the next screen
      navigation.navigate("ImageGallery");
    },
  });
  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  React.useEffect(() => {
    navigation.setOptions({
      title: "Animefy",
      headerStyle: {
        backgroundColor: "#3ca794",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "normal",
      },
      headerRight: () => (
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("ImageGallery")}
          >
            <MaterialCommunityIcons
              name="image-multiple"
              size={24}
              color="white"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  async function capture() {
    // const auth = getAuth(app);
    if (cameraRef.current) {
      console.log("capturing...");
      const photo = await cameraRef.current.takePictureAsync();
      setImage(photo.uri);
      setImageLoading(true);
      
        const credit = await checkCredit(user);
        if (credit < 1) {
            alert(
            "You have no credits left. Please purchase more credits to continue using the app."
            );
            setImageLoading(false);
            return;
        }

        const base64 = await FileSystem.readAsStringAsync(photo.uri, {
            encoding: "base64",
        });
        const url = "https://akhaliq-animeganv2.hf.space/api/predict";
        const uri = await Animefy(base64, url, "version 2", user);
        setImageLoading(false);
        props.navigation.navigate("Preview", { image: uri });
    }
  }
  async function chooseImage() {
    const credit = await checkCredit(user);
    if (credit < 1) {
      alert(
        "You have no credits left. Please purchase more credits to continue using the app."
      );
      return;
    }
    const result = await showImageLibrary();
    if (result) {
      setImage(result);
      setImageLoading(true);
      const base64 = await FileSystem.readAsStringAsync(result, {
        encoding: "base64",
      });
      const url = "https://akhaliq-animeganv2.hf.space/api/predict";
      const uri = await Animefy(base64, url, "version 2", user);
      setImageLoading(false);
      props.navigation.navigate("Preview", { image: uri });
    }
  }

  if (imageLoading)
    return (
      <View style={styles.mainContainer}>
        <PlaceholderView uri={image} />
        <Loader loading={true} />
      </View>
    );
  return (
    <View style={styles.mainContainer} {...panResponder.panHandlers}>
      {isFocused && (
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <IconTray
            type="camera"
            capture={capture}
            chooseImage={chooseImage}
            toggleCameraType={toggleCameraType}
          />
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 400,
    height: 400,
  },
  container3: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  button2: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  imageContainer: {
    width: 300,
    height: 300,
  },
});
