import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';



import UserProfile from './UserProfile'
import Recipes from './Recipes.js'

import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';


import { Button, Icon } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';



function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Profile Information" onPress={() => alert('Link to profile info')} icon={()=>(<Icon name="person-circle-outline"></Icon>)} />
      <DrawerItem label="Privacy Info" onPress={() => alert('Link to Privacy')}  icon={()=>(<Icon name="lock-closed-outline"></Icon>)}/>
      <DrawerItem label="Settings" onPress={() => alert('Link to Settings')} icon={()=>(<Icon name="settings-outline"></Icon>)} />
      <DrawerItem label="About" onPress={() => alert('Link to about')} icon={()=>(<Icon name="information-circle-outline" ></Icon>)}  />
      <DrawerItem label="Help and Support" onPress={() => alert('Link to help and support')} icon={()=>(<Icon name="help-circle-outline"></Icon>)} />
      
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


function Profile()
{
  return(
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false  }}>
        <Stack.Screen
          name="Home"
          component={UserProfile} />
         <Stack.Screen  name="Recipes" component={Recipes}/>
     
      </Stack.Navigator>

  )

}


function MyDrawer() {
  return (
    <Drawer.Navigator drawerPosition="right" drawerStyle={styles.drawer} initialRouteName="Profile" drawerContent={props => <CustomDrawerContent {...props}/>}>
      <Drawer.Screen name="Profile" component={Profile} options={{drawerIcon: ()=>(<Icon name="home" />)}}/>
      
    
      
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
      marginVertical:50, borderRadius: 30, height:600, 

    }
  }
)
