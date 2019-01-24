import moment from 'moment';
import {

    CONNEXION_UTILISATEUR,
    RECUPERER_TOUS_LES_UTILISATEURS,
    RECUPERER_UTILISATEUR_PAR_ID,
    RECUPERER_UTILISATEUR_PAR_MAIL
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




export const recupererTousLesUtilisateur = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERER_TOUS_LES_UTILISATEURS, (err, rows, fields) => {

        if (err) {

            erreur.sql = "une erreur coté SQL vient d'arriver"

            return res.status(404).json(erreur);
        }

        if (rows === []) {

            erreur.bddVide = "Il n'y a aucun utilisateur à afficher."
            return res.status(404).json(erreur);
        }
        if (rows.length === 1) {
            return res.json(rows[0]);
        } else {


            return res.json(rows);
        }

    })


}

export const recupererUtilisateurParId = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERER_UTILISATEUR_PAR_ID, req.params.id, (err, rows, fields) => {


        if (rows.length === 1) {
            return res.json(rows[0]);
        } else {


            return res.json(rows);
        }
    });


};



export const recupererUtilisateurParMail = (req, res) => {

    connexion.query(RECUPERER_UTILISATEUR_PAR_MAIL, req.params.mail, (err, rows, fields) => {
        if (rows.length === 1) {
            return res.json(rows[0]);
        } else {


            return res.json(rows);
        }
    });




}


export const ajouterAvatar = (req, res) => {

    var formulaire = {}
    var fichier = {}


    new formidable.IncomingForm().parse(req)


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
        .on('fileBegin', function (name, file) {

            console.log("ligne 158" + name);
            let extension = file.name.split(".")
            console.log(extension[1]);

            file.path = path.join(__dirname, '../photos/avatar') + file.name;

            console.log("filepath ligne 76" + file.path)

            fichier.path = file.path
            fichier.name = file.name

        })
        .on('error', function (err) {
            console.log(err);
        })
        .on('end', function () {

            console.log(formulaire);
            console.log(fichier)
            ajouterAvatarBdd(formulaire, fichier)

        });



    // connexion.query(AJOUTER_AVATAR, )
}


export const ajouterAvatarBdd = (formulaire, fichier) => {

    obj = Object.assign({}, formulaire, fichier)

    console.log(obj);


}





export const connexionUtilisateur = (req, res) => {


    const obj = Object.keys(req.body)[0]




    const {
        erreurs,
        estValide
    } = valideConnexionInput(JSON.parse(obj));



    if (!estValide) {



        return res.status(400).json(erreurs);

    } else {


        var formulaire = {}


        for (var key in JSON.parse(obj)) {

            if (JSON.parse(obj).hasOwnProperty(key)) {

                formulaire[key] = JSON.parse(obj)[key]

            }

        }



        const email = JSON.parse(obj).adresse_mail;





        connexion.query(CONNEXION_UTILISATEUR, email, (err, rows, fields) => {

            if (err) {

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


        utilisateur["date_creation_user"] = moment().format('YYYY/MM/D hh:mm:ss SSS')
        utilisateur["rang"] = 0;
        utilisateur["url_avatar"] = "null"



        connexion.query(AJOUTER_UTILISATEUR, [utilisateur.prenom, utilisateur.nom, utilisateur.rang, utilisateur.adresse_mail, utilisateur.mot_de_passe, utilisateur.date_creation_user, utilisateur.url_avatar, utilisateur.lieu], (err, rows, fields) => {

            if (err) {
                return res.status(404).json(err);
            }

            return res.json(rows);
        })

    }
}