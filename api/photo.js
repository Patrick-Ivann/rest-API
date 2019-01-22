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
import formidable from 'formidable';
import connexion from '../functions/connexion';


export const recupererToutesLesPhotos = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERE_TOUTES_LES_PHOTOS, (err, rows, fields) => {


        return res.json(rows);

    })


}

export const recupererPhotoParId = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERE_PHOTO_PAR_ID, req.params.id, (err, rows, fields) => {


        if (err) {

            return res.status(404).json(err);
        }
        return res.json(rows);

    })


}



export const televerserPhoto = (req, res) => {


    var path = require("path")
    const erreurs = {}


    var that = {}


    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {

        that["id_user"] = fields["id_user"]
        that["legende_photo"] = fields["legende_photo"]
        // console.log(fields.id_user);
        ///console.log(files.fichier);

    });

    form.on('field', function (name, value) {

        console.log(name + value);
    });

    form.on('fileBegin', function (name, file) {
        file.path = path.join(__dirname, '../photos/') + file.name;
        //file.name =
        console.log(file.path)
    });

    form.on('aborted', function () {

        console.log("erreur");

        req.resume()
    });

    form.on('error', function (err) {

        console.log(err);

        erreurs.erreurTransfertFichier = "erreur lors du transfert de fichier, veuillez reéssayer ultérieurement.   "
        return res.status(404).json(erreurs);

    })

    console.log(that);

    form.on('file', function (name, file) {
        console.log('Uploaded ' + file.name);

        console.log(that)

        /**
         * TODO faire passer l'id_event,l'id_user, la legende à la bdd
         */


        // rajouterFicherAprosit(file, res)
        //return res.send();

    });

};



export const ajouterPhoto = (req, res) => {


    const obj = Object.keys(req.body)[0]



    const {
        erreurs,
        estValide
    } = validePhotoInput(JSON.parse(obj));



    if (!estValide) {



        return res.status(400).json(erreurs);

    } else {

        const photo = {}

        for (var key in JSON.parse(obj)) {

            if (JSON.parse(obj).hasOwnProperty(key)) {

                photo[key] = JSON.parse(obj)[key]
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