import { View, Text } from "react-native";
import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import {
  HomeScreen,
  LoginScreen,
  SignUpScreen,
  WelcomeScreen,
} from "../screens";
import app from "../configs/firebaseConfig";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
const Drawer = createDrawerNavigator();
import { addUser, checkCredit, updateCredit } from "../helpers/AuthFunctions";
function CustomDrawerContent(props) {
  // console.log(props)
  const [user, setUser] = React.useState({ displayName: "Loading..." });
  const [credit, setCredit] = React.useState(0);
  React.useEffect(() => {
    const auth = getAuth(app);
    //after every 5 second update the credit
    onAuthStateChanged(auth, (user) => {
      if (user) {
        checkCredit(user).then((credit) => {
          // console.log("User credit: " + credit);
          setUser({
            displayName: user.displayName + " - " + credit + " credits",
          });
        });
      }
    });
    // console.log('checking')
    const interval = setInterval(() => {
      setCredit(credit + 1);
    }, 5000);
    return () => clearInterval(interval);
    
  }, [credit]);

  return (
    <DrawerContentScrollView {...props}>
      <Text style={{ fontSize: 20, textAlign: "center" }}>
        {user.displayName}
      </Text>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          signOut(getAuth(app));
          props.navigation.navigate("Welcome");
        }}
      />
    </DrawerContentScrollView>
  );
}
const DrawerNavigator = (props) => {
  // console.log(props);
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      drawerContent={(pr) => <CustomDrawerContent {...pr} />}
    >
      <Drawer.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
