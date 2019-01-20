import mysql from 'mysql';
import {
    RECUPERER_LES_UTILISATEURS_AIMANT,
    RECUPERER_TOUT_LES_JAIME,
    RECUPERER_LES_PHOTO_AIMEE, PUBLIER_UN_LIKE_SUR_PHOTO
} from "./requête_sql";


const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bdd_api"
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

export const publierUnLikeSurPhoto = (req,res) =>{

    var values = Object.values(req.body); //Transforme l'objet JSON en tableau pour l'envoyer en paramètres a la requête sql

    connexion.query(PUBLIER_UN_LIKE_SUR_PHOTO, values ,(err,rows,fields) =>{
        return res.json(rows);
    });
};