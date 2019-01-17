import mysql from 'mysql';
import { RECUPERE_TOUS_LES_UTILISATEURS, RECUPERE_UTILISATEUR_PAR_ID, RECUPERE_UTILISATEUR_PAR_MAIL } from './requetesSql';

const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'root',
    database: "projet_web"
});

export const recupererTousLesUtilisateur = (req,res) =>{

    const erreur = {}

    connexion.query(RECUPERE_TOUS_LES_UTILISATEURS,(err,rows,fields) =>{


             return res.json(rows);

    })
    

}

export const recupererUtilisateurParId = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERE_UTILISATEUR_PAR_ID, req.params.id ,(err, rows, fields) => {


        return res.json(rows);

    })


}

export const recupererUtilisateurParMail = (req, res) => {

    const erreur = {}

    console.log("mail");

    connexion.query(RECUPERE_UTILISATEUR_PAR_MAIL, req.params.mail, (err, rows, fields) => {


        return res.json(rows);

    })


}