import connexion from '../functions/connexion';
import {
    RECUPERER_TOUS_LES_LIEUX,
    RECUPERER_LIEU_PAR_ID
} from "./requetesSql";

/**
 * @VERB GET
 * @description recover all the places
 * @access public
 * @alias /api/lieu/recuperer
 * @param {Object} req 
 * @param {Object} res 
 */
export const recupererTousLesLieux = (req, res) => {

    connexion.query(RECUPERER_TOUS_LES_LIEUX, (err, rows, fields) => {
        return res.json(rows);
    });
};

/**
 * @VERB GET
 * @description recover a place by an ID
 * @access public
 * @alias /api/lieu/recuperer/:id([0-9]9)
 * @param {Object} req 
 * @param {Object} res 
 */
export const recupererLieuParId = (req, res) => {

    connexion.query(RECUPERER_LIEU_PAR_ID, req.params.id, (err, rows, fields) => {
        return res.json(rows);
    });
};