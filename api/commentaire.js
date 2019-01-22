import mysql from 'mysql';

import connexion from '../functions/connexion';
import {
    RECUPERER_COMMENTAIRE_PAR_ID,
    SUPPRIMER_COMMENTAIRE_PAR_ID,
    RECUPERER_TOUS_LES_COMMENTAIRES
} from './requetesSql';


/**
 * @access
 * @alias /api/commentaire/recuperer
 * @param {*} req 
 * @param {*} res 
 */
export const recupererTousLesCommentaire = (req, res) => {

    connexion.query(RECUPERER_TOUS_LES_COMMENTAIRES, (err, rows, fields) => {
        return res.json(rows);
    });
};

/**
 * @access
 * @alias /api/commentaire/recuperer/:id([0-9]*)
 * @param {*} req 
 * @param {*} res 
 */
export const recupererCommentaireParId = (req, res) => {

    connexion.query(RECUPERER_COMMENTAIRE_PAR_ID, req.params.id, (err, rows, fields) => {
        return res.json(rows);
    });
};

/**
 * @access
 * @alias /api/commentaire/supprimer/:id([0-9]*)
 * @param {*} req 
 * @param {*} res 
 */
export const supprimerCommentaireParID = (req, res) => {


    const erreurs = {}


    connexion.query(RECUPERER_COMMENTAIRE_PAR_ID, req.params.id, (err, rows, fields) => {

        if (err) {
            erreurs.sql = err
            return res.status(400).json(erreurs);
        }

        if (rows) {


            connexion.query(SUPPRIMER_COMMENTAIRE_PAR_ID, req.params.id, (err, rows, fields) => {

                if (err) {
                    erreurs.sql = err
                    return res.status(400).json(erreurs);
                }
                if (rows.affectedRows === 0) {

                    erreurs.sql = "L'evenement est déja supprimé"

                }

                return res.json(rows)
            })
        }

    })
};