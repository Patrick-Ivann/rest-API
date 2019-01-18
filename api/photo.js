import mysql from 'mysql'
import {
    RECUPERE_TOUTES_LES_PHOTOS,
    RECUPERE_PHOTO_PAR_ID,
    AJOUTER_PHOTO
} from "./requetesSql";
import {
    validePhotoInput
} from '../validation/validationInput';

import moment from 'moment'

const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'root',
    database: "projet_web"
});

export const recupererToutesLesPhotos = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERE_TOUTES_LES_PHOTOS, (err, rows, fields) => {


        return res.json(rows);

    })


}

export const recupererPhotoParId = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERE_PHOTO_PAR_ID, req.params.id, (err, rows, fields) => {


        return res.json(rows);

    })


}


export const ajouterPhoto = (req, res) => {


    const {
        erreurs,
        estValide
    } = validePhotoInput(req.body);



    if (!estValide) {



        return res.status(400).json(erreurs);

    } else {

        const photo = {}

        for (var key in req.body) {

            if (JSON.parse(JSON.stringify(req.body)).hasOwnProperty(key)) {

                photo[key] = req.body[key]
            }

        }
        /**
         * TODO ajouter la fonction de téléversement du fichier photo en lui meme 
         * !ajouter dépendance pour avoir l'objet file
         * 
         */

        photo["date_creation_photo"] = moment().format('YYYY/MM/D hh:mm:ss SSS')


        connexion.query(AJOUTER_PHOTO, photo, (err, rows, fields) => {

            if (err) {

                return res.status(404).json(err);

            } else {

                return res.json(rows);

            }
        })


    }
}