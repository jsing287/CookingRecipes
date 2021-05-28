import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import UserProfile from './UserProfile'

import Settings from './Settings'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Button, Icon } from 'native-base';
import {Ionicons} from 'react-native-vector-icons';




const Drawer = createDrawerNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Profile" drawerPosition="right" drawerStyle={{marginVertical:50, borderRadius: 30}}>
      <Drawer.Screen name="Home" component={UserProfile} options={{drawerIcon: ()=>(<Icon name="ios-home"/>)}}/>
      <Drawer.Screen name="Settings" component={Settings} />
      
    </Drawer.Navigator>
  </NavigationContainer>
    
  );
}



