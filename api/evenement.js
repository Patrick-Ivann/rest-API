import { RECUPERE_TOUS_LES_EVENEMENTS, RECUPERE_EVENEMENT_PAR_ID } from "./requetesSql";
import mysql from 'mysql';



const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'root',
    database: "projet_web"
});



export const recupererTousLesEvenement = (req,res) => {

     const erreur = {}

     connexion.query(RECUPERE_TOUS_LES_EVENEMENTS, (err, rows, fields) => {


         return res.json(rows);

     })


  
}



export const recupererEvenementParId = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERE_EVENEMENT_PAR_ID, req.params.id, (err, rows, fields) => {


        return res.json(rows);

    })


}