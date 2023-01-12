import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import {do}from 'react-native-fs';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import Gallery from './src/screens/ImageGallery';
import PreviewScreen from './src/screens/PreviewScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import StackNavigator from './src/navigators/StackNavigator';
// const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerStyle: {backgroundColor: '#2a7466'}, headerTitleStyle:{color: 'white'},headerTintColor: 'white'}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{unmountOnBlur: true}}/>
        <Stack.Screen name="ImageGallery" component={Gallery} />
        <Stack.Screen name="Preview" component={PreviewScreen} />
      </Stack.Navigator> */}
      <StackNavigator/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
