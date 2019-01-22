import connexion from '../functions/connexion';
import {
    RECUPERER_TOUS_LES_JAIMES,
    RECUPERER_LES_PHOTO_AIMEE,
    RECUPERER_LES_UTILISATEURS_AIMANT,
    PUBLIER_UN_LIKE_SUR_PHOTO
} from './requetesSql';

/**
 * @access free
 * @alias /api/aime/recuperer
 * @param {*} req 
 * @param {*} res 
 */
export const recupererTousLesJaimes = (req, res) => {

    connexion.query(RECUPERER_TOUS_LES_JAIMES, (err, rows, fields) => {
        return res.json(rows);
    });
};

/**
 * @access free
 * @alias /api/aime/recuperer/:id([0-9]*)
 * @param {*} req 
 * @param {*} res 
 */
export const recupererPhotoAimee = (req, res) => {

    connexion.query(RECUPERER_LES_PHOTO_AIMEE, req.params.id, (err, rows, fields) => {
        return res.json(rows);
    });
};

/**
 * @access via token
 * @alias /api/aime/recuperer/:id([0-9]*)
 * @param {*} req 
 * @param {*} res 
 */
export const recupererUtilisateurAimant = (req, res) => {

    connexion.query(RECUPERER_LES_UTILISATEURS_AIMANT, req.params.id, (err, rows, fields) => {
        return res.json(rows);
    });
};

/**
 * @access via token
 * @alias /api/aime/ajouter
 * @param {*} req 
 * @param {*} res 
 */
export const publierUnLikeSurPhoto = (req, res) => {

    var values = Object.values(req.body); //Transforme l'objet JSON en tableau pour l'envoyer en paramètres a la requête sql

    connexion.query(PUBLIER_UN_LIKE_SUR_PHOTO, values, (err, rows, fields) => {
        return res.json(rows);
    });
};