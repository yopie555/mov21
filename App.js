import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Homepage from './src/screens/Homepage';
import Details from './src/screens/Details';
import SplashScreen from './src/screens/SplashScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import Account from './src/screens/Account';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RootHome = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
      name="Homepage" 
      component={Homepage} 
      />
      <Tab.Screen 
      name="Account" 
      component={Account}
       />
    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomepageScreen" component={RootHome} />
        <Stack.Screen name="Details" component={Details} />
        {/* <Stack.Screen name="Search" component={Search} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App