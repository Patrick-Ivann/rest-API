import connexion from '../functions/connexion';
import {
    RECUPERER_TOUS_LES_LIEUX,
    RECUPERER_LIEU_PAR_ID
} from "./requetesSql";

/**
 * @access
 * @alias /api/lieu/recuperer
 * @param {*} req 
 * @param {*} res 
 */
export const recupererTousLesLieux = (req, res) => {

    connexion.query(RECUPERER_TOUS_LES_LIEUX, (err, rows, fields) => {
        return res.json(rows);
    });
};

/**
 * @access
 * @alias /api/lieu/recuperer/:id([0-9]9)
 * @param {*} req 
 * @param {*} res 
 */
export const recupererLieuParId = (req, res) => {

    connexion.query(RECUPERER_LIEU_PAR_ID, req.params.id, (err, rows, fields) => {
        return res.json(rows);
    });
};