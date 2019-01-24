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


    const obj = Object.keys(req.body)[0]

    const achat = {}

    for (var key in JSON.parse(obj)) {

        if (JSON.parse(obj).hasOwnProperty(key)) {

            achat[key] = JSON.parse(obj)[key]

            console.log(achat);

        }

    }

    connexion.query(PUBLIER_UN_ACHAT, [achat.id_user, achat.id_produit], (err, rows, fields) => {
        return res.json(rows);
    });
};