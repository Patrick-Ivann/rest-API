import connexion from '../functions/connexion';
import {
    RECUPERER_TOUTES_LES_NOTIFS,
    RECUPERER_IDEE_NOTIF,
    RECUPERER_UTILISATEUR_NOTIF,
    PUBLIER_UN_UTILISATEUR_A_NOTIFIE
} from './requetesSql';
import {
    logToTxt
} from '../functions/functionSheet';


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

    const obj = Object.keys(req.body)[0]



    const notifie = {}

    const erreurs = {}
    for (var key in JSON.parse(obj)) {

        if (JSON.parse(obj).hasOwnProperty(key)) {
            notifie[key] = JSON.parse(obj)[key]
        }
    }





    connexion.query(PUBLIER_UN_UTILISATEUR_A_NOTIFIE, [notifie.id_event_idee, notifie.id_user], (err, rows, fields) => {

        if (err) {
            console.log(err);
            erreurs.sql = err
            logToTxt(erreurs, "ajout")
        }


        return res.json(rows);
    });
};