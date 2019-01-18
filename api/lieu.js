import mysql from 'mysql';
import {RECUPERER_LIEU_PAR_ID, RECUPERER_TOUTES_LES_LIEU} from "./requête_sql";

const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "awakose2531",
    database: "bdd_api2"
});

export const recupererToutesLesLieu = (req,res) =>{

    connexion.query(RECUPERER_TOUTES_LES_LIEU,(err,rows,fields) =>{
        return res.json(rows);
    });
};

export const recupererLieuParId = (req,res) =>{

    connexion.query(RECUPERER_LIEU_PAR_ID, req.params.id,(err,rows,fields) =>{
        return res.json(rows);
    });
};
