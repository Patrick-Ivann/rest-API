import express from 'express';
import {
    publierUnUtilisateurANotifie,
    recupererIdeeNotif,
    recupererUtilisateurNotif,
    recupererToutesLesNotifS
} from "../api/notifie";
import {
    verificationEmetteur
} from '../functions/functionSheet';

const router = express.Router();

router.route("/recuperer")
    .get(recupererToutesLesNotifS);

router.route("/recuperer/idee/:id([0-9]*)")
    .get(recupererIdeeNotif);

router.route("/recuperer/utilisateur/:id([0-9]*)")
    .get(recupererUtilisateurNotif);

router.route("/ajouter/")
    .post(verificationEmetteur, publierUnUtilisateurANotifie);

module.exports = router;