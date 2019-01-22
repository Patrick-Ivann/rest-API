import connexion from '../functions/connexion';
import {
    RECUPERER_TOUTES_LES_NOTIFS,
    RECUPERER_IDEE_NOTIF,
    RECUPERER_UTILISATEUR_NOTIF,
    PUBLIER_UN_UTILISATEUR_A_NOTIFIE
} from './requetesSql';


/**
 * @access free
 * @alias /api/notifie/recuperer
 * @param {*} req 
 * @param {*} res 
 */
export const recupererToutesLesNotifS = (req, res) => {

    connexion.query(RECUPERER_TOUTES_LES_NOTIFS, (err, rows, fields) => {
        return res.json(rows);
    });
};

/**
 * @access free
 * @alias /api/notifie/recuperer/idee/:id([0-9]*)
 * @param {*} req 
 * @param {*} res 
 */
export const recupererIdeeNotif = (req, res) => {

    connexion.query(RECUPERER_IDEE_NOTIF, req.params.id, (err, rows, fields) => {
        return res.json(rows);
    });
};


/**
 * @access
 * @alias /api/notifie/recuperer/utilisateur/:id([0-9]*)
 * @param {*} req 
 * @param {*} res 
 */
export const recupererUtilisateurNotif = (req, res) => {

    connexion.query(RECUPERER_UTILISATEUR_NOTIF, req.params.id, (err, rows, fields) => {
        return res.json(rows);
    });
};

/**
 * @access
 * @alias /api/notifie/ajouter
 * @param {*} req 
 * @param {*} res 
 */
export const publierUnUtilisateurANotifie = (req, res) => {

    var values = Object.values(req.body);

    connexion.query(PUBLIER_UN_UTILISATEUR_A_NOTIFIE, values, (err, rows, fields) => {
        return res.json(rows);
    });
};