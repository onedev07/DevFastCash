const express = require('express');
const bodyParser = require('body-parser');
//const db = require('./config/db')
//const cors = require('cors')

const app = express();


const  PORT = 3002;

var mysql = require('mysql');

//const authRoutes = require('../routes/authRoutes')
// app.use(cors());
app.use(express.json())

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));
//app.use(authRoutes)


//Connexion à la Base de données
var db = mysql.createConnection({
    host: "91.216.107.184",
    user: "ephey1699662_1sgjq6",
    password: "pnceeovfaw",
    database:"ephey1699662_1sgjq6"
  
    /* host: "localhost",
    user: "root",
    password: "",
    database:"epheynix_db" */
    });
  
  db.connect(function(err) {
    if (err);
    console.log("Connecté Wahou!");
  });





//***********************DEBUT REQUETES_ADHERENTS********************************************

// Route for signup
app.post('/adherent_signup', (req,res)=> {

var code_adherent = req.body.code_adherent;
var photo = req.body.photo;
var nom = req.body.nom;
var prenom = req.body.prenom;
var cel = req.body.cel;
var tel = req.body.tel;
var email = req.body.email;
var psswd = req.body.psswd;
var bp = req.body.bp;
var adresse = req.body.adresse;
var country_id = req.body.country_id;
var ville_id = req.body.ville_id;
var commune_id = req.body.commune_id;



//const {code_adherent, photo, nom, prenom, cel, tel, email, psswd, bp, adresse, country_id, ville_id, commune_id} = req.body;

//console.log(code_adherent, photo, nom, prenom, cel, tel, email, psswd, bp, adresse, country_id, ville_id, commune_id)

db.query("INSERT INTO adherents (code_adherent, photo, nom, prenom, cel, tel, email, psswd, bp, adresse, country_id, ville_id, commune_id) VALUES (code_adherent=?, photo=?, nom=?, prenom=?, cel=?, tel=?, email=?, psswd=?, bp=?, adresse=?, country_id=?, ville_id=?, commune_id=?)",[code_adherent, photo, nom, prenom, cel, tel, email, psswd, bp, adresse, country_id, ville_id, commune_id], (err,result)=>{
   if(err) {
       console.log(err)
   }
   else{
    console.log(result)
    res.send('Hello')
   }
   
}
);



})




// Route for adherent liste
app.get("/adherent_liste", (req,res)=>{
    db.query("SELECT * FROM adherents", (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    }
        );   
    });



//********************FIN REQUETES_ADHERENTS************************************


app.listen(PORT, ()=>{
    console.log('Server is running on ' +PORT)
})