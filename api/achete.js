import connexion from '../functions/connexion'
import {
    RECUPERER_TOUS_LES_ACHATS,
    RECUPERER_ACHETEUR,
    RECUPERER_PRODUIT,
    PUBLIER_UN_ACHAT
} from './requetesSql';



/**
 * @access
 * @alias /api/achete/recuperer
 * @param {*} req 
 * @param {*} res 
 */
export const recupererAchats = (req, res) => {

    connexion.query(RECUPERER_TOUS_LES_ACHATS, (err, rows, fields) => {
        return res.json(rows);
    });
};


/**
 * @access
 * @alias /api/achete/recuperer
 * @param {*} req 
 * @param {*} res 
 */
export const recupererAcheteur = (req, res) => {

    connexion.query(RECUPERER_ACHETEUR, req.params.id, (err, rows, fields) => {
        return res.json(rows);
    });
};


/**
 * @access free
 * @alias /api/achete/recuperer/:id([0-9])
 * @param {*} req 
 * @param {*} res 
 */
export const recupererProduit = (req, res) => {

    connexion.query(RECUPERER_PRODUIT, req.params.id, (err, rows, fields) => {
        return res.json(rows);
    });
};


/**
 * @access via token
 * @alias /api/achete/rajouter
 * @param {*} req 
 * @param {*} res 
 */
export const publierUnAchat = (req, res) => {

    var values = Object.values(req.body);

    connexion.query(PUBLIER_UN_ACHAT, values, (err, rows, fields) => {
        return res.json(rows);
    });
};