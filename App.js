import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import LogInScreen from './Screens/LogInScreen';
import TransactionScreen from './Screens/TransactionScreen';
import ProfileScreen from './Screens/ProfileScreen';
import SignUpScreen from './Screens/SignUpScreen';
import LoanCalculator from './Screens/LoanCalculator';
import FintechOperations from './Screens/FintechOperations';

const Stack = createNativeStackNavigator();

export default function App() {  // ✅ Correct export
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUpScreen">
        <Stack.Screen name="LogInScreen" component={LogInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Transactions" component={TransactionScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="LoanCalculator" component={LoanCalculator} />
        <Stack.Screen name="FintechOperations" component={FintechOperations} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


