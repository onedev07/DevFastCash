import * as React from 'react';
import { View, Text, Image, StyleSheet,ScrollView, useWindowDimensions, TouchableOpacity } from 'react-native';
import Logo from '../../../assets/images/Logo.png';

import { useNavigation } from '@react-navigation/native';



const HomeScreen = () => {

    const { height } = useWindowDimensions();
    const navigation = useNavigation();

    const GoToLogin = () => {        
        //console.warn('Login');
        navigation.navigate('Login');
    };

    const GoToRegister = () => {
        //console.warn('Register');
        navigation.navigate("Register");        
    };

    return (

        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={styles.root} >

                <Image source={Logo}
                    style = {
                        [styles.logo, { height: height * 0.3 }]
                    }
                    resizeMode = "contain"
                />


                {/* <View style={{
                    //flexDirection:'row',
                    alignSelf:'center',
                    //justifyContent:'space-between',
                    width:'100%',
                    height:250,
                    padding:5,
                    margin:5,
                    borderWidth:1,
                    borderColor:'#FFFFFF',
                    backgroundColor:'#FFFFFF',
                    shadowRadius:3,
                    shadowOffset:{width:3, height:3},
                    shadowColor:'#000000',
                    elevation:5,


                }}>
                    <View style={{alignItems:'center'}} >
                        <Image style={{ width:'100%',height:'100%' }}
                            resizeMode="contain"
                            source={require('../../../assets/images/Pub2.jpg')}
                        />
                    </View>
                   
                </View> */}

            
                <TouchableOpacity onPress={GoToLogin} style={[styles.Button]} >
                    <View style={{
                        
                        }}>
                        
                        <Text style={{
                            fontSize:20,
                            color:'#FFFFFF',
                            fontWeight:'bold',
                            alignSelf:'center',
                            margin:5,
                        
                        }}>Se connecter</Text>
                    </View>            
                </TouchableOpacity>

                <TouchableOpacity onPress={GoToRegister} style={[styles.Button]} >
                    
                    <View style={{
                        alignItems:'center',
                        alignItems:'center'
                        
                        }}>
                        <Text style={{
                            fontSize:20,
                            color:'#FFFFFF',
                            fontWeight:'bold',
                            alignSelf:'center',
                            margin:5,
                            
                        }}>Créer un compte</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 10,
        height: 611,
        backgroundColor: '#FFFFFF' //'#F7F7F0',
    },

    logo: {
        width: '100%',
        //maxWidth: 500,
        //maxHeight: 300,
        marginBottom:10,
        marginTop:130
    },
    title: {
        fontSize: 18,
        //fontWeight: 'bold',
        color: '#FFFFFF',
        margin: 10,
    },
    Button:{
        width: '60%',
        height: 50,
        padding: 5,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor:'#649c15', //"#0033FF"
    },
});


export default HomeScreen;