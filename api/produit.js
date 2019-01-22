import mysql from 'mysql'
import {
    RECUPERE_TOUS_LES_PRODUITS,
    AJOUTER_PRODUIT
} from "./requetesSql";
import {
    valideProduitInput
} from '../validation/validationInput';


import moment from 'moment';
import formidable from 'formidable'
import connexion from '../functions/connexion';



export const recupererTousLesProduits = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERE_TOUS_LES_PRODUITS, (err, rows, fields) => {


        return res.json(rows);

    })


}

export const recupererProduitParId = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERE_PRODUIT_PAR_ID, req.params.id, (err, rows, fields) => {


        return res.json(rows);

    })




}


export const televerserProduit = (req, res) => {


    var path = require("path")
    const erreurs = {}






    //var form = new formidable.IncomingForm();
    /*form.parse(req, (err, fields, files) => {

        console.log(fields);


        // console.log(fields.id_user);
        ///console.log(files.fichier);

    });

    form.on('field', function (name, value) {

        console.log(name + value);

    });

    form.on('fileBegin', function (name, file) {
        file.path = path.join(__dirname, '../photos/') + file.name;
        //file.name =
        console.log("filepath ligne 76" + file.path)
    });

    form.on('aborted', function (err) {

        console.log("annulé");

        // return res.json("kesta t'annule");

        //req.resume()
    });

    form.on('error', function (err) {

        // console.log(err);

        erreurs.erreurTransfertFichier = "erreur lors du transfert de fichier, veuillez reéssayer ultérieurement.   "
        return res.status(404).json(err);

    })

    form.on('end', function () {


    });


    form.on('file', function (name, file) {
        console.log('Uploaded ' + file.name);


        /**
         * TODO faire passer l'id_event,l'id_user, la legende à la bdd
         


        // rajouterFicherAprosit(file, res)
        //return res.send();

    });*/


    new formidable.IncomingForm().parse(req)
        .on('file', function (name, file) {
            console.log('Got file:', name);
        })
        .on('field', function (name, field) {
            console.log('Got a field:', field[0]);
        })
        .on('error', function (err) {
            console.log(err);
        })
        .on('end', function () {
            res.end();
        });

};


export const ajouterProduit = (req, res) => {

    const {
        erreurs,
        estValide
    } = valideProduitInput(req.body);



    if (!estValide) {



        return res.status(400).json(erreurs);

    } else {

        const produit = {}

        for (var key in req.body) {

            if (JSON.parse(JSON.stringify(req.body)).hasOwnProperty(key)) {

                produit[key] = req.body[key]
            }

        }


        produit["date_creation_produit"] = moment().format('YYYY/MM/D hh:mm:ss SSS')


        var sql = "CALL ajout(?,?,?,?)"
        connexion.query(sql, [produit.nom_produit, produit.prix_produit, produit.url_image_produit, produit.date_creation_produit], (err, rows, fields) => {

            if (err) {
                res.status(400).json(err);
            }



            return res.json(rows);
        })

    }




}