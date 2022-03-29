import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { StyleSheet, Text, View, Pressable } from 'react-native';
//Navegation and Stack
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

//Page navigation
import Home from './pages/Home'
import ContractDetail from './pages/ContractDetail'



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRoute='Inicio'>
        <Stack.Screen name="Lista Contrato" component={Home} />
        <Stack.Screen name="Detalle Contrato" component={ContractDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


