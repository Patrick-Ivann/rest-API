import moment from 'moment';
import connexion from "../functions/connexion";
import {
    valideEvenementInput
} from "../validation/validationInput";
import {
    AJOUTER_EVENEMENT
} from "./procedures_sql";
import {
    RECUPERER_TOUS_LES_EVENEMENTS,
    RECUPERER_EVENEMENT_PAR_LIEU,
    SUPPRIMER_EVENEMENT_PAR_ID,
    RECUPERER_EVENEMENT_PAR_ID,
} from './requetesSql';
import {
    logToTxt
} from '../functions/functionSheet';








/**
 * @VERB GET
 * @description recover all the events
 * @access public
 * @alias /api/evenement/recuperer
 * @param {Object} req 
 * @param {Object} res 
 */
export const recupererTousLesEvenements = (req, res) => {

    const erreurs = {}

    connexion.query(RECUPERER_TOUS_LES_EVENEMENTS, (err, rows, fields) => {


        if (err) {

            erreurs.sql = "ERREUR SQL" + err
            logToTxt(erreurs, "ajout")
            return res.status(404).json("Vous avez déjà acheté Ce produit.");
        }


        if (rows.length === 1) {
            return res.json(rows[0]);
        } else {


            return res.json(rows);
        }



    })



}


/**
 * @VERB GET
 * @description recover an event by ID
 * @access public
 * @alias /api/evenement/recuperer/:id([0-9]*)
 * @param {Object} req 
 * @param {Object} res 
 */
export const recupererEvenementParId = (req, res) => {

    const erreurs = {}

    connexion.query(RECUPERER_EVENEMENT_PAR_ID, req.params.id, (err, rows, fields) => {
        if (err) {

            erreurs.sql = "ERREUR SQL" + err
            logToTxt(erreurs, "ajout")
            return res.status(404).json("Vous avez déjà acheté Ce produit.");
        }





        console.log(rows);

        if (rows.length === 1) {
            return res.json(rows[0]);
        } else {


            return res.json(rows);
        }


    });


}





/**
 * @VERB POST
 * @description add an event
 * todo il manque la fonction de vérification des input évenement
 * @access protected
 * @alias /api/evenement/ajouter
 * @param {Object} req 
 * @param {Object} res 
 */
export const ajouterEvenement = (req, res) => {


    const obj = Object.keys(req.body)[0]

    const {
        erreurs,
        estValide
    } = valideEvenementInput(JSON.parse(obj));

    if (!estValide) {
        return res.json(erreurs);
    }

    const evenement = {}

    for (var key in JSON.parse(obj)) {

        if (JSON.parse(obj).hasOwnProperty(key)) {

            evenement[key] = JSON.parse(obj)[key]

        }

    }

    evenement["date_creation_event"] = moment().format('YYYY/MM/D hh:mm:ss SSS')
    evenement["date_fin_event"] = moment(JSON.parse(obj)["date_fin_event"], "DD/MM/YYYY").format('YYYY/MM/D hh:mm:ss SSS')
    evenement["date_debut_event"] = moment(JSON.parse(obj)["date_debut_event"], "DD/MM/YYYY").format('YYYY/MM/D hh:mm:ss SSS')



    if (evenement.nom_event && evenement.date_debut_event && evenement.date_fin_event && evenement.date_creation_event && evenement.nom_lieu) {


        connexion.query(AJOUTER_EVENEMENT, [evenement.nom_event, evenement.type_event, evenement.prix, evenement.date_debut_event, evenement.date_fin_event, evenement.date_creation_event, evenement.nom_lieu], (err, rows, field) => {

            if (err) {
                erreurs.sql = "ERREUR SQL" + err
                logToTxt(erreurs, "ajout")
                return res.status(404).json(erreurs);
            }
            return res.json(rows);
        })


    } else {
        erreurs.formulaireVide = "Le formulaire a envoyé du vide"
        return res.status(404).json(erreurs);
    }


}

/**
 * @VERB DELETE
 * @description delete an event
 * @access protected
 * @alias /api/evenement/supprimer/:id([0-9]*)
 * @param {Object} req 
 * @param {Object} res 
 */
export const supprimerEvenement = (req, res) => {


    const erreurs = {}



    connexion.query(RECUPERER_EVENEMENT_PAR_ID, req.params.id, (err, rows, fields) => {

        if (err) {
            erreurs.sql = "ERREUR SQL" + err
            logToTxt(erreur, "ajout")
            return res.status(400).json(erreurs);
        }

        if (rows) {


            connexion.query(SUPPRIMER_EVENEMENT_PAR_ID, req.params.id, (err, rows, fields) => {

                if (err) {
                    erreurs.sql = err
                    erreurs.sql = "ERREUR SQL" + err
                    logToTxt(erreurs, "suprression")
                    return res.status(400).json(erreurs);
                }
                if (rows.affectedRows === 0) {

                    erreurs.sql = "L'evenement est déja supprimé"
                    logToTxt(erreurs, "suprression")
                }

                return res.json(rows)
            })
        }

    })




};


/**
 * @VERB GET
 * @description recover an event by a place
 * @access public
 * @alias api/evenement/recuperer/:lieu[a-z]*
 * @param {Object} req 
 * @param {Object} res 
 */

export const recupererEvenementParLieu = (req, res) => {
    let erreurs = {}
    connexion.query(RECUPERER_EVENEMENT_PAR_LIEU, req.params.lieu, (err, rows, fields) => {

        if (err) {
            erreurs.sql = "ERREUR SQL" + err
            logToTxt(erreurs, "récupération")
            return res.status(400).json(err);
        }
        return res.json(rows);
    });

};