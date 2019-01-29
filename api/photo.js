import archiver from 'archiver';
import formidable from 'formidable';
import {
    createWriteStream,
    readdirSync
} from 'fs';
import moment from 'moment';
import path from 'path';
import connexion from '../functions/connexion';
import {
    logToTxt
} from "../functions/functionSheet";
import {
    validePhotoInput
} from '../validation/validationInput';
import {
    AJOUTER_PHOTO,
    RECUPERER_PHOTO_PAR_ID,
    RECUPERER_PHOTO_PAR_ID_EVENEMENT,
    RECUPERER_TOUTES_LES_PHOTOS
} from "./requetesSql";







/**
 * @VERB GET
 * @description recover all the pics
 * @access public
 * @alias /api/photo/recuperer
 * @param {Object} req 
 * @param {Object} res 
 */
export const recupererToutesLesPhotos = (req, res) => {

    const erreurs = {}

    connexion.query(RECUPERER_TOUTES_LES_PHOTOS, (err, rows, fields) => {

        if (err) {
            erreurs.sql = "erreur avec la base de donnée SQL" + err
            return res.status(404).json(erreurs);
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
 * @access public
 * @description recover pics by ID
 * @alias /api/photo/recuperer/:id([0-9]*)
 * @param {Object} req 
 * @param {Object} res 
 */
export const recupererPhotoParId = (req, res) => {

    const erreurs = {}

    connexion.query(RECUPERER_PHOTO_PAR_ID, req.params.id, (err, rows, fields) => {


        if (err) {
            erreurs.sql = "erreur avec la base de donnée SQL" + err
            return res.status(404).json(err);
        }
        return res.json(rows[0]);

    })


}

/**
 * @VERB GET
 * @description recover pics by ID events
 * @access public
 * @alias /recuperer/evenement/:id
 * @param {Object} req 
 * @param {Object} res 
 */
export const recupererPhotoParIdEvenement = (req, res) => {


    const erreurs = {}

    connexion.query(RECUPERER_PHOTO_PAR_ID_EVENEMENT, req.params.id, (err, rows, fields) => {

        if (err) {
            erreurs.sql = "erreur avec la base de donnée SQL" + err
            console.log(err);
            return res.status(404).json(erreurs);
        }

        if (rows.length === 1) {
            return res.json(rows[0]);
        } else {


            return res.json(rows);
        }


    })
};



/**
 * @VERB POST
 * @description add a new pics 
 * @access protected
 * @alias /api/photo/ajouter
 * @param {Object} req 
 * @param {Object} res 
 */
export const televerserPhoto = (req, res) => {


    var path = require("path")
    const erreurs = {}


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

                const {
                    erreurs,
                    estValide
                } = validePhotoInput(JSON.parse(field));



                if (!estValide) {



                    return res.status(400).json(erreurs);

                }
            }


        })
        .on('fileBegin', function (name, file) {

            console.log("ligne 158" + name);
            let extension = file.name.split(".")
            console.log(extension[1]);

            file.name = file['name'].replace(/\s+/g, "-");


            fichier.name = `Photo_${file.name}`
            file.name = fichier.name
            file.path = path.join(__dirname, '../photos/') + file.name;
            fichier.url_photo = file.name


        })
        .on('error', function (err) {
            console.log(err);
        })
        .on('end', function () {

            console.log(formulaire);
            console.log(fichier)

            res.send(ajouterPhoto(formulaire, fichier))


            //res.end();
        });

};


/**
 * @description add a pics for upload pics
 * @access private
 * @param {Object} formulaire 
 * @param {Object} fichier 
 */
export const ajouterPhoto = (formulaire, fichier) => {

    console.log(formulaire)
    var obj = {}

    obj.url_photo = fichier.url_photo
    obj.legende_photo = formulaire.legende_photo
    obj.id_user = formulaire.id_user
    obj.id_event = formulaire.id_event

    obj["date_creation_photo"] = moment().format('YYYY/MM/D hh:mm:ss SSS')

    console.log(obj);


    connexion.query(AJOUTER_PHOTO, obj, (err, rows, fields) => {

        if (err) {

            return err;

        } else {

            return rows;

        }
    })



}


/**
 * 
 * @VERB
 * @alias
 * @access
 * @param {Object} req 
 * @param {Object} res 
 */
export const telechargerToutesLesPhotos = (req, res) => {


    let dirIn = path.join(__dirname, "..", "/photos - Copie")
    let dirIn2 = path.join(__dirname, "..", "/photos")
    let dirOut = path.join(__dirname, ".." + "/photos/photoBDE.zip")

    var archive = archiver('zip')

    let sortie = createWriteStream(dirOut)
    /*    let archive = archiver('zip', {
            zlib: {
                level: 9
            }
        })
        */


    archive.pipe(sortie);

    archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
            logToTxt("le fichier n'existe pas", "fichiers")
        } else {
            console.log(err)
            logToTxt(err, "fichiers")
            return res.status(404).json(err);
        }
    });

    archive.on('error', function (err) {
        console.log(err)
        logToTxt(err, "fichiers")
        return res.status(404).json(err);
    });

    sortie.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
        res.download(dirOut)

    });


    var filesz = {}
    var filesC = []


    var file1 = __dirname + '/photos/Produit_clementine.png';

    var file2 = __dirname + '/photos';


    var arr = []

    var files = readdirSync(dirIn2);

    files.forEach(file => {

        if (file.split("_")[0] === "Photo") {


            arr.push(file);

            archive.append(__dirname + "/" + file, {
                name: file
            })

        }
    });

    console.log(arr);




    archive.finalize(function (err, bytes) {
        if (err) {

            console.log(err);

        }

        console.log(bytes + ' total bytes');
    });

    //console.log(files)


    /*files.forEach(file => {
        archive.file(file, {
            name: file
        });
        
    });
    */







    //console.log(filesC)








}



/**
 * TODO LIKER PHOTO 
 */