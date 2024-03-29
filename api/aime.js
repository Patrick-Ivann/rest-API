﻿import connexion from '../functions/connexion';
import {
    RECUPERER_TOUS_LES_JAIMES,
    RECUPERER_LES_PHOTO_AIMEE,
    RECUPERER_LES_UTILISATEURS_AIMANT,
    PUBLIER_UN_LIKE_SUR_PHOTO
} from './requetesSql';
import { logToTxt } from '../functions/functionSheet';

/**
 * @VERB GET 
 * @description recover all the likes
 * @access public
 * @alias /api/aime/recuperer/
 * @param {Object} req 
 * @param {Object} res 
 */
export const recupererTousLesJaimes = (req, res) => {

    connexion.query(RECUPERER_TOUS_LES_JAIMES, (err, rows, fields) => {
        if (err) {

            erreurs.sql = "ERREUR SQL" + err
            logToTxt(erreurs, "récupération")

            return res.status(404).json("impossible de récupérer");
        } else {


            return res.json(rows);
        }

    });
};

/**
 * @VERB GET 
 * @description recover liked pics
 * @access public
 * @alias /api/aime/recuperer/:id([0-9]*)
 * @param {Object} req 
 * @param {Object} res 
 */
export const recupererPhotoAimee = (req, res) => {

    connexion.query(RECUPERER_LES_PHOTO_AIMEE, req.params.id, (err, rows, fields) => {

        if (err) {

            erreurs.sql = "ERREUR SQL" + err
            logToTxt(erreurs, "ajout")
            return res.status(404).json("Impossible de récupérer.");
        } else {

            return res.json(rows);

        }

    });
};

/**
 * @VERB GET
 * @description recover all the users who liked
 * @access public
 * @alias /api/aime/recuperer/:id([0-9]*)
 * @param {Object} req 
 * @param {Object} res 
 */
export const recupererUtilisateurAimant = (req, res) => {

    connexion.query(RECUPERER_LES_UTILISATEURS_AIMANT, req.params.id, (err, rows, fields) => {

        if (err) {

            erreurs.sql = "ERREUR SQL" + err
            logToTxt(erreurs, "récupération")
            return res.status(404).json("Impossible de récuperer");
        } else {

            return res.json(rows);
        }

    });
};

/**
 * @VERB POST
 * @description to like a pics
 * @access protected
 * @alias /api/aime/ajouter
 * @param {Object} req 
 * @param {Object} res 
 */
export const publierUnLikeSurPhoto = (req, res) => {

    const obj = Object.keys(req.body)[0]


    console.log("object");

    let erreurs = {}

    const aime = {}


    for (var key in JSON.parse(obj)) {

        if (JSON.parse(obj).hasOwnProperty(key)) {

            aime[key] = JSON.parse(obj)[key]

            console.log(aime);

        }

    }

    connexion.query(PUBLIER_UN_LIKE_SUR_PHOTO, [aime.id_user, aime.id_photo], (err, rows, fields) => {

        if (err) {

            erreurs.sql = "ERREUR SQL" + err
            logToTxt(erreurs, "ajout")
            return res.status(404).json("Vous avez déjà liké");
        }

        return res.json(rows);
    });
};