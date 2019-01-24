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








/**
 * @access free
 * @alias /api/evenement/recuperer
 * @param {*} req 
 * @param {*} res 
 */
export const recupererTousLesEvenements = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERER_TOUS_LES_EVENEMENTS, (err, rows, fields) => {


        if (err) {
            console.log(err)
            return res.status(404).json(err);
        }

        if (rows.length === 1) {
            return res.json(rows[0]);
        } else {


            return res.json(rows);
        }



    })



}


/**
 * @access
 * @alias /api/evenement/recuperer/:id([0-9]*)
 * @param {*} req 
 * @param {*} res 
 */
export const recupererEvenementParId = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERER_EVENEMENT_PAR_ID, req.params.id, (err, rows, fields) => {

        if (err) {
            console.log(err);
            return res.status(404).json(err);
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
 * todo il manque la fonction de vérification des input évenement
 * @access via token
 * @alias /api/evenement/ajouter
 * @param {*} req 
 * @param {*} res 
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



    if (evenement.nom_event && evenement.type_event && evenement.prix && evenement.date_debut_event && evenement.date_fin_event && evenement.date_creation_event && evenement.nom_lieu) {


        connexion.query(AJOUTER_EVENEMENT, [evenement.nom_event, evenement.type_event, evenement.prix, evenement.date_debut_event, evenement.date_fin_event, evenement.date_creation_event, evenement.nom_lieu], (err, rows, field) => {

            if (err) {
                erreurs.sql = err
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
 * @access via token
 * @alias /api/evenement/supprimer/:id([0-9]*)
 * @param {*} req 
 * @param {*} res 
 */
export const supprimerEvenement = (req, res) => {


    const erreurs = {}



    connexion.query(RECUPERER_EVENEMENT_PAR_ID, req.params.id, (err, rows, fields) => {

        if (err) {
            erreurs.sql = err
            return res.status(400).json(erreurs);
        }

        if (rows) {


            connexion.query(SUPPRIMER_EVENEMENT_PAR_ID, req.params.id, (err, rows, fields) => {

                if (err) {
                    erreurs.sql = err
                    return res.status(400).json(erreurs);
                }
                if (rows.affectedRows === 0) {

                    erreurs.sql = "L'evenement est déja supprimé"

                }

                return res.json(rows)
            })
        }

    })




};



export const recupererEvenementParLieu = (req, res) => {

    connexion.query(RECUPERER_EVENEMENT_PAR_LIEU, req.params.lieu, (err, rows, fields) => {

        if (err) {
            return res.status(400).json(err);
        }
        return res.json(rows);
    });

};