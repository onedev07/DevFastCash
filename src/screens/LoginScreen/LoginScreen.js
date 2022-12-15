import React, {useState, useEffect, useContext} from 'react';
import {View, Text, TextInput, Image, StyleSheet, ScrollView, useWindowDimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import Logo from '../../../assets/images/Logo.png';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useNavigation} from '@react-navigation/native';

//import { AuthContext } from '../../components/context';
import { AuthContext } from '../../context/AuthContext';

//Client HTTP axios
//import axios from 'axios';


const LoginScreen = () => {       

    const [email, setEmail] = useState('');
    const [psswd, setPsswd] = useState('');    

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);

    
    //const [isSubmit, setIsSubmit] = useState(false); 


    const {login} = useContext(AuthContext);

    const {userInfo} = useContext(AuthContext);



    

    //Navigation
    const GoToForgotPassword = () => {
        //console.warn("forgotPassword");
        navigation.navigate("ForgotPassword");
    };

    const GoToRegister = () => {
        //console.warn("Register");
        navigation.navigate("Register");
    };

    const GoToHome = () => {
        //console.warn("Home");
        navigation.navigate("Home");
    };

    

    //Paramètres du login
    // const loginHandle = (email, psswd) => {
    //     //console.log(email, psswd);
    //     login(email, psswd);
    // }




    return (
        
        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={styles.root}>
            
                
                <Image
                    source={Logo}
                    style={[styles.logo , {height: height * 0.3}]}
                    resizeMode="contain"
                />
                <View>
                    <Text style={styles.titleprincipal} >CONNEXION</Text>
                </View>


                {/* FORMULAIRE */}
                <View style={{
                    alignItems: 'center',
                    width:'100%',
                    padding: 20,
                    backgroundColor: '#FFFFFF',                    
                    padding:5,
                    margin:5,
                    borderWidth:1,
                    borderColor:'#FFFFFF',
                    shadowRadius:3,
                    shadowOffset:{width:3, height:3},
                    shadowColor:'#000000',
                    elevation:5,
                }}>

                   

                    <TextInput
                        label= 'Email'
                        style={styles.input}
                        placeholder="Email"
                        value={email}                   
                        onChangeText={text => setEmail(text)}
                        keyboardType='email-address'
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Mot de Passe"
                        value={psswd}
                        secureTextEntry={true}
                        onChangeText ={text => setPsswd(text)}
                    />

                    {/* <TouchableOpacity onPress={()=>setIsSubmit(true)} style={[styles.button]} > */}
                    <TouchableOpacity onPress={()=>{login(email, psswd)}} style={[styles.button]} >
                        <View style={{
                            
                        }}>
                            {loading ? (
                                <ActivityIndicator size='large' color='white' visible={loading} />
                                
                            ) : (
                                <>
                                
                                <Text style={{
                                    color:'#FFFFFF',
                                    alignSelf:'center',
                                    fontSize:20,
                                    alignSelf:'center',
                                    margin:5
                                }} >Se connecter</Text>
                                </>
                            )}
                        </View>
                    </TouchableOpacity>

                        {/* Boutons annexes */}
                        <TouchableOpacity style={[styles.buttonsecondary]} >
                            <View>
                                <Text style={styles.titlesecondary} onPress={GoToForgotPassword} >Mot de passe oublié?</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.buttonsecondary]} >
                            <View>
                                <Text style={styles.titlesecondary} onPress={GoToRegister} >Vous n'avez pas de compte? Créer un compte</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.gohome]} >
                            <View>
                                <Text style={styles.titlegohome} onPress={GoToHome} >Retour à l'accueil</Text>
                            </View>
                    </TouchableOpacity>

                    
                    
                </View>
                
            
                

            </View>
        </ScrollView>        
    );
};

const styles = StyleSheet.create({
    root:{
        flex: 1,
        alignItems: 'center',
        //padding: 50,
        //margin: 50,
        padding: 20,
        backgroundColor: '#FFFFFF'
    },

    logo: {
        width: '100%',
        maxWidth: 500,
        maxHeight: 300,
        marginTop: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        margin: 10,
    },

    titlesecondary: {
        fontSize: 16,
        fontWeight: 'bold',
        color:'#000000', //'#0033FF',
        margin: 1,
    },
    
    titleprincipal: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFCC33',
        margin: 10,
        textDecorationLine:'underline',
    },
    button:{
        width: '60%',
        height:50,
        padding: 5,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor:"#649c15"
    },

    buttonsecondary:{
        width: '100%',
        //padding: 5,
        marginVertical: 10,
        alignItems: 'center',
    },

    gohome:{
        width: '100%',
        //padding: 5,
        marginVertical: 10,
        alignItems: 'center',
    },

    titlegohome:{
        color: '#336600',
        fontSize: 16,
        textDecorationLine:'underline',
    },

    input:{
        width: '100%',
        padding: 10,
        marginVertical: 10,
        marginBottom: 20,
        alignItems: 'center',
        //borderRadius: 50,
        //backgroundColor: //'#649c15'VERT,  //"#0033FF",//BLEU
        borderBottomColor: '#649c15',//VERT
        borderStyle:'solid',
        borderBottomWidth: 1,
    },
    
});


export default LoginScreen;