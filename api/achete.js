import mysql from 'mysql';
import {
    PUBLIER_UN_ACHAT,
    RECUPERER_ACHETEUR,
    RECUPERER_PRODUIT,
    RECUPERER_TOUT_ACHAT
} from "./requête_sql";

const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bdd_api"
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

export const publierUnAchat = (req,res) =>{

    var values = Object.values(req.body);

    connexion.query(PUBLIER_UN_ACHAT, values ,(err,rows,fields) =>{
        return res.json(rows);
    });
};
