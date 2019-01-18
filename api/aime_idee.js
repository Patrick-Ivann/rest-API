import mysql from 'mysql';
import {
    RECUPERER_EVENT_IDEE_AIME,
    RECUPERER_TOUT_LES_EVENT_IDEE_AIMEE,
    RECUPERER_UTIILISATEUR_AIME_IDEE_EVENT
} from "./requête_sql";


const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "awakose2531",
    database: "bdd_api2"
});

export const recupererToutesLesEventAimee = (req,res) =>{

    connexion.query(RECUPERER_TOUT_LES_EVENT_IDEE_AIMEE,(err,rows,fields) =>{
        return res.json(rows);
    });
};

export const recupererUtilisateurAimeIdeeEvent = (req,res) =>{

    connexion.query(RECUPERER_UTIILISATEUR_AIME_IDEE_EVENT, req.params.id,(err,rows,fields) =>{
        return res.json(rows);
    });
};

export const recupererEventIdeeAime = (req,res) =>{

    connexion.query(RECUPERER_EVENT_IDEE_AIME, req.params.id,(err,rows,fields) =>{
        return res.json(rows);
    });
};