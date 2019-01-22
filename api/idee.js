import connexion from '../functions/connexion';
import {
    AJOUTER_IDEE
} from "./procedures_sql";
import {
    valideIdeeInput
} from "../validation/validationInput";

import moment from 'moment'
import {
    RECUPERER_TOUTES_LES_IDEES,
    RECUPERER_IDEE_PAR_ID
} from './requetesSql';

/**
 * @access free
 * @alias /api/idee/recuperer
 * @param {*} req 
 * @param {*} res 
 */
export const recupererToutesLesIdee = (req, res) => {

    connexion.query(RECUPERER_TOUTES_LES_IDEES, (err, rows, fields) => {
        return res.json(rows);
    });
};

/**
 * @access free
 * @alias /api/idee/recuperer/:id([0-9]*)
 * @param {*} req 
 * @param {*} res 
 */
export const recupererIdeeParId = (req, res) => {

    connexion.query(RECUPERER_IDEE_PAR_ID, req.params.id, (err, rows, fields) => {
        return res.json(rows);
    });
};


/**
 * @access via token
 * @alias /api/idee/rajouter
 * @param {*} req 
 * @param {*} res 
 */
export const ajouterIdee = (req, res) => {

    const obj = Object.keys(req.body)[0]

    const {
        erreurs,
        estValide
    } = valideIdeeInput(JSON.parse(obj));

    if (!estValide) {
        return res.json(erreurs);
    }



    const idee = {}

    for (var key in JSON.parse(obj)) {

        if (JSON.parse(obj).hasOwnProperty(key)) {

            idee[key] = JSON.parse(obj)[key]
        }

    }

    idee["date_creation_idee"] = moment().format('YYYY/MM/D hh:mm:ss SSS')

    connexion.query(AJOUTER_IDEE, [idee.nom_idee, idee.description_idee, idee.date_creation_idee, idee.id_user, idee.lieu], (err, rows, fields) => {

        if (err) {
            return res.status(404).json(err);
        }


        return res.json(rows);

    })
};