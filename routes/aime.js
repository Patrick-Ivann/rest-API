import express from 'express';
import {

    recupererPhotoAimee,
    recupererUtilisateurAimant,
    publierUnLikeSurPhoto,
    recupererTousLesJaimes
} from "../api/aime";
import {
    verificationEmetteur
} from '../functions/functionSheet';

const router = express.Router();

router.route("/recuperer/")
    .get(recupererTousLesJaimes);

router.route("/recuperer/utilisateur/:id([0-9]*)")
    .get(recupererUtilisateurAimant);

router.route("/recuperer/photo/:id([0-9]*)")
    .get(recupererPhotoAimee);

router.route("/ajouter")
    .post(verificationEmetteur, publierUnLikeSurPhoto);

module.exports = router;