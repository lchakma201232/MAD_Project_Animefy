import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen, LoginScreen, SignUpScreen, Gallery, PreviewScreen , HomeScreen} from '../screens';
import DrawerNavigator from './DrawerNavigator';
const Stack = createStackNavigator();
export default function StackNavigator(props) {
  return (
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerStyle: {backgroundColor: '#2a7466'}, headerTitleStyle:{color: 'white'},headerTintColor: 'white'}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{title:'Sign Up',  headerStyle: {backgroundColor: '#2a7466'}, headerTitleStyle:{color: 'white'},headerTintColor: 'white'}}/>
        {/* <Stack.Screen name="Home" component={HomeScreen} options={{unmountOnBlur: true}}/> */}
        <Stack.Screen name="ImageGallery" component={Gallery} options={{headerShown: false}}/>
        <Stack.Screen name="Preview" component={PreviewScreen} />
        <Stack.Screen name="HomeDrawer" component={DrawerNavigator} options={{headerShown: false, title:'Animefy'}}/>
      </Stack.Navigator>
  );
}