import React, {useState, useEffect, useMemo, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';



import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';


//Ecrans du drawer Navigation
import DashBoardScreen from '../screens/DashBoardScreen';

import FormulesScreen from '../screens/drawerscreens/FormulesScreen';
import ProfileScreen from '../screens/drawerscreens/ProfileScreen';
import SubscribeScreen from '../screens/drawerscreens/SubscribeScreen';
import SearchScreen from '../screens/drawerscreens/SearchScreen';
import MesFormulesScreen from '../screens/drawerscreens/MesFormulesScreen';
import PaymentScreen from '../screens/drawerscreens/PaymentScreen';
import ValidationScreen from '../screens/drawerscreens/ValidationScreen';


//import { AuthContext } from '../components/context';

import { AuthContext } from '../context/AuthContext';



import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const Stack = createNativeStackNavigator();
const Navigation = () => {

    //const [isLoading, setIsLoading] = useState(false);
    //const [userToken, setUserToken] = useState(null);
    //const  {userToken} = useContext(AuthContext);

    //const [isLoading, userToken] = useContext(AuthContext);
    if(isLoading){

        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size={'large'} color='#649c15' />
            </View>
        )
        
    }


    const [isLoading, setIsLoading] = useState(false);
    //const [userToken, setUserToken] = useState(null);

    const [userInfo, setUserInfo] = useState(null);



    const login = (email, psswd)  => {
        setIsLoading(true);

        if(email==''){
            alert('Veuillez entrer votre adresse email s\'il vous plait!!!!');
        }else if(psswd==''){
            alert('Veuillez entrer votre mot de passe s\'il vous plait!!!!')
        }else{                
                
                
            axios
                .post(
                    'http://ftp.epheynix.com/api/login.php', {
                        email, 
                        psswd,
                })
                .then((response) => {

                    
                    let userInfo = response.data;
                    //console.log(userInfo);
                    if(userInfo == "Inexistant"){
                        //console.log(userToken);
                        alert("Email ou Mot de passe incorrect. Veuillez vérifier les paramètres de votre compte s\'il vous plait.");
                    }else{
                        //alert('Succes de la connexion !!!!');
                        //alert(userInfo);
                        
                        //console.log(userInfo);
                        setUserInfo(userInfo);
                        //setUserToken(userInfo.data.token);

                        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                        //AsyncStorage.setItem('userToken', userInfo.data.token);

                        //console.log(userInfo);
                        //console.log('User Token' + userInfo.data.token);

                    }                       
                    
                }).catch((err) => {
                    console.log(err);
                });

                setIsLoading(false);
                
        }

        // setUserToken('ajdsjk');
        // AsyncStorage.setItem('userToken', userToken);
        //setIsLoading(false);
    }

    const logout = ()  => {
        setIsLoading(true);
        //setUserToken(null);
        AsyncStorage.removeItem('userInfo');
        //AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    }

    const isLoggedIn = async()  => {
        try {
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            //let userToken = await AsyncStorage.getItem('userToken');
            userInfo = JSON.parse(userInfo);

            if( userInfo ){
                //setUserToken(userToken);
                setUserInfo(userInfo);
            }
            
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        isLoggedIn();
    }, []);
   


    return (

        <AuthContext.Provider value={{login, logout, isLoading, userInfo}}>
            <NavigationContainer>

                <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
            
                    
                    {userInfo == null ? (
                        <>
                            <Stack.Screen name="Home" component={HomeScreen} />
                            <Stack.Screen name="Register" component={RegisterScreen} />
                            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                            <Stack.Screen name="Login" component={LoginScreen} />
                        </>
                    
                    ):(
                        <>
                            <Stack.Screen name="DashBoard" component={DashBoardScreen} />
                            <Stack.Screen name="Profile" component={ProfileScreen} />
                            <Stack.Screen name="Formules" component={FormulesScreen} />
                            <Stack.Screen name="Subscribe" component={SubscribeScreen} />
                            <Stack.Screen name="Search" component={SearchScreen} />
                            <Stack.Screen name="MesFormules" component={MesFormulesScreen} />
                            <Stack.Screen name="Validation" component={ValidationScreen} />
                            <Stack.Screen name="Guichet CinetPay" component={PaymentScreen} />
                        
                        </>
                    )}

                </Stack.Navigator>
                
            </NavigationContainer>
        </AuthContext.Provider>
        
        
        

    );
};
export default Navigation;