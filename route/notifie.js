import express from 'express';
import {
    publierUnUtilisateurANotifie,
    recupererIdeeNotif,
    recupererToutesLesNotif,
    recupererUtilisateurNotif
} from "../api/notifie";

const router = express.Router();

router.route("/recuperer")
    .get(recupererToutesLesNotif);

router.route("/recuperer/idee/:id([0-9]*)")
    .get(recupererIdeeNotif);

router.route("/recuperer/utilisateur/:id([0-9]*)")
    .get(recupererUtilisateurNotif);

router.route("/ajouter/")
    .post(publierUnUtilisateurANotifie);

module.exports = router;