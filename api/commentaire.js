import mysql from 'mysql';
import {RECUPERER_COMMENTAIRE_PAR_ID, RECUPERER_TOUT_LES_COMMENTAIRES} from "./requête_sql";

const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "awakose2531",
    database: "bdd_api"
});


export const recupererTousLesCommentaire = (req,res) =>{

    connexion.query(RECUPERER_TOUT_LES_COMMENTAIRES,(err,rows,fields) =>{
        return res.json(rows);
    });
};

export const recupererCommentaireParId = (req,res) =>{

    connexion.query(RECUPERER_COMMENTAIRE_PAR_ID, req.params.id ,(err,rows,fields) =>{
        return res.json(rows);
    });
};
