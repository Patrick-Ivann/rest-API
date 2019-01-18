import {
    RECUPERE_TOUS_LES_EVENEMENTS,
    RECUPERE_EVENEMENT_PAR_ID,
    AJOUTER_EVENEMENT
} from "./requetesSql";
import mysql from 'mysql';
import {
    valideEvenementInput
} from "../validation/validationInput";



const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'root',
    database: "projet_web"
});



export const recupererTousLesEvenement = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERE_TOUS_LES_EVENEMENTS, (err, rows, fields) => {


        return res.json(rows);

    })



}



export const recupererEvenementParId = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERE_EVENEMENT_PAR_ID, req.params.id, (err, rows, fields) => {


        return res.json(rows);

    })


}

export const ajouterEvenement = (req, res) => {


    const {
        erreurs,
        estValide
    } = valideEvenementInput(req.body);





    if (!estValide) {



        return res.status(400).json(erreurs);

    } else {

        const evenement = {}

        for (var key in req.body) {

            if (JSON.parse(JSON.stringify(req.body)).hasOwnProperty(key)) {

                evenement[key] = req.body[key]
            }

        }

        /**
         * TODO les dates dedebut et de fin d'event sont a recevoir depuis le req.body et a formater via moment
         */
        // evenement["date_debut_event"] = moment().format('YYYY/MM/D hh:mm:ss SSS')
        // evenement["date_fin_event"] = moment().format('YYYY/MM/D hh:mm:ss SSS')
        evenement["date_creation_event"] = moment().format('YYYY/MM/D hh:mm:ss SSS')


        connexion.query(AJOUTER_EVENEMENT, evenement, (err, rows, field) => {

            res.json(rows);
        })
    }

}