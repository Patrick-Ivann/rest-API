import express from 'express';
import {
    publierUnLikeSurEventIdee,
    recupererTousLesEvenementsAimee,
    recupererUtilisateurAimeIdeeEvent,
    recupererEvenementIdeeAime,
    publierUnLikeSurEvenementIdee
} from "../api/aime_idee";
import {
    verificationEmetteur
} from '../functions/functionSheet';

const router = express.Router();

router.route("/recuperer")
    .get(recupererTousLesEvenementsAimee);

router.route("/recuperer/utilisateur/:id([0-9]*)")
    .get(recupererUtilisateurAimeIdeeEvent);

router.route("/recuperer/event/:id([0-9]*)")
    .get(recupererEvenementIdeeAime);

router.route("/ajouter/")
    .post(verificationEmetteur, publierUnLikeSurEvenementIdee);

module.exports = router;