import React, { useState, useEffect, useContext } from 'react';
import {View, Text, TextInput, Image, StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import Logo from '../../../assets/images/Logo.png';
import { useNavigation } from '@react-navigation/native';

//import { AuthContext } from '../../components/context';
//import { AuthContext } from '../../context/AuthContext';

//Client http
import axios from 'axios';



const RegisterScreen = () => {

    const { height } = useWindowDimensions();
    const navigation = useNavigation();
    
    //const val = useContext(AuthContext);
    



    //Navigation vers le Home
    const GoToHome = () => {
        //console.warn("Home");
        navigation.navigate('Home');
    };

    

    //const [code, setCode] = useState('');
    const [photo, setPhoto] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [cel, setCel] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [psswd, setPsswd] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [bp, setBp] = useState('');
    const [adresse, setAdresse] = useState('');
    const [country_id, setCountry_id] = useState('');
    const [ville, setVille] = useState('');
    const [commune, setCommune] = useState('');

    //const {isLoading, register} = useContext(AuthContext);

    //GENERATION AUTOMATIQUE DU CODE
    let prefix = 'FC-';
    let version = '01-';
    
    //let cel = cel.toString();
    // const getYear = () => {
    //     let Date = new Date();
    //     let annee = Date.getFullYear();
    //     return fix = annee.toString();
    // }

    let code = prefix.concat(version).concat(cel);

    const [isLoading, setIsLoading] = useState(false);

    //Fonction REGISTER
    const register = async () => {

        /* if(code.length==0){
            alert("Le code Adhérent est manquant.");
        }else  */if(nom.length==0){
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
                'http://ftp.epheynix.com/api/register.php',
                JSON.stringify({
                    code: code,
                    photo: photo,
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

                let Data = response.data;
                console.log(response.data);
                setIsLoading(false);

                if(Data == 'error cel'){
                    alert('Le Numéro Cellulaire existe déjà!!!');
                }else if(Data == 'error code'){
                    alert('Le code adhérent existe déjà!!!');
                }else if(Data == 'echec'){
                    alert('Echec de la création du compte !!!');
                }else{
                    setIsLoading(true);
                    alert('Votre compte a bien été créé. Vous pouvez vous connecter maintenant !!!');
                    
                    //Redirection vers l'écran de connexion (Login)
                    navigation.navigate('Login');
                }
                
            }).catch((err) => {
                console.log(err);
                //alert('Erreur connexion réseau !!!');
            });
            setIsLoading(false);
        }
        
    };


    useEffect(() => {
        //register();
        setIsLoading(false);
    }, []);


    if (isLoading) {

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} color='#649c15' />
            </View>
        )

    }

    

    // const [isSubmit, setIsSubmit] = useState(false);

    // useEffect(() => {
    //     const register = async () => {

    //         /* if(code.length==0){
    //             alert("Le code Adhérent est manquant.");
    //         }else  */if(nom.length==0){
    //             alert("Veuillez entrer votre nom svp!");
    //         }else if(prenom.length==0){
    //             alert("Veuillez entrer votre prénom svp!");
    //         }else if(cel.length==0){
    //             alert("Veuillez entrer votre Numéro Cellulaire svp!");
    //         }else if(email.length==0){
    //             alert("Veuillez entrer votre adresse email svp!");
    //         }else if(psswd.length==0 || psswd!==passwordRepeat){
    //             alert("Veuillez entrer des mots de passe identiques svp!");
    //         } else {
    //             axios
    //             .post(
    //                 'http://ftp.epheynix.com/api/register.php',
    //                 JSON.stringify({
    //                     code: code,
    //                     photo: photo,
    //                     nom: nom,
    //                     prenom: prenom,
    //                     cel: cel,
    //                     tel: tel,
    //                     email: email,
    //                     psswd: psswd,
    //                     passwordRepeat: passwordRepeat,
    //                     bp: bp,
    //                     adresse: adresse,
    //                     country_id: country_id,
    //                     ville: ville,
    //                     commune: commune,
    //                 })
    //             )
    //             .then((response) => {
    //                 console.log(response.data);
    //                 setIsSubmit(false);
    //                 //Redirection vers l'écran de connexion (Login)
    //                 navigation.navigate('Login');
    //             }).catch((err) => {
    //                 console.log(err);
    //             });
    //         }
            
    //     };
    //     if (isSubmit) register();

    // }, [isSubmit]); 

    
    return(
        
        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.root}>

                <Image
                    source={Logo}
                    style={[styles.logo , {height: height * 0.3}]}
                    resizeMode="contain"
                />

                <View>
                    <Text style={styles.titleprincipal}>CREER UN COMPTE</Text>
                </View>

                <View style={{
                    alignItems: 'center',
                    width:'100%',
                    padding: 20,
                    backgroundColor: '#FFFFFF',                    
                    padding:5,
                    margin:5,
                    borderWidth:1,
                    borderColor:'#FFFFFF',
                    shadowRadius:3,
                    shadowOffset:{width:3, height:3},
                    shadowColor:'#000000',
                    elevation:5,
                }}>

                    {/* GENERATION AUTOMATIQUE DU CODE ADHERENT*/}
                    {/* <TextInput
                        style={styles.input}
                        placeholder="Code"
                        autoCapitalize='characters'
                        // value={code_adherent}
                        //setValue={setCodeAdherent}
                        onChangeText={(text)=>setCode(text)}
                    /> */}

                    <TextInput
                        style={styles.input}
                        placeholder="Photo"
                        onChangeText={(text)=>setPhoto(text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Nom"
                        autoCapitalize='characters'
                        onChangeText={(text)=>setNom(text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Prénom"
                        autoCapitalize='characters'
                        onChangeText={(text)=>setPrenom(text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="N° Cellulaire"
                        onChangeText={(text)=>setCel(text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="N° Téléphonique Fixe"
                        onChangeText={(text)=>setTel(text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={(text)=>setEmail(text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Mot de Passe"
                        secureTextEntry= {true}
                        onChangeText={(text)=>setPsswd(text)}
                        value={psswd}                   
                    />

                    <TextInput
                        style={(psswd==passwordRepeat)?styles.input:styles.input1}
                        placeholder="Repéter le Mot de Passe"
                        secureTextEntry= {true}
                        onChangeText={(text)=>setPasswordRepeat(text)}
                        value= {passwordRepeat}
                        
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Boîte postale"
                        autoCapitalize='characters'
                        onChangeText={(text)=>setBp(text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Adresse"
                        autoCapitalize='characters'
                        onChangeText={(text)=>setAdresse(text)}                
                        />

                    <TextInput
                        style={styles.input}
                        placeholder="Pays"
                        onChangeText={(text)=>setCountry_id(text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Ville"
                        onChangeText={(text)=>setVille(text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Commune"
                        onChangeText={(text)=>setCommune(text)}
                    />

                    <TouchableOpacity style={[styles.button]} onPress={()=>{register()}} /* onPress={()=>setIsSubmit(true)} */ >
                        <View style={{}}>
                            <Text style={{
                                color:'#FFFFFF',
                                fontSize:22,
                                fontWeight:'bold',
                                margin:5,

                            }} >Valider</Text>
                        </View>
                    </TouchableOpacity>

                    

                    <Text style={styles.text}>
                        En créant votre compte, vous acceptez nos{' '}
                        <Text style={styles.link} >termes</Text> et{' '}
                        <Text style={styles.link} >conditions</Text> régissant notre système.
                    </Text>


                    {/* Retou à l'accueil */}
                    <TouchableOpacity style={[styles.gohome]} >
                        <View>
                            <Text style={styles.titlegohome} onPress={GoToHome} >Retour à l'accueil</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                 

            </View>                
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root:{
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
    },

    logo: {
        width: '70%',
        maxWidth: 500,
        maxHeight: 300,
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        margin: 10,
    },

    titleprincipal: {

        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFCC33',
        margin: 10,
        textDecorationLine:'underline',
    },

    text: {
        textAlign:"center",
        color: 'grey',
        marginVertical: 10,
        fontSize: 15,
        
    },
    link: {
        color: '#FDB075',
    },

    input:{
        width: '100%',
        padding: 10,
        marginVertical: 10,
        marginBottom: 20,
        alignItems: 'center',
        //borderRadius: 50,
        //backgroundColor:"#0033FF",
        borderBottomColor: '#649c15',
        borderStyle:'solid',
        borderBottomWidth: 1,
    },

    input1:{
        width: '100%',
        padding: 10,
        marginVertical: 10,
        marginBottom: 20,
        alignItems: 'center',
        //borderRadius: 50,
        backgroundColor:"red",
        borderBottomColor: '#649c15',
        borderStyle:'solid',
        borderBottomWidth: 1,
        elevation: 30,
    },

    button:{
        width: '60%',
        height:50,
        padding: 5,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor:"#649c15"
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

});


export default RegisterScreen;