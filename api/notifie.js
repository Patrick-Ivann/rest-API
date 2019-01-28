import connexion from '../functions/connexion';
import {
    RECUPERER_TOUTES_LES_NOTIFS,
    RECUPERER_IDEE_NOTIF,
    RECUPERER_UTILISATEUR_NOTIF,
    PUBLIER_UN_UTILISATEUR_A_NOTIFIE
} from './requetesSql';


/**
 * @VERB GET
 * @description recover all the notifications
 * @access public
 * @alias /api/notifie/recuperer
 * @param {Object} req 
 * @param {Object} res 
 */
export const recupererToutesLesNotifS = (req, res) => {

    connexion.query(RECUPERER_TOUTES_LES_NOTIFS, (err, rows, fields) => {
        return res.json(rows);
    });
};

/**
 * @VERB GET
 * @description retrieve a notification when the proposed idea is passed to an event 
 * @access public
 * @alias /api/notifie/recuperer/idee/:id([0-9]*)
 * @param {Object} req 
 * @param {Object} res 
 */
export const recupererIdeeNotif = (req, res) => {

    connexion.query(RECUPERER_IDEE_NOTIF, req.params.id, (err, rows, fields) => {
        return res.json(rows);
    });
};


/**
 * @VERB GET
 * @description recover the user notif
 * @access public
 * @alias /api/notifie/recuperer/utilisateur/:id([0-9]*)
 * @param {Object} req 
 * @param {Object} res 
 */
export const recupererUtilisateurNotif = (req, res) => {

    connexion.query(RECUPERER_UTILISATEUR_NOTIF, req.params.id, (err, rows, fields) => {
        return res.json(rows);
    });
};

/**
 * @VERB POST
 * @description notify a user
 * @alias /api/notifie/ajouter
 * @access protected
 * @param {Object} req 
 * @param {Object} res 
 */
export const publierUnUtilisateurANotifie = (req, res) => {

    var values = Object.values(req.body);

    connexion.query(PUBLIER_UN_UTILISATEUR_A_NOTIFIE, values, (err, rows, fields) => {
        return res.json(rows);
    });
};