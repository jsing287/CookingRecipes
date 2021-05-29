
import React, { useState } from 'react';
import { StyleSheet, View, Modal, Alert} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';


import { useNavigation } from '@react-navigation/native';

import SideBar from './SideBar'

import {DrawerItems} from '@react-navigation/native'



const UserProfile = () =>
{
    const navigation = useNavigation();

    return(

        <Container>
        <Header>
            <Left/>
            <Body>
                <Title>Profile</Title>
            </Body>
          
            <Right>
                <Button transparent onPress={()=>{navigation.openDrawer();}}>
                <Icon name='menu'/>
            </Button>
            </Right>
        </Header>

        <Content>

       
             
            
        </Content>

      </Container>
       

        
    );
}







export default UserProfile;