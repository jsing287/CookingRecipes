
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Modal, Alert, ActionSheetIOS} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem, Thumbnail, List, ListItem, Label, Accordion } from 'native-base';


import { useNavigation } from '@react-navigation/native';



import {useIsFocused} from '@react-navigation/native'

import ProfilePic from './ProfilePic.png'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { render } from 'react-dom';
import { ForceTouchGestureHandler, ScrollView } from 'react-native-gesture-handler';
import { HeaderStyleInterpolators } from '@react-navigation/stack';

import { LinearGradient } from 'expo-linear-gradient';





const UserProfile = () =>
{
    const navigation = useNavigation();

    
    
    let cookingCoin = 6;

    const [recipes, setRecipes] = useState([]);
    const [favourites, setFav] = useState([]);
    const [load, setLoad] = useState(true);
   
    
    const isFocused = useIsFocused()


    const deleteItem = async (name) => {
        try {

            await AsyncStorage.removeItem(name);
            setLoad(!load);

          }
         catch (e) {
          alert('Failed to delete item')
        }
      }


      const ActionButton = (recipeName)=>
      {
        ActionSheetIOS.showActionSheetWithOptions(
            {
              options: ["Cancel", "Delete"],
              destructiveButtonIndex: 1,
              cancelButtonIndex: 0,
              userInterfaceStyle: 'dark',
              title: "Remove Recipe"
            },
            buttonIndex => {
              if (buttonIndex === 1) {
                  deleteItem(recipeName);

              
            }
        }
          );
      }

      // reloading database  when item is deleted or 
    useEffect(() => {
        async function fetchRecipes()
            {
                const data = await AsyncStorage.getAllKeys();
                const rec = await AsyncStorage.multiGet(data);
                setRecipes(rec);
                console.log("ran");
                

            }

            fetchRecipes();
    } , [isFocused,load])


    

    // loads recipe array on initial screen render
    useEffect(
        ()=>
        {
            async function fetchRecipes()
            {
                const data = await AsyncStorage.getAllKeys();
                const rec = await AsyncStorage.multiGet(data);
                setRecipes(rec);
                

            }

            fetchRecipes();
               
        },[]


    )

    // sets favourites on returning to screen and when an action is done to items
    useEffect(
        ()=>
        {
            async function fetchRecipes()
            {
                try{
                    const data = await AsyncStorage.getAllKeys();
                    const records = await AsyncStorage.multiGet(data);
                    SettingFavourites(records);
                    
                    
                   
                    
                }catch{
                    console.log("error");
                }
              
                

            }

            fetchRecipes();
               
        },[load, isFocused]


    )

    function SettingFavourites(records)
    {
        
        let tempArray = [];

        for(let i = 0;i<records.length;i++)
        {
            if(JSON.parse(records[i][1]).iconName=="heart")
            {
                tempArray.push(records[i]);
               

            }
            else{
                continue;
            }
        }

        console.log(tempArray)


        if(tempArray.length==0)
        {
            let object = {name: "You Have No Favourites"};
            let change = JSON.stringify(object);
            let array = [["",change]];
            setFav(array)
        }
        else{

            setFav(tempArray);
        }

        
           

        
       


        
       
       

    }


    // toggling function for favourites 
    const toggleFavourite = async (item) =>
    {

        let tempData = JSON.parse(item);
       
        tempData.favourite = !tempData.favourite;

        if(tempData.favourite == false)
        {
            tempData.iconName = "heart-outline"
        }
        else{
            tempData.iconName = "heart"
        }


        try{
            let name = JSON.parse(item).name;
            await AsyncStorage.setItem(name, JSON.stringify(tempData))
            setLoad(!load);
            
        }
        catch (e){ 
            console.log(e)
           
        }

        
       

    }

  
   
   



    return(

        
       
          
        <Container >


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
        
     
         
      
    


        

        <LinearGradient
        colors={['rgba(0,7,255,1)', 'transparent']}
        start={[1.0, 0.0]}
        end={[0.0, 1.0]}
        style={{ flex: 1 }}
      > 
       
        <Content>

            <Card style={{width:350, borderRadius:10, borderColor:"black", alignSelf:"center"}}>

                <CardItem header style={{borderRadius:10}} button onPress={()=>{alert("hello")}}>
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

                <CardItem footer style={{borderRadius:10}} >
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
                <Icon type="Entypo" name='circle-with-plus' style={{fontSize:50, color:"white"}}/>
            </Button>
            </Content>

            <View style={styles.container}>
    
     
    </View>

            

           
            <View style={{alignItems:"center"}} >


               

                

                <Text style={{fontWeight:"bold"}}>Favourites</Text>

                <ScrollView horizontal={true}>
                    {
                        
                    
                    favourites.map((item)=>
                    {
                    

                            return(
                                <Card key = {item[0]} style={{borderRadius:5, borderColor:"black"}}>
                                    <CardItem header bordered style={{borderRadius:5, borderColor:"black"}}>
                                        <Text>{JSON.parse(item[1]).name}</Text>
                                    </CardItem>
                                </Card>
    
                            )

                        
                        

                       

                    })}
                </ScrollView>
               




                {recipes.map((item)=>{
                    return (
                    // <Text key={item[0]}>{JSON.parse(item[1]).name}</Text>
                    <Card key={item[0]} style={{marginTop: 10, borderColor:"red", width:400, borderRadius:10}} >
                        <CardItem header bordered style={{borderRadius:10}}>
                            <Text>Recipe: {JSON.parse(item[1]).name}</Text>
                            <Body>

                            </Body>
                            <Right>
                                <Button bordered danger onPress={()=>{toggleFavourite(item[1])}} >
                                <Icon active name={JSON.parse(item[1]).iconName} style={{color: "red", }}  />

                                </Button>
                            
                            </Right>
                        </CardItem>
                        <CardItem bordered >
                           
                            <Body>
                                <Text>Ingredients: {JSON.parse(item[1]).ingredients}</Text>
                            </Body>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>Instructions: {JSON.parse(item[1]).instructions}</Text>
                            </Body>
                        </CardItem>
                        <CardItem bordered>
                            <Body style={{alignItems:"row"}}>
                                <Icon name="logo-usd"/>
                                <Text>Cooking Coins: {JSON.parse(item[1]).price}</Text>
                            </Body>
                        </CardItem>
                        <CardItem footer bordered style={{borderRadius:10}}>
                            <Left>
                            <Text>Minutes: {JSON.parse(item[1]).minutes}</Text>
                            </Left>
                            
                            <Body>
                            <Button warning onPress={()=>{navigation.navigate("Recipes", {item})}}><Text>EDIT</Text></Button>
                            </Body>
                            <Right>
                            <Button danger onPress={()=>{ActionButton(JSON.parse(item[1]).name)}}><Text>DELETE</Text></Button>
                            </Right>
                            
                        </CardItem>
                    </Card>
                    
                    )
                    
                    
                    })}
                
                </View>
            
        
            
       
             
            
        </Content>
        </LinearGradient>

        
       
        

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
            marginTop:20,
            color:"lightgreen",
            

        },
        recipeHeader:
        {
            flexDirection:"row"

        }

    }
)




export default UserProfile;