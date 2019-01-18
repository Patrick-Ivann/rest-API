import mysql from 'mysql';
import {RECUPERER_IDEE_NOTIF, RECUPERER_TOUTES_LES_NOTIF, RECUPERER_UTILISATEUR_NOTIF} from "./requête_sql";


const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "awakose2531",
    database: "bdd_api2"
});

export const recupererToutesLesNotif = (req,res) =>{

    connexion.query(RECUPERER_TOUTES_LES_NOTIF,(err,rows,fields) =>{
        return res.json(rows);
    });
};

export const recupererIdeeNotif = (req,res) =>{

    connexion.query(RECUPERER_IDEE_NOTIF, req.params.id, (err,rows,fields) =>{
        return res.json(rows);
    });
};

export const recupererUtilisateurNotif = (req,res) =>{

    connexion.query(RECUPERER_UTILISATEUR_NOTIF, req.params.id, (err,rows,fields) =>{
        return res.json(rows);
    });
};