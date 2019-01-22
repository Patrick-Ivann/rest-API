import mysql from 'mysql';

import connexion from '../functions/connexion';
import {
    RECUPERER_TOUTES_LES_PARTICIPATIONS,
    RECUPERER_PARTICIPANT,
    RECUPERER_EVENEMENT_PARTICIPE
} from './requetesSql';

/**
 * @access
 * @alias /api/participer/recuperer
 * @param {*} req 
 * @param {*} res 
 */
export const recupererToutesParticipation = (req, res) => {

    connexion.query(RECUPERER_TOUTES_LES_PARTICIPATIONS, (err, rows, fields) => {
        return res.json(rows);
    });
};

/**
 * @access
 * @alias /api/participer/recuperer/utilisateur/:id([0-9]*)
 * @param {*} req 
 * @param {*} res 
 */
export const recupererUilisateurParticipant = (req, res) => {

    connexion.query(RECUPERER_PARTICIPANT, req.params.id, (err, rows, fields) => {
        return res.json(rows);
    });
};

/**
 * @access
 * @alias /api/participer/recuperer/event/:id([0-9]*)
 * @param {*} req 
 * @param {*} res 
 */
export const recupererEvenementParticipe = (req, res) => {

    connexion.query(RECUPERER_EVENEMENT_PARTICIPE, req.params.id, (err, rows, fields) => {
        return res.json(rows);
    });
};