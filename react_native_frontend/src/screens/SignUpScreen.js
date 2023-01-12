import React, { useState,useEffect } from "react";
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
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged
} from "firebase/auth";
import { StackActions } from "@react-navigation/native";
import { useFonts } from "expo-font";
const smallLogo = require("../../assets/Small-Logo.png");
import { addUser } from "../helpers/AuthFunctions";
const SignUpScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Rockybilly: require("../../assets/fonts/Rockybilly.ttf"),
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [emptyFirstName, setEmptyFirstName] = useState(false);
  const [emptyLastName, setEmptyLastName] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        addUser(user);
        navigation.reset({
          index: 0,
          routes: [{ name: "HomeDrawer" }],
        });
        navigation.dispatch(StackActions.replace("HomeDrawer"));
      }
    });
  }, []);
  const handleSignUp = async () => {
    //check if fields are empty
    if (email === "") {
      setEmptyEmail(true);
    }
    if (password === "") {
      setEmptyPassword(true);
    }
    if (firstName === "") {
      setEmptyFirstName(true);
    }
    if (lastName === "") {
      setEmptyLastName(true);
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeDrawer" }],
      });
      navigation.dispatch(StackActions.replace("HomeDrawer"));
    } catch (error) {
      setError("Please enter a valid email and password");
    }
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
          style={[styles.input, emptyFirstName && styles.inputError]}
          placeholder="First name"
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
        />
        <TextInput
          style={[styles.input, emptyLastName && styles.inputError]}
          placeholder="Last name"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
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

        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </Text>
      </View>
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
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
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
  title: {
    fontSize: 20,
    marginBottom: 16,
    // fontWeight: 'bold',
    color: "#3da794",
  },
  loginText: {
    marginTop: 10,
  },
  loginButton: {
    color: "#fe9355",
  },
  inputError: {
    borderColor: "red",
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
  logo: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
});

export default SignUpScreen;
