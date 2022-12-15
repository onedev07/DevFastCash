import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import Logo from '../../../assets/images/Logo.png';

import {useNavigation} from '@react-navigation/core';

const ForgotPasswordScreen = () => {

    const {height} = useWindowDimensions();
    const navigation = useNavigation();




    const [email, setEmail] = useState('');

    const SendPressed = () => {
        //console.warn("SendPressed");
        //navigation.navigate('NewPassword');
    };

    const GoToRegister = () => {
        //console.warn("Home");
        navigation.navigate("Register");
    };

    const GoToHome = () => {
        //console.warn("Home");
        navigation.navigate("Home");
    };
    

    
    return(
        

        <ScrollView showsVerticalScrollIndicator={false} >
    
            <View style={styles.root}>
                
                <Image
                    source={Logo}
                    style={[styles.logo , {height: height * 0.3}]}
                    resizeMode="contain"
                />
                
                <Text style={styles.titleprincipal} >REINITIALISER VOTRE MOT DE PASSE</Text>
            
                <TextInput
                    style={styles.input}
                    placeholder="Entre votre adresse Email"
                    //value={email}
                    //setValue={setEmail}                    
                    //onChangeText={email=>this.useState}
                />

                <TouchableOpacity style={[styles.button]} >
                    <View>
                        <Text style={styles.title}  >Envoyer</Text>
                    </View>
                </TouchableOpacity>

                {/* Boutons annexes */}
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
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    // root:{
    //     alignItems: 'center',
    //     padding: 20,
    // },
    // logo: {
    //     width: '70%',
    //     maxWidth: 500,
    //     maxHeight: 300,
    // },

    // title: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     color: '#051C60',
    //     margin: 10,
    // },

    // text: {
    //     color: 'gray',
    //     marginVertical: 10,
    // },
    // link: {
    //     color: '#FDB075',
    // },

    root:{
        flex: 1,
        alignItems: 'center',
        //padding: 50,
        margin: 50,
    },

    logo: {
        width: '100%',
        maxWidth: 500,
        maxHeight: 300,
        marginTop: 20,
        marginBottom:20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        margin: 10,
    },

    titlesecondary: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#0033FF',
        margin: 1,
    },
    
    titleprincipal: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFCC33',
        margin: 10,
        textDecorationLine:'underline',
        textAlign:'center'
    },
    button:{
        width: '100%',
        padding: 5,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor:"#0033FF"
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
        marginVertical: 40,
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
        //backgroundColor:"#0033FF",
        borderBottomColor: '#0033FF',
        borderStyle:'solid',
        borderBottomWidth: 1,
    },

});


export default ForgotPasswordScreen;