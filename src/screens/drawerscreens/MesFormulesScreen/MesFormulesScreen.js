import * as React from 'react';
import {useState, useEffect, useContext} from 'react';
import { 
    StyleSheet,
    ScrollView, 
    View, 
    Text, 
    Image, 
    ImageBackground, 
    FlatList, 
    TouchableOpacity,
    TouchableWithoutFeedback, 
    useWindowDimensions,
    ActivityIndicator 
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {useNavigation} from '@react-navigation/native';
//import { useRoute } from '@react-navigation/native';

import axios from 'axios';
import Dialog from "react-native-dialog";

import { AuthContext } from '../../../context/AuthContext';








const MesFormulesScreen = () => {


    const { height } = useWindowDimensions();
    const navigation = useNavigation();



    const { userInfo } = useContext(AuthContext);

    const code = userInfo[0].code;
    const nom = userInfo[0].nom;
    const prenom = userInfo[0].prenom;


    //NAVIGATION
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

    const [dataSource, setDataSource] = useState([]);


    //FlatListe RENDER ITEM
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.item}>
                <View style={{margin:10}}>
                    <Text style={{ color: '#000000', fontSize: 20, fontWeight: 'bold' }}>ID souscription:</Text> 
                    <Text style={{ color: '#000000', fontSize: 20, fontWeight: 'bold' }}>Formule:</Text>                   
                    <Text style={{ color: '#000000', fontSize: 20, fontWeight: 'bold' }}>Montant TTC:</Text>  
                    <Text style={{ color: '#000000', fontSize: 20, fontWeight: 'bold' }}>Code du parrain:</Text>
                </View>
                <View style={{margin:10}}>
                    <Text style={{ color: '#649c15', fontSize: 20, fontWeight: 'bold' }}>{item.id}</Text>
                    <Text style={{ color: '#649c15', fontSize: 20, fontWeight: 'bold' }}>{item.formule_id}</Text>
                    <Text style={{ color: '#649c15', fontSize: 20, fontWeight: 'bold' }}>{item.amount} FCFA</Text>  
                    <Text style={{ color: '#649c15', fontSize: 20, fontWeight: 'bold' }}>{item.code_parrain}</Text>
                </View>
                
                
            </TouchableOpacity>
        )
    };

    const DisplayData = () => {
        axios
        .post('http://ftp.epheynix.com/api/mes_formules.php',
            JSON.stringify({
                code: code,
            })
        )
        .then((response) => {
            setDataSource(response.data);
            console.log(response.data);
            setIsLoading(false) ; 
      

        }).catch((err) => {
            console.log(err);
        });
        

    };


    useEffect(() => {
        DisplayData();
        setIsLoading(true);
        //logoutHandle();
    }, []);




    if(isLoading){

        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
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
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000000' }}>MES FORMULES SOUSCRITES</Text>
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


            {/* MES FORMULES */}
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

                {/* CONTENU  FORMULES */}
                <View style={{ margin: 0 }} >

                    {/* LISTE DES FORMULES */}
                    <FlatList
                        data={dataSource}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                    {/* END LISTE DES FORMULES */}


                </View>
                {/* END CONTENU FORMULES */}

            </View>
            {/* END FORMULES */}







            {/* FOOTER MENU */}
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



        </View>






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
        flexDirection:'row',
        justifyContent:'space-between',
        width: '100%',
        //alignItems:'',
        //height: 120,
        //padding: 20,
        marginVertical: 5,
        //marginHorizontal: 5,
        borderStyle: 'solid',
        borderWidth:1,
        borderColor: '#649c15',
        borderRadius: 5,
        
        //backgroundColor: '#649c15'


    },
    

});


export default MesFormulesScreen;