import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import React from "react";
//import right arrow with circle icon
import { Ionicons } from "@expo/vector-icons";
const logo = require("../../assets/animefy_logo.png");

const WelcomeScreen = (props) => {
    const [fontsLoaded] = useFonts({
        'Rockybilly' : require('../../assets/fonts/Rockybilly.ttf')
    });
    // console.log(fontsLoaded);
  return (
    <View style={styles.container}>
      <Text style={[fontsLoaded && {fontFamily: 'Rockybilly'}, styles.titleStyle]}>Animefy</Text>
      <Image source={logo} style={styles.backgroundImage} />
      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity style={styles.buttonStyle} onPress={() => props.navigation.navigate("Login")}> */}
            {/* <Text style={[styles.btnText,{fontSize: 20}]}>Login</Text> */}
            {/* //white background circle with right arrow icon */}
            <Ionicons name="caret-forward" size={50} color="#3da794" 
            style={{ borderRadius: 50, padding: 10, alignSelf: 'flex-end'}} onPress={() => props.navigation.navigate("Login")}/>
        {/* </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.buttonStyle} onPress={() => props.navigation.navigate("SignUp")}>
            <Text style={[styles.btnText,{fontSize: 20}]}>Sign Up</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  titleStyle: {
    fontSize: 50,
    zIndex: 1,
    color: "white",
    marginTop: 70,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  buttonContainer:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  buttonStyle:{
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'white',
    // borderRadius: 10,
    // width: 30,
  },
  btnText:{
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
    // fontFamily: 'Montserrat',
  }
});

export default WelcomeScreen;
