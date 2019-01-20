import {
    RECUPERE_TOUS_LES_EVENEMENTS,
    RECUPERE_EVENEMENT_PAR_ID,
    AJOUTER_EVENEMENT
} from "./requetesSql";
import mysql from 'mysql';
import moment from 'moment';
import {
    valideEvenementInput
} from "../validation/validationInput";



const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "awakose2531",
    database: "bdd_api2"
});

export const recupererToutLesEvenements = (req, res) => {

    connexion.query(RECUPERER_TOUT_LES_EVENEMENTS, (err, rows, fields) => {
        return res.json(rows);
    });
};

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
    });


}

export const recupererEvenementParLieu = (req, res) => {


}

/* export const ajouterEvenement = (req, res) => {


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
/*  evenement["date_creation_event"] = moment().format('YYYY/MM/D hh:mm:ss SSS')


        connexion.query(AJOUTER_EVENEMENT, evenement, (err, rows, field) => {

            res.json(rows);
        })
    }

}
 */

/**
 * todo il manque la fonction de vérification des input évenement
 * @param {*} req 
 * @param {*} res 
 */
export const ajouterEvenement = (req, res) => {


    const evenement = {}

    for (var key in req.body) {

        if (JSON.parse(JSON.stringify(req.body)).hasOwnProperty(key)) {

            evenement[key] = req.body[key]
        }

    }

    evenement["date_creation_event"] = moment().format('YYYY/MM/D hh:mm:ss SSS')


    let sql = "call ajouterEvenement(?,?,?,?,?)"
    connexion.query(sql, [evenement.nom_event, evenement.date_debut_event, evenement.date_fin_event, evenement.date_creation_event, evenement.lieu], (err, rows, field) => {

        if (err) {
            res.status(404).json(err);
        }
        res.json(rows);
    })
}


/*
connexion.query(RECUPERER_EVENEMENTS_PAR_LIEU, req.params.lieu, (err, rows, fields) => {
    return res.json(rows);
});
};

*/