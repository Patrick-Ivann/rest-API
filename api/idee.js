import mysql from 'mysql';
import {RECUPERER_IDEE_PAR_ID, RECUPERER_TOUTES_LES_IDEES} from "./requête_sql";


const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "awakose2531",
    database: "bdd_api"
});


export const recupererToutesLesIdee = (req,res) =>{

    connexion.query(RECUPERER_TOUTES_LES_IDEES,(err,rows,fields) =>{
        return res.json(rows);
    });
};

export const recupererIdeeParId = (req,res) =>{

    connexion.query(RECUPERER_IDEE_PAR_ID, req.params.id ,(err,rows,fields) =>{
        return res.json(rows);
    });
};