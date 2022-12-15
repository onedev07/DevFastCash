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
import { main } from 'https://cdn.cinetpay.com/seamless/main.js';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


import uuid from 'react-native-uuid';
//import { WebView } from 'react-native-webview';





import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';




const SubscribeScreen = ({ route }) => {


    const { height } = useWindowDimensions();
    const navigation = useNavigation();



    const { userInfo } = useContext(AuthContext);

    const code = userInfo[0].code;
    const nom = userInfo[0].nom;
    const prenom = userInfo[0].prenom;


    //Navigation
    const GoToDashBoard = () => {
        //console.warn("forgotPassword");
        navigation.navigate("DashBoard");
    };

    const GoToProfile = () => {
        //console.warn("forgotPassword");
        navigation.navigate("Profile");
    };

    const GoToSubscribe = () => {
        //console.warn("Register");
        navigation.navigate("Subscribe");
    };

    const GoToLogOut = () => {
        //console.warn("Home");
        navigation.navigate("Login");
    };

    const GoToFormules = () => {
        //console.warn("Home");
        navigation.navigate("Formules");
    };
    const GoToSearch = () => {
        //console.warn("Home");
        navigation.navigate("Search");
    };
    const GoToMesFormules = () => {
        //console.warn("Home");
        navigation.navigate("MesFormules");
    };



    //Deconnexion
    const { logout } = useContext(AuthContext);

    const logoutHandle = () => {
        //setIsLoading(true);
        //setUserToken(null);
        AsyncStorage.removeItem('userInfo');
        //AsyncStorage.removeItem('userToken');
        //setIsLoading(false);
    }




    const [isLoading, setIsLoading] = useState(false);

    const [dataSource, setDataSource] = useState([]);



    



    


    const checkout = ()  => {

        CinetPay.setConfig({
            apikey: '1517788377630df3845c25d6.96468451',
            site_id: 996145,
            mode: 'PRODUCTION',
            notify_url: 'https://mondomaine.com/notify/'
        });

        CinetPay.getCheckout({
            transaction_id: 'YOUR_TRANSACTION_ID',
            amount: 100,
            currency: 'XOF',
            channels: 'ALL',
            description: 'YOUR_PAYMENT_DESCRIPTION',
            //Fournir ces variables obligatoirement pour le paiements par carte bancaire
            customer_name:"Joe",//Le nom du client
            customer_surname:"Down",//Le prenom du client
            customer_email: "down@test.com",//l'email du client
            customer_phone_number: "088767611",//l'email du client
            customer_address : "BP 0024",//addresse du client
            customer_city: "Antananarivo",// La ville du client
            customer_country : "CM",// le code ISO du pays
            customer_state : "CM",// le code ISO l'état
            customer_zip_code : "06510", // code postal
        });
        CinetPay.waitResponse(function(data) {
            if (data.status == "REFUSED") {
                if (alert("Votre paiement a échoué")) {
                    window.location.reload();
                }
            } else if (data.status == "ACCEPTED") {
                if (alert("Votre paiement a été effectué avec succès")) {
                    window.location.reload();
                }
            }
        });
        
        



        axios
        .post(

        )

    }


    


    //Gestion du champs code_parrain à renseigner
    const [code_parrain, setCodeParrain] = useState('');
    
    //Vérification du code_parrain en focntion de la formule
    const verifCodeParrain = () =>{
        setIsLoading(true);
        if(code_parrain==''){
            alert('Veuillez entrer le code de votre parrain s\'il vous plait!!!!');
        }else{
            axios
                .post(
                    'http://ftp.epheynix.com/api/verifcode.php', {
                        code_parrain, 
                })
                .then((response) => {

                    
                    let userInfo = response.data;
                    //console.log(userInfo);
                    if(userInfo == "Inexistant"){
                        //console.log(userToken);
                        alert("Email ou Mot de passe incorrect. Veuillez vérifier les paramètres de votre compte s\'il vous plait.");
                    }else{
                        alert('Succes de la connexion !!!!');
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
    }

    



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

    //Reccuperation de l'ID formule passé en paramètre
    const { item, fnom, ftaxe, ftotal } = route.params;



    return (

        <View style={{ flex: 1 }}>

            {/* HEADER */}
            <View style={{
                //flex:1,
                flexDirection: 'column',
                backgroundColor: '#F7F7F0',
                width: '100%',
                height: 100,
            }}>
                {/* ENTETE */}
                <View style={{
                    alignItems: 'center',
                    padding: 5
                }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000000' }}>Souscription</Text>
                </View>
                {/* END ENTETE */}

                {/* ADHERENT */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    backgroundColor: '#649c15',//Jaune--- //'#3366FF',//Bleu
                    border: 2,
                    //shadowOpacity: 0.1,
                    shadowRadius: 3,
                    shadowOffset: { width: 3, height: 3 },
                    shadowColor: '#000000',
                    elevation: 5,


                }}>


                    <View style={{

                    }}>
                        <Image style={{ width: 60, height: 60 }}
                            resizeMode="contain"
                            source={require('../../../../assets/images/icons/user2.png')}
                            onPress={() => { alert('click') }}
                        />
                    </View>

                    <View style={{ padding: 0, color: 'white' }}>
                        <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{nom} {prenom}</Text>
                        <Text style={{
                            color: '#ffcb00',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontWeight: 'bold',
                            fontSize: 18,
                            margin: 0,
                            paddingTop: 5,
                            borderTopWidth: 1,
                            borderColor: '#FFFFFF'
                        }}>
                            Code: {code}
                        </Text>
                    </View>


                    <View style={{

                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                        <TouchableOpacity onPress={() => { alert('click') }}>

                            <Image style={{ width: 30, height: 30 }}
                                resizeMode="contain"
                                source={require('../../../../assets/images/icons/logout1.png')}
                                onPress={() => { alert('click') }}
                            />

                        </TouchableOpacity>



                    </View>

                </View>
                {/* END ADHERENT */}


            </View>
            {/* END HEADER */}


            {/* SOUSCRIRE */}
            <View style={{
                //flex:1,
                //flexDirection:'column',
                //flexDirection:'row',
                alignSelf: 'center',
                //justifyContent:'space-between',
                width: '95%',
                height: 460,
                padding: 5,
                marginTop: 30,
                borderWidth: 1,
                borderColor: '#FFFFFF',
                backgroundColor: '#FFFFFF',
                shadowRadius: 3,
                shadowOffset: { width: 3, height: 3 },
                shadowColor: '#000000',
                elevation: 5,

            }}>

                {/* <View style={{}} >
                    <Image
                        style={{ width: '100%', height: '55%' }}
                        source={{ uri: 'http://ftp.epheynix.com/api/money.jpg' }}
                    />
                </View> */}

                {/* CONTENU  SOUSCRIRE */}
                <View style={{ margin: 0 }} >

                    {/* <Text>ID: {JSON.stringify(item)}</Text>
                    <Text>NOM: {JSON.stringify(fnom)}</Text> */}

                    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }} >

                        <View style={{}}>

                            <Text style={{ color: '#649c15', fontSize: 18, fontWeight: 'bold' }}>Code adhérent :</Text>
                            <TextInput
                                style={styles.input}
                                //placeholder="Code"
                                autoCapitalize='characters'
                                value={code}
                            //setValue={setCodeAdherent}
                            //onChangeText={(text)=>setCode(text)}
                            />

                            <Text style={{ color: '#649c15', fontSize: 18, fontWeight: 'bold' }}>Formule :</Text>
                            <TextInput
                                style={styles.input}
                                value={fnom}
                            />

                            {/* CHAMPS ID DE LA FORMULE INVISIBLE */}
                            <TextInput
                                style={styles.input}
                                value={item}
                            />

                            <Text style={{ color: '#649c15', fontSize: 18, fontWeight: 'bold' }}>Montant Taxe :</Text>
                            <TextInput
                                style={styles.input}
                                value={ftaxe}
                            />

                            <Text style={{ color: '#649c15', fontSize: 18, fontWeight: 'bold' }}>Montant total à payer :</Text>
                            <TextInput
                                style={styles.input}
                                value={ftotal}
                            />

                            <Text style={{ color: '#649c15', fontSize: 18, fontWeight: 'bold' }}>Code du parrain :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Entrer le code de votre parrain...'
                                //value={code_parrain}
                                value={code_parrain}                   
                                onChangeText={text => setCodeParrain(text)}
                            />

                            
                        </View>

                        <TouchableOpacity style={[styles.button]} 
                            onPress={() => {
                                getPaymentUrl().then((response) => {
                                    navigation.navigate('Guichet CinetPay', {
                                    url: response.data.payment_url,
                                    });
                                });
                                }}
                        >
                        <View style={{}}>
                            <Text style={{
                                color: '#FFFFFF',
                                fontSize: 22,
                                //fontWeight:'bold',
                                margin: 5,

                            }} >Valider</Text>
                        </View>
                    </TouchableOpacity>


                </ScrollView>



            </View>
            {/* END CONTENU SOUSCRIRE */}

        </View>
            {/* END SOUSCRIRE */ }







    {/* FOOTER MENU */ }
    <View style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'red'
    }}>
        <View style={{
            position: 'absolute',
            alignSelf: 'center',
            backgroundColor: '#f4f4f4',
            width: 70,
            height: 70,
            borderRadius: 35,
            bottom: 35,
            zIndex: 10
        }}>
            <TouchableWithoutFeedback onPress={GoToFormules}>
                <View style={[styles.buttonfloat, styles.actionBtn]}>
                    <Image style={{ width: 80, height: 60 }}
                        resizeMode="contain"
                        source={require('../../../../assets/images/icons/add1.png')}
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>

        <View style={{
            position: 'absolute',
            backgroundColor: '#649c15',//Violet
            border: 2,
            radius: 3,
            shadowOpacity: 0.3,
            shadowRadius: 3,
            shadowOffset: { width: 3, height: 3 },
            x: 0,
            y: 0,
            style: { marginVertical: 5 },
            bottom: 0,
            width: '100%',
            height: 70,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            paddingHorizontal: 10,
        }}>

            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                <TouchableOpacity onPress={GoToDashBoard}>

                    <Image style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                        source={require('../../../../assets/images/icons/home.png')}

                    />

                </TouchableOpacity>

                <Text style={{ justifyContent: 'center', alignItems: 'center', color: '#FFFFFF' }}>Accueil</Text>

            </View>


            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 50

            }}>

                <TouchableOpacity onPress={GoToMesFormules}>

                    <Image style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                        source={require('../../../../assets/images/icons/subscribe.png')}
                    />

                </TouchableOpacity>

                <Text style={{ justifyContent: 'center', alignItems: 'center', color: '#FFFFFF' }}>Mes Formules</Text>

            </View>


            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                <TouchableOpacity onPress={GoToProfile}>

                    <Image style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                        source={require('../../../../assets/images/icons/user1.png')}
                    />

                </TouchableOpacity>

                <Text style={{ justifyContent: 'center', alignItems: 'center', color: '#FFFFFF' }}>Profile</Text>

            </View>

            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                <TouchableOpacity onPress={GoToSearch}>

                    <Image style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                        source={require('../../../../assets/images/icons/search.png')}
                    />

                </TouchableOpacity>

                <Text style={{ justifyContent: 'center', alignItems: 'center', color: '#FFFFFF' }}>Recherche</Text>

            </View>


        </View>

    </View>



        </View >






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


export default SubscribeScreen;