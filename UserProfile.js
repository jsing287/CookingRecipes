
import React, { useState } from 'react';
import { StyleSheet, View, Modal, Alert} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem, Thumbnail, List, ListItem } from 'native-base';


import { useNavigation } from '@react-navigation/native';



import {DrawerItems} from '@react-navigation/native'

import ProfilePic from './ProfilePic.png'

import AsyncStorage from '@react-native-async-storage/async-storage';





const UserProfile = () =>
{
    const navigation = useNavigation();

    
    let cookingCoin = 6;

    const importData = async () => {

        let object=[];
        try {
          const keys = await AsyncStorage.getAllKeys();
          const result = await AsyncStorage.multiGet(keys);

          for(let i = 0; i<result.length;i++)
          {
              object.push(JSON.parse(result[i][1]))

          }
          
        
         
      
          return object;
        } catch (error) {
          console.error(error)
        }
      }

      let test = [{name: "hello", ingredients: "hey"}, {name:"goodbye", ingredients:"asa"}];

      function RecipeCards()
      {
        return test.map((item)=> 
        {
          return(
              <Card style={{marginVertical:5}} >
              <CardItem header>
                  <Text>{item.name}</Text>
              </CardItem>
              <CardItem>
                  <Body>
                      <Text>{item.ingredients}</Text>
                  </Body>
              </CardItem>
              <CardItem footer button onPress={()=>{navigation.navigate("Recipes")}}>
                  <Text>Hello</Text>
              </CardItem>
          </Card>
  
          )
  
        } )

      } 
    
     
      
       

   

    




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

            <Card button onPress={()=>{alert("hey")}}>

                <CardItem header >
                    <Left>
                        <Thumbnail source={ProfilePic} />
                        <Body>
                        <Text>Anthony Jones</Text>
                        <Text note>Workout Meals Are My Thing!</Text>
                        </Body>
                     </Left>
                </CardItem>

                <CardItem>
                    <Body>
                        <Text>Hey! I'm Anothony, I'm a certified Physiotherapist and I provide healthy workout meals for you!</Text>
                    </Body>
                </CardItem>

                <CardItem footer>
                    <Left>
                    <Icon active name="thumbs-up" style={{color: "blue"}} />
                        <Text>1453 Likes</Text>
                    </Left>
                    
                    
                    <Right style={{alignContents:"row-reverse"}}>
                    <Text>{cookingCoin} Cooking Coins</Text>
                    <Icon active name="logo-usd" style={{color: "green"}} />
                        

                    </Right>

                </CardItem>
            </Card>

            <Content contentContainerStyle={{flexDirection:"row", justifyContent:"space-between",}}>
                <Text style={styles.recipeHeaderText}>Recipes</Text>
                <Button transparent onPress={()=>{navigation.navigate("Recipes");}} style={{height:75}}>
                <Icon name='add-circle' style={{fontSize:50}}/>
            </Button>
            </Content>

            <Icon name='add-circle' style={{fontSize:50}} onPress={()=>{importData().then((data)=>{console.log(data[0].minutes)}).catch((e)=>{console.log(e)})}}/>

            <View>{RecipeCards()}</View>


          
           

            
       
             
            
        </Content>

        
       
        

      </Container>
       

        
    );
}



const styles = StyleSheet.create(
    {
        recipeHeaderText:
        {
            fontWeight:"bold",
            fontSize:35,
            marginLeft: 5,
            marginTop:5,
            color:"red"

        },
        recipeHeader:
        {
            flexDirection:"row"

        }

    }
)




export default UserProfile;