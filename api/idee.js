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
 * @VERB GET
 * @description recover all the ideas
 * @access public
 * @alias /api/idee/recuperer
 * @param {Object} req 
 * @param {Object} res 
 */
export const recupererToutesLesIdee = (req, res) => {

    connexion.query(RECUPERER_TOUTES_LES_IDEES, (err, rows, fields) => {
        return res.json(rows);
    });
};

/**
 * @VERB GET
 * @description recover an idea by ID 
 * @access public
 * @alias /api/idee/recuperer/:id([0-9]*)
 * @param {Object} req 
 * @param {Object} res 
 */
export const recupererIdeeParId = (req, res) => {

    connexion.query(RECUPERER_IDEE_PAR_ID, req.params.id, (err, rows, fields) => {
        return res.json(rows);
    });
};


/**
 * @VERB POST
 * @description add an idea
 * @access public
 * @alias /api/idee/rajouter
 * @param {Object} req 
 * @param {Object} res 
 */
export const ajouterIdee = (req, res) => {

    const obj = Object.keys(req.body)[0]



    /*obj is the stringified version of our body 
    {
         "nom_idee": "une nouvelle id\u00e9e",
         "description_idee": "on va faire ceci",
         "lieu": "tls"
     }*/

    /* req.body should contain every field of the form sent by symfony filled up the user 
        when he create an idea
    /* [Object: null prototype] {
         '{"nom_idee":"une nouvelle id\\u00e9e","description_idee":"on va faire ceci","lieu":"tls"}': ''
     }*/


    const {
        erreurs,
        estValide
    } = valideIdeeInput(JSON.parse(obj)); // testing inside 

    if (!estValide) {
        return res.json(erreurs); // if the "estValide" variable is not declared or true then we throw an error
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