import React, { useState } from 'react';
import { StyleSheet, View, Modal, Alert} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer, Form, Item, Label, Input } from 'native-base';

import { useNavigation } from '@react-navigation/native';


import AsyncStorage from '@react-native-async-storage/async-storage';



const saveData = async (recipe, route) => {

    if(route.params!=undefined)
    {
        const {item} = route.params
        if(recipe.name!=JSON.parse(item[1]).name)
        {
            console.log(" different")
            await AsyncStorage.removeItem(JSON.parse(item[1]).name);
            try {
                await AsyncStorage.setItem(recipe.name, JSON.stringify(recipe))
                alert('Data successfully saved')
              } catch (e) {
                alert('Failed to save the data to the storage')
              }
        }
        else{

            console.log("same");
            try {
                await AsyncStorage.setItem(recipe.name, JSON.stringify(recipe))
                alert('Data successfully saved')
              } catch (e) {
                alert('Failed to save the data to the storage')
              }
        }

    }
    else{
        console.log(" saving data starting fresh")
        try {
            await AsyncStorage.setItem(recipe.name, JSON.stringify(recipe))
            alert('Data successfully saved')
          } catch (e) {
            alert('Failed to save the data to the storage')
          }
    }

    
   
  }



  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
    console.log('Done.')
  }
    

  

    

const Recipes = ({route})=>
{
    const navigation = useNavigation();
    let recipeInput  = {name:"", ingredients: "", instructions: "", minutes:"", price:"", favourite: false, iconName:"heart-outline" }





    if(route.params!=undefined)
    {

    const {item} = route.params;
        
        recipeInput.name = JSON.parse(item[1]).name;
        recipeInput.ingredients = JSON.parse(item[1]).ingredients;
        recipeInput.instructions= JSON.parse(item[1]).instructions;
        recipeInput.minutes = JSON.parse(item[1]).minutes;
        recipeInput.price= JSON.parse(item[1]).price;
        recipeInput.favourite = JSON.parse(item[1]).favourite;
        recipeInput.iconName = JSON.parse(item[1]).iconName;


    }
    else{
        console.log("starting fresh");
        
    }
    
    
    
    
   
    return(

        <Container>
            <Header>
                <Left>
                    <Icon name="arrow-back-circle" onPress={()=>{navigation.navigate("Home")}} style={{marginLeft: 10}}/>
                </Left>
                <Body>
                    <Title>Recipe Maker</Title>
                </Body>
                <Right/>
            </Header>

            <Content>
                <Form>
                    <Item stackedLabel>
                        <Label>Recipe Name</Label>
                        <Input placeholder={recipeInput.name} onChangeText={(text)=>{recipeInput.name=text}} />
                    </Item>
                    <Item stackedLabel>
                        <Label>Ingredients</Label>
                        <Input placeholder={recipeInput.ingredients} onChangeText={(text)=>{recipeInput.ingredients=text}}/>
                    </Item>
                    <Item stackedLabel>
                        <Label>Instructions</Label>
                        <Input placeholder={recipeInput.instructions} onChangeText={(text)=>{recipeInput.instructions=text}}/>
                    </Item>
                    <Item stackedLabel>
                        <Label>Minutes to Cook</Label>
                        <Input placeholder={recipeInput.minutes} onChangeText={(text)=>{recipeInput.minutes=text}}/>
                    </Item>
                    <Item stackedLabel>
                        <Label>Price</Label>
                        <Input placeholder={recipeInput.price} onChangeText={(text)=>{recipeInput.price=text}}/>
                    </Item>
                </Form>

                <Button style={{marginTop: 10}} onPress={()=>{saveData(recipeInput,route)}}>
                    <Text>SAVE</Text>
                <Icon name="enter"  />

                </Button>

                <Button danger style={{marginTop: 10}} onPress={()=>{clearAll()}}>

                    <Text>DELETE ALL</Text>

                <Icon name="nuclear"  />

                </Button>


                
             
                
                

               


                
            </Content>


            
               

                
        </Container>

    )


   
}


export default Recipes;