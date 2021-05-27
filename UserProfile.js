
import React, { useState } from 'react';
import { StyleSheet, View, Modal, Alert} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

import Settings from './Settings'



const UserProfile = () =>
{
    const [modalVisible, setModalVisible] = useState(false);

    const list = [1,2,3,4,5];

    const numbers = list.map((value)=>{

        let key = value;
        return(

            <Button key = {value}>
                <Text>{value}</Text>
            </Button>
        )

       
    }

    )

    return(

        <Container>
        <Header>
            <Left/>
            <Body>
                <Title>Profile</Title>
            </Body>
          
            <Right>
                <Button transparent onPress={()=> {setModalVisible(!modalVisible)}}>
                <Icon name='menu' />
            </Button>
            </Right>
        </Header>

        <Content>
            <Text>{numbers}</Text>
        </Content>






        <Modal animationType="slide" visible={modalVisible}>
            <Container>
                 <Header>
                    <Left/>
                    <Body>
                    <Title>Settings</Title>
                    </Body>
          
                     <Right>
                    <Button transparent onPress={()=> {setModalVisible(!modalVisible)}}>
                     <Icon name='arrow-back-outline' />
                    </Button>
                    </Right>
                </Header>
                <Content>
                    <Settings/>
                </Content>

            </Container>

         </Modal>
      </Container>
       

        
    );
}







export default UserProfile;