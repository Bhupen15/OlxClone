import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import splash from './screens/Splash';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import Home from './tabs/Home';
import ItemsByCategory from './screens/ItemsByCategory';


const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name='Splash' component={splash} options={{ headerShown: false }} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='ItemsByCategory' component={ItemsByCategory} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default AppNavigator