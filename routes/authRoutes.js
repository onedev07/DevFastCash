const express = require('express');

const db = require('../server/config/db')


const router = express.Router();


router.post('/adherent_signup', (req,res)=>{
    console.log(req.body)

    const {code_adherent, photo, nom, prenom, cel, tel, email, psswd, bp, adresse, country_id, ville_id, commune_id} = req.body;
    

    var sql = "INSERT INTO adherents (code_adherent, photo, nom, prenom, cel, tel, email, psswd, bp, adresse, country_id, ville_id, commune_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(sql, function (err, result) {
      if (err);
      console.log("1 record inserted");
    });

    res.send('Hello')
})





module.exports = router