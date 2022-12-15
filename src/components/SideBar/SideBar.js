import React from 'react';
import {View, Text, StyleSheet, ScrollView, ImageBackground, Image} from 'react-native';
//import {DrawerNavigatorItems} from 'react-navigation-drawer';
import {Ionicons} from '@expo/vector-icons';

import Bck from '../../../assets/images/Bck.jpg';
import Profile from '../../../assets/profileImages/Profile.jpg';





/* Obtenir les données */
var email = this.state.email;
var psswd = this.state.psswd;

useEffect(() => {
    getData();
}, []);


const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(responseJson)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        console.log(e);
    }
}


/* const SideBar = props => (

    <ScrollView>
        <ImageBackground
            source={Bck}
            style={{width:undefined, padding: 16, paddingTop: 48}}
        >
            <Image source={Profile} style={styles.profile} />

            
            <Text style={styles.name}>
                {responseJson.name}
            </Text>

            <Text style={styles.name}>
                {responseJson.prenom}
            </Text>

            <Text style={styles.name}>
                {responseJson.code_adherent}
            </Text>

        </ImageBackground>

        <View style={styles.container}>
            <DrawerNavigatorItems {...props} />
        </View>


    </ScrollView>

); */


const styles= StyleSheet.create({
    container: {
        flex: 1
    },
    profile: {
        width:80,
        height:80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor:'#FFFFFF',
    },
    name: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: '800',
        marginVertical: 8
    }
});

export default SideBar;