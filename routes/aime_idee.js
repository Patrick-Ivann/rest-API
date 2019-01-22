import express from 'express';
import {
    publierUnLikeSurEventIdee,
    recupererEventIdeeAime,
    recupererUtilisateurAimeIdeeEvent,
    recupererTousLesEventsAimee
} from "../api/aime_idee";
import {
    verificationEmetteur
} from '../functions/functionSheet';

const router = express.Router();

router.route("/recuperer")
    .get(recupererTousLesEventsAimee);

router.route("/recuperer/utilisateur/:id([0-9]*)")
    .get(recupererUtilisateurAimeIdeeEvent);

router.route("/recuperer/event/:id([0-9]*)")
    .get(recupererEventIdeeAime);

router.route("/ajouter/")
    .post(verificationEmetteur, publierUnLikeSurEventIdee);

module.exports = router;