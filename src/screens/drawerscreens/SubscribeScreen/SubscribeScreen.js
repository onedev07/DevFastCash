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

import Dialog from "react-native-dialog";




const SubscribeScreen = ({ route }) => {


    const { height } = useWindowDimensions();
    const navigation = useNavigation();



    const { userInfo } = useContext(AuthContext);

    const code = userInfo[0].code;
    const nom = userInfo[0].nom;
    const prenom = userInfo[0].prenom;

    //Reccuperation de l'ID formule passé en paramètre
    const { item, fnom, ftaxe, ftotal } = route.params;


    //Navigation
    const GoToDashBoard = () => {
        //console.warn("forgotPassword");
        navigation.navigate("DashBoard");
    };

    const GoToProfile = () => {
        //console.warn("forgotPassword");
        navigation.navigate("Profile");
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
    const {logout} = useContext(AuthContext);

    const [visible, setVisible] = useState(false);    

    const handleDelete = () => {
        setVisible(false);
    };

    const showDialog = () => {
        setVisible(true);
    };


    //Paramètres du logout
    const logoutHandle = (userInfo) => {
        logout(userInfo);
        setIsLoading(false);
    }


    const [isLoading, setIsLoading] = useState(false);

    // //Gestion du champs code_parrain à renseigner
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
                        item,
                })
                .then((response) => {

                    
                    let codeInfo = response.data;
                    console.log(codeInfo);
                    if(codeInfo == "Inexistant"){
                        //console.log(userToken);
                        alert("Le code parrain n'existe pas dans la base de données.");
                    }else if(codeInfo ==701){
                        alert('La formule de votre parrain est différente de la votre.');
                        //alert(codeInfo);
                    }else if(codeInfo == "REFUSED"){
                        alert("La souscription du parrain n'est pas active");
                    }else if(codeInfo == "ACCEPTED"){
                        console.log(codeInfo);
                        alert('Code Parrain accepté.')
                        //Redirection vers l'écran de validation
                        navigation.navigate('Validation', { item, fnom, ftaxe, ftotal, code_parrain });
                        
                    }
                    
                    
                }).catch((err) => {
                    console.log(err);
                });

                setIsLoading(false);
        }
        
    }

    



    useEffect(() => {
        setIsLoading(true);
        //verifCodeParrain();
        
        logoutHandle();
    }, []);


    if (isLoading) {

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} color='#649c15' />
            </View>
        )

    }

    



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

                        <TouchableOpacity onPress={() => {showDialog()}}>

                            <Image style={{ width: 30, height: 30 }}
                                resizeMode="contain"
                                source={require('../../../../assets/images/icons/logout1.png')}
                                //onPress={() => { alert('click') }}
                            />

                        </TouchableOpacity>

                        {/* BOITE DE DIALOGUE */}
                        <Dialog.Container visible={visible}>
                            <Dialog.Title>Déconnexion</Dialog.Title>
                            <Dialog.Description>
                            Voulez-vous vous déconnecter?
                            </Dialog.Description>
                            <Dialog.Button label="Oui" onPress={logoutHandle} />
                            <Dialog.Button label="Non" onPress={handleDelete} />
                        </Dialog.Container>



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
                <View style={{ margin: 0}} >

                    {/* <Text>ID: {JSON.stringify(item)}</Text>
                    <Text>NOM: {JSON.stringify(fnom)}</Text> */}

                    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 5 }} >

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
                            {/* CHAMPS ID DE LA FORMULE INVISIBLE */}
                            <Text style={{ color: '#649c15', fontSize: 18, fontWeight: 'bold' }}>ID Formule :</Text>
                            <TextInput
                                style={styles.input}
                                value={item}
                                //onChangeText={text => setIdFormule(text)}                    
                                
                            />


                            <Text style={{ color: '#649c15', fontSize: 18, fontWeight: 'bold' }}>Formule :</Text>
                            <TextInput
                                style={styles.input}
                                value={fnom}
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
                                onChangeText={text => setCodeParrain(text)}
                            />


                        <TouchableOpacity style={[styles.button]} 
                            onPress={()=>{verifCodeParrain()}}
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

                            
                        </View>

                        


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
        marginBottom: 100,
        marginVertical: 5,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 50,
        backgroundColor: "#649c15"
    },

});


export default SubscribeScreen;