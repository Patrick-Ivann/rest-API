import mysql from 'mysql';
import {
    RECUPERER_LES_UTILISATEURS_AIMANT,
    RECUPERER_TOUT_LES_JAIME,
    RECUPERER_LES_PHOTO_AIMEE
} from "./requête_sql";


const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "awakose2531",
    database: "bdd_api2"
});

export const recupererToutesLesJaime = (req,res) =>{

    connexion.query(RECUPERER_TOUT_LES_JAIME,(err,rows,fields) =>{
        return res.json(rows);
    });
};

export const recupererPhotoAimee = (req,res) =>{

    connexion.query(RECUPERER_LES_PHOTO_AIMEE, req.params.id ,(err,rows,fields) =>{
        return res.json(rows);
    });
};

export const recupererUtilisateurAimant = (req,res) =>{

    connexion.query(RECUPERER_LES_UTILISATEURS_AIMANT, req.params.id ,(err,rows,fields) =>{
        return res.json(rows);
    });
};