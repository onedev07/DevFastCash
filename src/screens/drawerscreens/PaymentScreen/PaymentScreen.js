import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    useWindowDimensions,
    ActivityIndicator,
    ToastAndroid,
    ScrollView
} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

import { WebView } from 'react-native-webview';






import { AuthContext } from '../../../context/AuthContext';
//import axios from 'axios';




const PaymentScreen = () => {


    const { height } = useWindowDimensions();
    const navigation = useNavigation();



    const { userInfo } = useContext(AuthContext);

    const code = userInfo[0].code;
    const nom = userInfo[0].nom;
    const prenom = userInfo[0].prenom;


    




    const [isLoading, setIsLoading] = useState(false);

   



    useEffect(() => {
        //Validate();
        //setIsLoading(true);
    }, []);


    if (isLoading) {

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} color='#649c15' />
            </View>
        )

    }


    const route = useRoute();
    const params = route.params;
    const { url } = params;



    return (

        <WebView
            originWhitelist={['*']}
            source={{
                uri: url,
            }}
        />
    );

};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        //backgroundColor: '#FFFFFF',
    },

    header: {
        alignItems: 'center',
        flexDirection: 'row',
        margin: 5,
        height: 150,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#FFFFFF',

    },
    logo: {
        height: 80,
        width: 80,
        marginBottom: 10
    },

    username: {
        width: '50%',
        margin: 10,

    },
    headerText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
        alignSelf: 'flex-start'
    },

    photo: {
        width: '50%',
        margin: 10,
    },
    profileImg: {
        height: 100,
        width: 100,
        borderRadius: 100,
        alignSelf: 'flex-end',
        marginRight: 40,
        marginTop: 40
    },

    indicateur: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        margin: 5,
        //height: 50,

        borderRadius: 5,
        borderColor: '#FFFFFF',
        borderWidth: 2,
        backgroundColor: '#FFFFFF'
    },

    nb: {
        width: '80%',
        flexDirection: 'row',
        margin: 5,
        //backgroundColor: 'yellow'
    },

    val: {
        width: '80%',
        flexDirection: 'row',
        margin: 5,
    },

    text: {
        fontSize: 16,
        color: '#000000',
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0033FF',
        //textDecorationLine:'underline',
    },

    souscription: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#0033FF',
        borderRadius: 5,
        margin: 5,

    },
    menuFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        margin: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#0033FF',
        backgroundColor: '#0033FF',
    },
    button: {

    },
    buttontitle: {
        color: '#FFFFFF',
        marginLeft: 20
    },

    buttonfloat: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#0033FF',
        shadowOpacity: 0.1,
        shadowOffset: { x: 2, y: 0 },
        shadowRadius: 2,
        borderRadius: 30,
        position: 'absolute',
        bottom: 20,
        right: 0,
        top: 5,
        left: 5,
        shadowOpacity: 0.5,
    },
    actionBtn: {
        backgroundColor: '#FFFFFF',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
        borderWidth: 2,
        borderColor: '#FFFFFF'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        height: 100,
        // padding: 5,
        marginVertical: 5,
        //marginHorizontal: 5,
        borderStyle: 'solid',
        //borderWidth:1,
        borderColor: '#000000',
        borderRadius: 10,
        backgroundColor: '#9e00ff'


    },
    title: {
        //marginLeft:5,

    },
    montant: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    taxe: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingRight: 30,
    },
    input: {
        width: '100%',
        padding: 5,
        marginVertical: 0,
        marginBottom: 20,
        alignItems: 'center',
        //borderRadius: 50,
        //backgroundColor:"#0033FF",
        height: 50,
        borderColor: '#649c15',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 10,
        fontSize: 20,
        fontWeight: 'bold',
        autoCapitalize: 'true'
    },

    button: {
        width: '60%',
        height: 50,
        padding: 5,
        marginVertical: 5,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 50,
        backgroundColor: "#649c15"
    },

});


export default PaymentScreen;