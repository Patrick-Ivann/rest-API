import mysql from 'mysql';
import {RECUPERER_ACHETEUR, RECUPERER_PRODUIT, RECUPERER_TOUT_ACHAT} from "./requête_sql";

const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "awakose2531",
    database: "bdd_api2"
});


export const recupererAchat = (req,res) =>{

    connexion.query(RECUPERER_TOUT_ACHAT ,(err,rows,fields) =>{
        return res.json(rows);
    });
};

export const recupererAcheteur = (req,res) =>{

    connexion.query(RECUPERER_ACHETEUR, req.params.id ,(err,rows,fields) =>{
        return res.json(rows);
    });
};

export const recupererProduit = (req,res) =>{

    connexion.query(RECUPERER_PRODUIT, req.params.id ,(err,rows,fields) =>{
        return res.json(rows);
    });
};

