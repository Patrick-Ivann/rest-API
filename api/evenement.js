import mysql from 'mysql';
import {RECUPERER_EVENEMENTS_PAR_ID, RECUPERER_EVENEMENTS_PAR_LIEU, RECUPERER_TOUT_LES_EVENEMENTS} from "./requête_sql";

const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "awakose2531",
    database: "bdd_api"
});

export const recupererToutLesEvenements = (req,res) =>{

    connexion.query(RECUPERER_TOUT_LES_EVENEMENTS,(err,rows,fields) =>{
        return res.json(rows);
    });
};

export const recupererEvenementParId = (req,res) =>{

    connexion.query(RECUPERER_EVENEMENTS_PAR_ID, req.params.id,(err,rows,fields) =>{
        return res.json(rows);
    });
};

export const recupererEvenementParLieu = (req,res) =>{

    connexion.query(RECUPERER_EVENEMENTS_PAR_LIEU, req.params.lieu,(err,rows,fields) =>{
        return res.json(rows);
    });
};