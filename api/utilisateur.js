import mysql from 'mysql';
import {
    RECUPERER_TOUS_LES_UTILISATEURS,
    RECUPERER_UTILISATEURS_PAR_ID,
    RECUPERER_UTILISATEURS_PAR_MAIL
} from './requête_sql';

const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "awakose2531",
    database: "bdd_api"
});

export const recupererTousLesUtilisateur = (req,res) =>{

    connexion.query(RECUPERER_TOUS_LES_UTILISATEURS,(err,rows,fields) =>{

        return res.json(rows);
    });


};

export const recupererUtilisateurParId = (req,res) =>{

    connexion.query(RECUPERER_UTILISATEURS_PAR_ID, req.params.id,(err,rows,fields) =>{

        return res.json(rows);
    });

};

export const recupererUtilisateurParMail = (req,res) =>{

    connexion.query(RECUPERER_UTILISATEURS_PAR_MAIL, req.params.mail,(err,rows,fields) =>{
        return res.json(rows);
    });

};
