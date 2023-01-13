import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import app from "../configs/firebaseConfig";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { StackActions } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Loader from "../components/Loader";
const smallLogo = require("../../assets/Small-Logo.png");
const LoginScreen = (props) => {
  const [fontsLoaded] = useFonts({
    Rockybilly: require("../../assets/fonts/Rockybilly.ttf"),
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        props.navigation.reset({
          index: 0,
          routes: [{ name: "HomeDrawer" }],
        });
        props.navigation.dispatch(StackActions.replace("HomeDrawer"));
      }
    });
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    if (email === "") {
      setEmptyEmail(true);
    }
    if (password === "") {
      setEmptyPassword(true);
    }
    if (email !== "" && password !== "") {
      setEmptyEmail(false);
      setEmptyPassword(false);
      try {
        const auth = getAuth(app);
        setIsLoading(true);
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        props.navigation.reset({
          index: 0,
          routes: [{ name: "HomeDrawer" }],
        });
        props.navigation.dispatch(StackActions.replace("HomeDrawer"));
      } catch (error) {
        console.log(error);
        setEmptyEmail(true);
        setEmptyPassword(true);
      }
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image source={smallLogo} style={styles.logo} />

      <View style={styles.inputContainer}>
        <Text
          style={[styles.title, fontsLoaded && { fontFamily: "Rockybilly" }]}
        >
          Animefy
        </Text>
        
        <TextInput
          style={[styles.input, emptyEmail && styles.inputError]}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={[styles.input, emptyPassword && styles.inputError]}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
        {(emptyEmail || emptyPassword) && (
          <Text style={styles.errorText}>Invalid login</Text>
        )}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Don't have an account?{" "}
          <Text
            style={styles.signupButton}
            onPress={() => props.navigation.navigate("SignUp")}
          >
            Sign up
          </Text>
        </Text>
      </View>
      {isLoading && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3da794",
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    // fontWeight: 'bold',
    color: "#3da794",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  inputError: {
    borderColor: "red",
  },
  button: {
    backgroundColor: "#fe9355",
    padding: 16,
    borderRadius: 4,
    marginTop: 20,
    width: "80%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginTop: 8,
  },
  signupText: {
    marginTop: 10,
  },
  signupButton: {
    color: "#fe9355",
  },
  inputContainer: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "96%",
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 8,
  },
});

export default LoginScreen;
