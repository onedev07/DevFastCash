import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import Logo from '../../../assets/images/Logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
//import {useNavigation} from '@react-navigation/native';


const { height } = useWindowDimensions();
//const navigation = useNavigation();

const NewPasswordScreen = () => {

    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');

   
    const SubmitPressed = () => {
        //console.warn("SubmitPressed");
        navigation.navigate('Home');
    };

    const logInPressed = () => {
        //console.warn("logInPressed");
        navigation.navigate('Login');
    };


    return(
        

            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.root}>

                    <View>

                        <Image
                            source={Logo}
                            style={[styles.logo , {height: height * 0.3}]}
                            resizeMode="contain"
                        />

                        <Text style={styles.title} >Réinitialisez votre mot de passe</Text>


                    <CustomInput
                        placeholder="Code"
                        value={code}
                        setValue={setCode}
                    />

                    <CustomInput
                            placeholder="Entrer votre nouveau mot de passe"
                            value={newPassword}
                            setValue={setNewPassword}
                        />


                    <CustomButton Text="Valider" onPress={SubmitPressed} />

                    <CustomButton
                        Text="Retour à la connexion"
                        onPress={logInPressed}
                        type="TERTIARY"
                    />

                    </View>
                </View>

            </ScrollView>


    );
};

const styles = StyleSheet.create({
    root:{
        alignItems: 'center',
        padding: 20,
    },

    logo: {
        width: '70%',
        maxWidth: 500,
        maxHeight: 300,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },

    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    },

});


export default NewPasswordScreen;