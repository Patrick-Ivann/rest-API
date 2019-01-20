import mysql from 'mysql';
import {
    PUBLIER_UN_UTILISATEUR_A_NOTIFIE,
    RECUPERER_IDEE_NOTIF,
    RECUPERER_TOUTES_LES_NOTIF,
    RECUPERER_UTILISATEUR_NOTIF
} from "./requête_sql";


const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bdd_api"
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

export const publierUnUtilisateurANotifie = (req,res) =>{

    var values = Object.values(req.body);

    connexion.query(PUBLIER_UN_UTILISATEUR_A_NOTIFIE, values ,(err,rows,fields) =>{
        return res.json(rows);
    });
};