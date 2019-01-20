import mysql from 'mysql';
import {RECUPERER_EVENEMENT_PARTICIPE, RECUPERER_PARTICIPANT, RECUPERER_TOUTES_PARTICIPATION} from "./requête_sql";


const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "awakose2531",
    database: "bdd_api2"
});

export const recupererToutesParticipation = (req,res) =>{

    connexion.query(RECUPERER_TOUTES_PARTICIPATION,(err,rows,fields) =>{
        return res.json(rows);
    });
};

export const recupererUilisateurParticipant = (req,res) =>{

    connexion.query(RECUPERER_PARTICIPANT, req.params.id,(err,rows,fields) =>{
        return res.json(rows);
    });
};

export const recupererEvenementParticipe = (req,res) =>{

    connexion.query(RECUPERER_EVENEMENT_PARTICIPE, req.params.id ,(err,rows,fields) =>{
        return res.json(rows);
    });
};