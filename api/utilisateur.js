import moment from 'moment'; // permet de manipuler aisément les dates et de remplacer l'objet natif de javaScript Date
import {

    CONNEXION_UTILISATEUR,
    RECUPERER_TOUS_LES_UTILISATEURS,
    RECUPERER_UTILISATEUR_PAR_ID,
    RECUPERER_UTILISATEUR_PAR_MAIL,
    AJOUTER_AVATAR
} from './requetesSql';

import {
    AJOUTER_UTILISATEUR
} from "./procedures_sql";
import {
    validePhoto,
    valideUtilisateur,
    valideUtilisateurInput,
    valideConnexionInput,


} from '../validation/validationInput';
import connexion from '../functions/connexion';
import {
    logToTxt
} from '../functions/functionSheet';



/**
 * used to retrieve every user stored in the Database
 * @alias /api/utilisateur/recuperer
 * @param {*} req object represents the HTTP request and has properties for the request query string, parameters, body,headers
 * @param {*} res object used to answer the query
 */
export const recupererTousLesUtilisateur = (req, res) => {

    const erreurs = {}

    connexion.query(RECUPERER_TOUS_LES_UTILISATEURS, (err, rows, fields) => {

        if (err) {

            erreurs.sql = "une erreur coté SQL vient d'arriver"
            logToTxt(erreurs, "récupération")
            return res.status(404).json(erreurs);
        }

        if (rows === []) { // if the table "user" is empty

            erreurs.bddVide = "Il n'y a aucun utilisateur à afficher."
            logToTxt(erreurs, "récupération")
            return res.status(404).json(erreurs);
        }
        if (rows.length === 1) { // if we have to return only one object instead of an array of object 
            return res.json(rows[0]);
        } else {


            return res.json(rows); // returning an array of object
        }

    })


}

/**
 * @description used to retrieve one user by his id
 * @alias /recuperer/utilisateur/:id([0-9]*)
 * @param {*} req object represents the HTTP request and has properties for the request query string, parameters, body,headers
 * @param {*} res object used to answer the query
 */
export const recupererUtilisateurParId = (req, res) => {

    const erreurs = {}

    connexion.query(RECUPERER_UTILISATEUR_PAR_ID, req.params.id, (err, rows, fields) => {

        if (err) {

            erreurs.sql = "une erreur coté SQL vient d'arriver"
            logToTxt(erreurs, "récupération")
            return res.status(404).json(erreurs);
        }


        if (rows.length === 1) {
            return res.json(rows[0]);
        } else {
            return res.json(rows);
        }
    });


};


/**
 * VERB GET
 * @description used to retrieve user by their mail
 * @alias /recuperer/utilisateur/:mail([a-z0-9]*@[a-z0-9]*)
 * @param {Object} req object represents the HTTP request and has properties for the request query string, parameters, body,headers
 * @param {Object} res object used to answer the query
 */
export const recupererUtilisateurParMail = (req, res) => {

    const erreurs = {}

    connexion.query(RECUPERER_UTILISATEUR_PAR_MAIL, req.params.mail, (err, rows, fields) => {


        if (err) {

            erreurs.sql = "une erreur coté SQL vient d'arriver"
            logToTxt(erreurs, "récupération")
            return res.status(404).json(erreurs);
        }


        if (rows.length === 1) {
            return res.json(rows[0]);
        } else {


            return res.json(rows);
        }
    });




}

/**
 * VERB PUT
 * @description used to add a picture to their profile
 * @alias /api/utilisateur/ajouter
 * @fires ajouterAvatarBdd
 * @param {Object} req object represents the HTTP request and has properties for the request query string, parameters, body,headers
 * @param {Object} req holding the multipart form 
 * @param {Object} res object used to answer the query
 */
export const ajouterAvatar = (req, res) => {

    var formulaire = {} // unscoped variables available in every event
    var fichier = {}


    new formidable.IncomingForm().parse(req)

        /**
         * triggered when the fields of the form start being processed
         */
        .on('field', function (name, field) {


            console.log('valeur dans field ', field);
            console.log("cle dans field " + name);

            if (name === 'formulaire') {
                JSON.parse(field)

                for (var key in JSON.parse(field)) {

                    if (JSON.parse(field).hasOwnProperty(key)) {

                        formulaire[key] = JSON.parse(field)[key]

                    }

                }

            }


        })



        /**
         * triggered when file start being proccesed
         */
        .on('fileBegin', function (name, file) {

            console.log("ligne 158" + name);
            let extension = file.name.split(".")
            console.log(extension[1]);

            file.name = "Avatar"


            // changing the output file and his path
            file.path = path.join(__dirname, '../photos/avatar') + file.name;


            /** 
             * @var {Object} fichier variable available inside every event and outside
             */
            fichier.path = file.path
            fichier.name = file.name

        })
        .on('error', function (err) {
            //error handling during the processing of the multipart
            console.log(err);
            logToTxt(erreurs, "televersement")
        })

        /**
         * @emits  ajouterAvatarBdd Update the user row with the picture's name  
         */
        .on('end', function () {
            console.log(formulaire);
            console.log(fichier)
            ajouterAvatarBdd(formulaire, fichier)

        });



    // connexion.query(AJOUTER_AVATAR, )
}

/**
 * @description referencing the 
 * 
 * @param {Object} formulaire 
 * @param {Object} fichier 
 */
export const ajouterAvatarBdd = (formulaire, fichier) => {

    obj = Object.assign({}, formulaire, fichier)

    console.log(obj);


    connexion.query(AJOUTER_AVATAR, [fichier.name], (err, rows, fields) => {


        if (err) {
            erreurs.sql = "ERREUR SQL" + err
            logToTxt(erreurs, "récupération")
            console.log(erreurs);
            return res.status(400).json(erreurs);
        } else {

            res.end()
        }
    })


}





export const connexionUtilisateur = (req, res) => {

    /**
     * json_encode 
     */
    const obj = Object.keys(req.body)[0]




    const {
        erreurs,
        estValide
    } = valideConnexionInput(JSON.parse(obj)); // deconstruction et passage de l'objet reçu en fonction de vérification qui retourne un objet d'erreur ou valide



    if (!estValide) { // si valide retourne faut ou n'est pas déclaré alors on arrete tout



        return res.status(400).json(erreurs);

    } else {


        var formulaire = {} // objet qui va contenir toutes les valeurs de champs 


        for (var key in JSON.parse(obj)) { // on itere sur toutes les clés de l'objet 

            if (JSON.parse(obj).hasOwnProperty(key)) { // permet de voir que l'objet qu'on parse contient bien la proriété courante

                formulaire[key] = JSON.parse(obj)[key]

            }

        }



        const email = JSON.parse(obj).adresse_mail;




        /**
         * on cherche tous les utilisateurs qui on l'adressemail entrée par l'utilisateur,  puis on retourne et on teste au niveaud
         * de symfony si le mot de passe convient, on procede ainsi car c'est symfony qui hash le mdp
         */
        connexion.query(CONNEXION_UTILISATEUR, email, (err, rows, fields) => {

            if (err) {
                erreurs.sql = "une erreur coté SQL vient d'arriver"
                logToTxt(erreurs, "récupération")

                return res.status(404).json(err);
            }

            return res.json(rows);




        })








    };

}




/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * TODO reactiver la fonction de vérification des input pour l'ajout utilisateur
 */
export const ajouterUtilisateur = (req, res) => {


    const obj = Object.keys(req.body)[0]


    const {
        erreurs,
        estValide
    } = valideUtilisateurInput(JSON.parse(obj));



    if (!estValide) {



        return res.status(400).json(erreurs);

    } else {

        const utilisateur = {}

        for (var key in JSON.parse(obj)) {

            if (JSON.parse(obj).hasOwnProperty(key)) {

                utilisateur[key] = JSON.parse(obj)[key]
            }

        }

        /*on entre ces valeur par défaut ccar j'ai pas dit ça dans le script SQL*/
        utilisateur["date_creation_user"] = moment().format('YYYY/MM/D hh:mm:ss SSS') //avec moment on donne le format qui correspond à datetime
        utilisateur["rang"] = 0; // 0 - student , 1 - member,  2- CESI employees
        utilisateur["url_avatar"] = "null"



        connexion.query(AJOUTER_UTILISATEUR, [utilisateur.prenom, utilisateur.nom, utilisateur.rang, utilisateur.adresse_mail, utilisateur.mot_de_passe, utilisateur.date_creation_user, utilisateur.url_avatar, utilisateur.lieu], (err, rows, fields) => {

            if (err) {
                erreurs.sql = "une erreur coté SQL vient d'arriver"
                logToTxt(erreurs, "ajout")
                return res.status(404).json(err);
            }

            return res.json(rows);
        })

    }
}