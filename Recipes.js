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

  const readData = async (name) => {
    try {
      const recipe = await AsyncStorage.getItem(name)
      return JSON.parse(recipe);
      
  
      }
     catch (e) {
      alert('Failed to fetch the data from storage')
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
    let recipeInput  = {name:"", ingredients: "", instructions: "", minutes:"" }





    if(route.params!=undefined)
    {

    const {item} = route.params;
        
        recipeInput.name = JSON.parse(item[1]).name;
        recipeInput.ingredients = JSON.parse(item[1]).ingredients;
        recipeInput.instructions= JSON.parse(item[1]).instructions;
        recipeInput.minutes = JSON.parse(item[1]).minutes;


    }
    else{
        console.log("starting fresh");
        console.log(recipeInput);
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
                </Form>

                <Icon name="enter" onPress={()=>{saveData(recipeInput,route)}} style={{marginLeft: 10}}/>
             
                <Icon name="nuclear" onPress={()=>{clearAll()}} style={{marginLeft: 10}}/>
                

               


                
            </Content>


            
               

                
        </Container>

    )


   
}


export default Recipes;