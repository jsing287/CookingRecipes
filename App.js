import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import UserProfile from './UserProfile'

import Settings from './Settings'
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Button, Icon } from 'native-base';







function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Article() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Help" onPress={() => alert('Link to help')} icon={()=>(<Icon name="home"></Icon>)} />
      <DrawerItem label="Hello" onPress={() => alert('Link to help')} icon={()=>(<Icon name="rightcircle"></Icon>)} />
      <DrawerItem label="Privacy Info" onPress={() => alert('Link to help')} />
      <DrawerItem label="Settings" onPress={() => alert('Link to help')} />
      <DrawerItem label="About" onPress={() => alert('Link to help')} />
      <DrawerItem label="Help and Support" onPress={() => alert('Link to help')} />
      
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator drawerPosition="right" drawerStyle={styles.drawer} initialRouteName="Profile" drawerContent={props => <CustomDrawerContent {...props}/>}>
      <Drawer.Screen name="Profile" component={UserProfile} options={{drawerIcon: ()=>(<Icon name="ios-home"/>)}}/>
      <Drawer.Screen name="CookingCoin" component={UserProfile} options={{drawerIcon: ()=>(<Icon name="logo-usd"/>)}}/>
    
      
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}


const styles = StyleSheet.create(
  {
    drawer:
    {
      marginVertical:50, borderRadius: 30, height:600

    }
  }
)
