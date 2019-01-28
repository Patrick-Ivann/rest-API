import mysql from 'mysql';

import connexion from '../functions/connexion';
import {
    RECUPERER_TOUTES_LES_PARTICIPATIONS,
    RECUPERER_PARTICIPANT,
    RECUPERER_EVENEMENT_PARTICIPE,
    PARTICIPER_EVENEMENT
} from './requetesSql';
import {
    logToTxt
} from '../functions/functionSheet';

/**
 * @access via token
 * @alias /api/participer/recuperer
 * @param {*} req 
 * @param {*} res 
 */
export const recupererToutesParticipation = (req, res) => {
    var erreurs = {}
    connexion.query(RECUPERER_TOUTES_LES_PARTICIPATIONS, (err, rows, fields) => {
        if (err) {
            erreurs.sql = "ERREUR SQL" + err
            logToTxt(erreurs, "ajout")
            return res.status(400).json(erreurs);
        } else {

            if (rows.length === 1) {
                return res.json(rows[0]);
            } else {


                return res.json(rows);
            }

        }
    });
};

/**
 * @access via token
 * @alias /api/participer/recuperer/utilisateur/:id([0-9]*)
 * @param {*} req 
 * @param {*} res 
 */
export const recupererUilisateurParticipant = (req, res) => {

    var erreurs = {}


    connexion.query(RECUPERER_PARTICIPANT, req.params.id, (err, rows, fields) => {

        if (err) {
            erreurs.sql = "ERREUR SQL" + err
            logToTxt(erreurs, "ajout")
            return res.status(400).json(erreurs);
        } else {

            if (rows.length === 1) {
                return res.json(rows[0]);
            } else {


                return res.json(rows);
            }

        }

    });
};

/**
 * @access protected 
 * @alias /api/participer/recuperer/event/:id([0-9]*)
 * @param {Object} req object represents the HTTP request and has properties for the request query string, parameters, body,headers
 * @param {number} req.params.id id of an event 
 * @param {*} res object used to answer the query
 * @returns {Object[] | Object} rows - an array of object or an object id_user,prenom,nom,adresse_mail  
 */
export const recupererEvenementParticipe = (req, res) => {

    var erreurs = {}
    connexion.query(RECUPERER_EVENEMENT_PARTICIPE, req.params.id, (err, rows, fields) => {

        if (err) {
            erreurs.sql = "ERREUR SQL" + err
            logToTxt(erreurs, "récupération")
            console.log(erreurs);
            return res.status(400).json(erreurs);
        } else {


            if (rows.length === 1) {
                return res.json(rows[0]);
            } else {
                /*
                [RowDataPacket {
                        id_user: 10
                    },
                    RowDataPacket {
                        id_user: 13
                    },
                    RowDataPacket {
                        id_user: 15
                    }
                ] 
                */
                console.log(rows)
                return res.json(rows);
            }
        }
    });
};


export const ajouterParticiper = (req, res) => {


    const obj = Object.keys(req.body)[0]


    console.log("object")


    const erreurs = {}







    var formulaire = {}


    for (var key in JSON.parse(obj)) {

        if (JSON.parse(obj).hasOwnProperty(key)) {

            formulaire[key] = JSON.parse(obj)[key]

        }

    }


    connexion.query(PARTICIPER_EVENEMENT, [formulaire.id_user, formulaire.id_event], (err, rows, fields) => {

        if (err) {
            erreurs.sql = "ERREUR SQL" + err
            logToTxt(erreurs, "ajout")
            return res.status(400).json(erreurs);
        }

        return res.json(rows);

    })



}