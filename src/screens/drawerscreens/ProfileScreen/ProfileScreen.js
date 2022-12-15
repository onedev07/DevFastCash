import * as React from 'react';
import {useState, useEffect, useContext} from 'react';
import { StyleSheet,ScrollView, View, Text, TextInput, Image,ActivityIndicator, ImageBackground, FlatList, TouchableOpacity,TouchableWithoutFeedback, useWindowDimensions } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import axios from 'axios';



import {useNavigation} from '@react-navigation/native';
//import { useRoute } from '@react-navigation/native';

import { AuthContext } from '../../../context/AuthContext';

import Dialog from "react-native-dialog";




const ProfileScreen = () => {
    

    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    //const route = useRoute();

    //Afficher info Adhérent
    //Info Du Client

    const {userInfo} = useContext(AuthContext);

    const code = userInfo[0].code;
    const nom = userInfo[0].nom;
    const prenom = userInfo[0].prenom;


    

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
    const [profileInfo, setProfileInfo] = useState(null);
    

    const [pnom, setpNom] = useState(nom);
    const [pprenom, setpPrenom] = useState(prenom);

    const [cel, setCel] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [psswd, setPsswd] = useState('');
    const [bp, setBp] = useState('');
    const [adresse, setAdresse] = useState('');
    const [country_id, setCountry_id] = useState('');
    const [ville, setVille] = useState('');
    const [commune, setCommune] = useState('');

    //Infos Profile
    const infoprofile = ()  => {
        axios
        .post('http://ftp.epheynix.com/api/profile.php',
            JSON.stringify({
                code: code,
            })
        )
        .then((response) => {

            let profileInfo = response.data;
            setProfileInfo(profileInfo);
            

            setCel(profileInfo[0].cel);
            setTel(profileInfo[0].tel);
            setEmail(profileInfo[0].email);
            setPsswd(profileInfo[0].psswd);
            setBp(profileInfo[0].bp);
            setAdresse(profileInfo[0].adresse);
            setCountry_id(profileInfo[0].country_id);
            setVille(profileInfo[0].ville);
            setCommune(profileInfo[0].commune);

            setIsLoading(false) ;

           

            //console.log(profileInfo);

        }).catch((err) => {
            console.log(err);
        });
        setIsLoading(true);
    };

    useEffect(()=>{
        infoprofile();
        setIsLoading(true);
        logoutHandle();
    }, []);

    if(isLoading){

        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size={'large'} color='#649c15' />
            </View>
        )
        
    }

    
    
 
    


    //Update Profile

    const update = async () => {
        //setIsLoading(true);

        if(code.length==0){
            alert("Le code Adhérent est manquant.");
        }else if(nom.length==0){
            alert("Veuillez entrer votre nom svp!");
        }else if(prenom.length==0){
            alert("Veuillez entrer votre prénom svp!");
        }else if(cel.length==0){
            alert("Veuillez entrer votre Numéro Cellulaire svp!");
        }else if(email.length==0){
            alert("Veuillez entrer votre adresse email svp!");
        }else if(psswd.length==0 || psswd!==passwordRepeat){
            alert("Veuillez entrer des mots de passe identiques svp!");
        } else {
            axios
            .post(
                'http://ftp.epheynix.com/api/update_profile.php',
                JSON.stringify({
                    code: code,
                    //photo: photo,
                    nom: nom,
                    prenom: prenom,
                    cel: cel,
                    tel: tel,
                    email: email,
                    psswd: psswd,
                    passwordRepeat: passwordRepeat,
                    bp: bp,
                    adresse: adresse,
                    country_id: country_id,
                    ville: ville,
                    commune: commune,
                })
            )
            .then((response) => {
                console.log(response.data);
                //setIsLoading(false);
                
            }).catch((err) => {
                console.log(err);
            });
            //setIsLoading(false);
        }
        
    };
    
    
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
    




    

    return (
        
        <View style={{flex:1}}>
        
            {/* HEADER */}
            <View style={{
                //flex:1,
                flexDirection:'column',
                backgroundColor:'#F7F7F0',
                width:'100%',
                height: 150,
            }}>
                {/* ENTETE */}
                <View style={{
                    alignItems:'center',
                    padding:5
                    }}>
                    <Text style={{fontSize:22, fontWeight:'bold', color:'#000000'}}>Profile</Text>
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

            <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:0}} >

                {/* PROFILE */}            
                <View style={{
                    //flexDirection:'row',
                    alignSelf:'center',
                    //justifyContent:'space-between',
                    width:'95%',
                    height:430,
                    padding:5,
                    margin:0,
                    borderWidth:1,
                    borderColor:'#FFFFFF',
                    backgroundColor:'#FFFFFF',
                    shadowRadius:3,
                    shadowOffset:{width:3, height:3},
                    shadowColor:'#000000',
                    elevation:5,

                }}>

                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* CONTENU PROFILE */}
                    <View style={{alignItems:'flex-start'}} >
                        <Text style={{color:'#649c15', fontSize:18, fontWeight:'bold'}}>Code :</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize='characters'
                            value={code}
                            //onChangeText={(text)=>setCode(text)}
                        />

                        {/* <Text style={{color:'#649c15', fontSize:18, fontWeight:'bold'}}>Photo :</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text)=>setPhoto(text)}
                        /> */}

                        <Text style={{color:'#649c15', fontSize:18, fontWeight:'bold'}}>Nom :</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize='characters'
                            value={nom}
                            //onChangeText={(text)=>setNom(text)}
                        />

                        <Text style={{color:'#649c15', fontSize:18, fontWeight:'bold'}}>Prénoms :</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize='characters'
                            value={prenom}
                            //onChangeText={(text)=>setPrenom(text)}
                        />

                        <Text style={{color:'#649c15', fontSize:18, fontWeight:'bold'}}>N° Cellulaire :</Text>
                        <TextInput
                            style={styles.input}
                            value={cel}
                            onChangeText={(text)=>setCel(text)}
                        />

                        <Text style={{color:'#649c15', fontSize:18, fontWeight:'bold'}}>N° Téléphonique fixe :</Text>
                        <TextInput
                            style={styles.input}
                            value={tel}
                            onChangeText={(text)=>setTel(text)}
                        />

                        <Text style={{color:'#649c15', fontSize:18, fontWeight:'bold'}}>Email :</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={(text)=>setEmail(text)}
                        />

                        <Text style={{color:'#649c15', fontSize:18, fontWeight:'bold'}}>Mot de passe :</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry= {true}
                            onChangeText={(text)=>setPsswd(text)}
                            value={psswd}                   
                        />

                        <Text style={{color:'#649c15', fontSize:18, fontWeight:'bold'}}>Boîte postale :</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize='characters'
                            value={bp}
                            onChangeText={(text)=>setBp(text)}
                        />

                        <Text style={{color:'#649c15', fontSize:18, fontWeight:'bold'}}>Adresse :</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize='characters'
                            value={adresse}
                            onChangeText={(text)=>setAdresse(text)}                
                        />
                        
                        <Text style={{color:'#649c15', fontSize:18, fontWeight:'bold'}}>Pays :</Text>
                        <TextInput
                            style={styles.input}
                            value={country_id}
                            onChangeText={(text)=>setCountry_id(text)}
                        />

                        <Text style={{color:'#649c15', fontSize:18, fontWeight:'bold'}}>Ville :</Text>
                        <TextInput
                            style={styles.input}
                            value={ville}
                            onChangeText={(text)=>setVille(text)}
                        />

                        <Text style={{color:'#649c15', fontSize:18, fontWeight:'bold'}}>Commune :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Commune"
                            value={commune}
                            onChangeText={(text)=>setCommune(text)}
                        />
                        
                        
                        <TouchableOpacity style={[styles.button]} onPress={update} >
                            <View style={{}}>
                                <Text style={{
                                    color:'#FFFFFF',
                                    fontSize:22,
                                    fontWeight:'bold',
                                    margin:5,

                                }} >Modifier</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* END CONTENU PROFILE */}

                </ScrollView>

                    
                   
                </View>
                {/* END PROFILE */}

                



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
        fontSize:22,
        fontWeight:'bold'
    },
    
});


export default ProfileScreen;