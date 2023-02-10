import * as React from 'react';
import {useState, useEffect, useContext} from 'react';
import { StyleSheet,ScrollView, View, Text, Image, /* ImageBackground */ TextInput, TouchableOpacity,TouchableWithoutFeedback, useWindowDimensions, ActivityIndicator } from 'react-native';

//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {useNavigation} from '@react-navigation/native';
//import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../../../context/AuthContext';

import axios from 'axios';
import Dialog from "react-native-dialog";
//import SelectDropdown from 'react-native-select-dropdown';
import { SelectList } from 'react-native-dropdown-select-list';




const SearchScreen = () => {
    

    const {height} = useWindowDimensions();
    const navigation = useNavigation();
   

    const [isLoading, setIsLoading] = useState(true);


    const {userInfo} = useContext(AuthContext);

    const code = userInfo[0].code;
    const nom = userInfo[0].nom;
    const prenom = userInfo[0].prenom;

    
    //const [data, setData] = useState([]);

    const [cel, setCel] = useState('');
    
    const [snom, setSNom] = useState('');
    const [sprenom, setSPrenom] = useState('');
    const [scode, setSCode] = useState('');
    
    //Infos Profile
    // const SearchCode = ()  => {

    //     if(cel==''){
    //         alert('Veuillez entrer un N° Cellulaire pour rechercher un éventuel parrain. ')
    //     }else{

    //         axios
    //     .post('http://ftp.epheynix.com/api/search.php',
    //         JSON.stringify({
    //             cel: cel,
    //         })
    //     )
    //     .then((response) => {

    //         let searchInfo = response.data;
    //         setData(searchInfo);
    //         setIsLoading(false);           

    //         if(searchInfo=="no"){
    //             alert('Ce parrain n\'a souscrit à aucune offre.');
    //         }else if(searchInfo=="Inexistant"){
    //             alert('Parrain inexistant !')
    //         }else{
    //             setSCode(searchInfo[0].code);
    //             setSNom(searchInfo[0].nom);
    //             setSPrenom(searchInfo[0].prenom);
    //         }
            

    //         console.log(searchInfo);

    //     }).catch((err) => {
    //         console.log(err);
    //     });
    //     //setIsLoading(true);

    //     }

    // };


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




    const [selected, setSelected] = useState("");
    const [data,setData] = useState([]);
    
    
    // const selectFormules = () => {

    //     axios
    //         .post('http://ftp.epheynix.com/api/selection_liste_formules.php')
    //         .then((response) => {
    //             let dataSource = response.data.map((item) => {
    //                 return {key: item.id, value: item.fname}
    //             })
    //             setData(dataSource);

    //             //setDataSource(response.data);
    //             console.log(dataSource);
    //             alert(dataSource);
    //             setIsLoading(false) ;

    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
        
    // }


    

    


    useEffect(()=>{
        // selectFormules();
        // setIsLoading(true);
        //logoutHandle();

        axios
            .get('http://ftp.epheynix.com/api/selection_liste_formules.php')
            .then((response) => {
                
                let dataSource = response.data.map((item) => {
                    return {key: item.id, value: item.fname}
                  });                
                
                setData(dataSource);

                //setDataSource(response.data);
                console.log(dataSource);
                alert(dataSource);
                setIsLoading(false);

            })
            .catch((error) => {
                console.error(error);
            });

        
    }, []);

    
     

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


    // if(isLoading){

    //     return(
    //         <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    //             <ActivityIndicator size={'large'} color='#649c15' />
    //         </View>
    //     )

    // }


    

    return (
        
        <View style={{flex:1}}>
        
            {/* HEADER */}
            <View style={{
                //flex:1,
                flexDirection:'column',
                backgroundColor:'#F7F7F0',
                width:'100%',
                height: 100,
            }}>
                {/* ENTETE */}
                <View style={{
                    alignItems:'center',
                    padding:5
                    }}>
                    <Text style={{fontSize:22, fontWeight:'bold', color:'#000000'}}>Rechercher un parrain</Text>
                </View>
                {/* END ENTETE */}
                
                {/* ADHERENT */}
                <View style={{
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    alignItems:'center',
                    paddingVertical:10,
                    paddingHorizontal:5,
                    backgroundColor: '#649c15',//Jaune--- //'#3366FF',//Bleu
                    border:2,
                    //shadowOpacity: 0.1,
                    shadowRadius:3,
                    shadowOffset:{width:3, height:3},
                    shadowColor:'#000000',
                    elevation:5,


                }}>

                    
                    <View style={{

                    }}>
                        <Image style={{ width:60,height:60 }}
                            resizeMode="contain"
                            source={require('../../../../assets/images/icons/user2.png')}
                            onPress={() => {alert('click')}}
                        />
                    </View>

                    <View style={{padding:0, color:'white'}}>
                        <Text style={{color:'#FFFFFF', fontSize:20, fontWeight:'bold', textAlign:'center'}}>{nom} {prenom} </Text>
                        <Text style={{
                            color:'#ffcb00',
                            justifyContent:'center',
                            alignItems:'center',
                            fontWeight:'bold',
                            fontSize:18,
                            margin:0,
                            paddingTop:5,
                            borderTopWidth:1,
                            borderColor:'#FFFFFF'
                        }}>
                            Code: {code}
                        </Text>
                    </View>
                    

                    <View style={{
                        
                        alignItems:'center',
                        justifyContent:'center',
                    }}>

                        <TouchableOpacity onPress={() => {showDialog()}}>

                            <Image style={{ width:30,height:30 }}
                                resizeMode="contain"
                                source={require('../../../../assets/images/icons/logout1.png')}
                                //onPress={() => {alert('click')}}
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

            <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:30}} >
                      


                {/* FORMULES */}            
                <View style={{
                    //flexDirection:'row',
                    alignSelf:'center',
                    //justifyContent:'space-between',
                    width:'95%',
                    height:450,
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

                    {/* CONTENU SEARCH */}
                    

                    <View style={{}}>
                        <View style={{marginBottom:50}}>
                            <Text style={{color:'#649c15', fontSize:18, fontWeight:'bold', alignSelf:'center', marginBottom:5}}>Sélectionner une formule :</Text>
                            
                            {/* CHAMP SELECT */}
                            <SelectList
                                setSelected={setSelected}
                                data={data} 
                                onSelect={() => alert(selected)} 
                            />
                        

                            <TouchableOpacity style={[styles.button]} >
                                <View style={{}}>
                                    <Text style={{
                                        color:'#FFFFFF',
                                        fontSize:22,
                                        //fontWeight:'bold',
                                        margin:5,

                                    }} >Rechercher</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        

                        {/* LISTE DES CODES PARRAINS */}
                        <View>
                            

                        </View>


                        
                    </View>

                    {/* <View>
                        <Text style={{alignSelf:'center', fontSize:22, fontWeight:'bold', color:'#ffb200'}}>SOUSRIPTIONS EN COURS...</Text>
                    </View> */}

                   
                    
                    {/* END CONTENU SEARCH */}
                   
                </View>
                {/* END FORMULES */}

                



            </ScrollView>

            
           

            
            {/* FOOTER MENU */}
            <View style={{
                flex:1,
                flexDirection:'column',
                backgroundColor:'red'
            }}>                
                <View style={{
                    position:'absolute',
                    alignSelf:'center',
                    backgroundColor:'#f4f4f4',
                    width:70,
                    height:70,
                    borderRadius:35,
                    bottom:35,
                    zIndex:10
                }}>
                    <TouchableWithoutFeedback onPress={GoToFormules}>
                        <View style={[styles.buttonfloat, styles.actionBtn]}>
                            <Image style={{ width:80,height:60 }}
                            resizeMode="contain"
                            source={require('../../../../assets/images/icons/add1.png')}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            
            <View style={{
                position:'absolute',
                backgroundColor:'#649c15',//Violet
                border:2,
                radius:3,
                shadowOpacity: 0.3,
                shadowRadius:3,
                shadowOffset:{width:3, height:3},
                x:0,
                y:0,
                style:{marginVertical:5},
                bottom:0,
                width:'100%',
                height:70,
                flexDirection:'row',
                justifyContent:'space-between',
                paddingVertical:10,
                paddingHorizontal:10,
            }}>

                <View style={{
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'center'
                }}>

                    <TouchableOpacity onPress={GoToDashBoard}>

                        <Image style={{ width:30,height:30 }}
                            resizeMode="contain"
                            source={require('../../../../assets/images/icons/home.png')}
        
                        />

                    </TouchableOpacity>

                    <Text style={{justifyContent:'center', alignItems:'center', color:'#FFFFFF'}}>Accueil</Text>
                    
                </View>


                <View style={{
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'center',
                    marginRight:50
                    
                }}>

                    <TouchableOpacity onPress={GoToMesFormules}>

                        <Image style={{ width:30,height:30 }}
                            resizeMode="contain"
                            source={require('../../../../assets/images/icons/subscribe.png')}
                        />

                    </TouchableOpacity>

                    <Text style={{justifyContent:'center', alignItems:'center', color:'#FFFFFF'}}>Mes Formules</Text>
                    
                </View>


                <View style={{
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'center'
                }}>

                    <TouchableOpacity onPress={GoToProfile}>

                        <Image style={{ width:30,height:30 }}
                            resizeMode="contain"
                            source={require('../../../../assets/images/icons/user1.png')}
                        />

                    </TouchableOpacity>

                    <Text style={{justifyContent:'center', alignItems:'center', color:'#FFFFFF'}}>Profile</Text>
                    
                </View>

                <View style={{
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'center'
                }}>

                    <TouchableOpacity onPress={GoToSearch}>

                        <Image style={{ width:30,height:30 }}
                            resizeMode="contain"
                            source={require('../../../../assets/images/icons/search.png')}
                        />

                    </TouchableOpacity>

                    <Text style={{justifyContent:'center', alignItems:'center', color:'#FFFFFF'}}>Recherche</Text>
                    
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
        alignItems:'center',
        flexDirection:'row',
        margin: 5,
        height: 150,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#FFFFFF',
        
    },
    logo: {
        height: 80,
        width: 80,
        marginBottom:10
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
        alignItems:'flex-start',
        flexDirection:'row',        
        margin: 5,
        //height: 50,
        
        borderRadius: 5,
        borderColor: '#FFFFFF',
        borderWidth:2,
        backgroundColor: '#FFFFFF'
    },

    nb: {
        width: '80%',
        flexDirection:'row',
        margin: 5,
        //backgroundColor: 'yellow'
    },

    val: {
        width: '80%',
        flexDirection:'row',
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

    buttonfloat:{
        width:60,
        height:60,
        alignItems:'center',
        justifyContent:'center',
        shadowColor:'#0033FF',
        shadowOpacity: 0.1,
        shadowOffset: {x: 2, y:0},
        shadowRadius: 2,
        borderRadius:30,
        position:'absolute',
        bottom:20,
        right:0,
        top:5,
        left:5,
        shadowOpacity: 0.5,
    },
    actionBtn:{
        backgroundColor:'#FFFFFF',
        textShadowOffset:{width:5, height:5},
        textShadowRadius:10,
        borderWidth:2,
        borderColor:'#FFFFFF'
    },
    button:{
        width: '60%',
        height:50,
        padding: 5,
        marginVertical: 5,
        alignItems: 'center',
        alignSelf:'center',
        borderRadius: 50,
        backgroundColor:"#649c15"
    },
    input:{
        width: '100%',
        padding: 5,
        marginVertical: 0,
        marginBottom: 20,
        alignItems: 'center',
        //borderRadius: 50,
        //backgroundColor:"#0033FF",
        borderBottomColor: '#649c15',
        borderStyle:'solid',
        borderBottomWidth: 1,
        fontSize:20,
        fontWeight:'bold',
        autoCapitalize:'true'
    },
    
});


export default SearchScreen;