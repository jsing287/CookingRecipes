import React, { useState } from 'react';
import { StyleSheet, View, Modal, Alert} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer, Form, Item, Label, Input } from 'native-base';

import { useNavigation } from '@react-navigation/native';


import AsyncStorage from '@react-native-async-storage/async-storage';



const saveData = async (recipe) => {

    console.log(recipe);
    try {
      await AsyncStorage.setItem(recipe.name, JSON.stringify(recipe))
      alert('Data successfully saved')
    } catch (e) {
      alert('Failed to save the data to the storage')
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
    

    

const Recipes = ()=>
{
    const navigation = useNavigation();

    let recipeInput  = {name:"", ingredients: "", instructions: "", minutes:"" }
    let recipeData="";
   
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
                    <Item floatingLabel>
                        <Label>Recipe Name</Label>
                        <Input onChangeText={(text)=>{recipeInput.name=text}} />
                    </Item>
                    <Item floatingLabel>
                        <Label>Ingredients</Label>
                        <Input onChangeText={(text)=>{recipeInput.ingredients=text}}/>
                    </Item>
                    <Item floatingLabel>
                        <Label>Instructions</Label>
                        <Input onChangeText={(text)=>{recipeInput.instructions=text}}/>
                    </Item>
                    <Item floatingLabel>
                        <Label>Minutes to Cook</Label>
                        <Input onChangeText={(text)=>{recipeInput.minutes=text}}/>
                    </Item>
                </Form>

                <Icon name="enter" onPress={()=>{saveData(recipeInput)}} style={{marginLeft: 10}}/>
                <Icon name="exit" onPress={()=>{let a = readData("Test1"); a.then((data)=>{console.log(data.name)})}} style={{marginLeft: 10}}/>
                <Icon name="nuclear" onPress={()=>{clearAll()}} style={{marginLeft: 10}}/>
                

               


                
            </Content>


            
               

                
        </Container>

    )


   
}


export default Recipes;