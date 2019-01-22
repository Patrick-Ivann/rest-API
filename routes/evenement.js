import express from 'express';
import {

    recupererEvenementParId,
    recupererEvenementParLieu,
    ajouterEvenement,
    recupererTousLesEvenements,
    supprimerEvenement
} from '../api/evenement';
import {
    verificationEmetteur
} from '../functions/functionSheet';

const router = express.Router();

router.route("/recuperer")
    .get(recupererTousLesEvenements);

router.route("/recuperer/:id([0-9]*)")
    .get(recupererEvenementParId);

router.route("/recuperer/:lieu([a-z]*)")
    .get(recupererEvenementParLieu);

router.route("/ajouter")
    .post(verificationEmetteur, ajouterEvenement)

router.route("/supprimer/:id([0-9]*)")
    .delete(verificationEmetteur, supprimerEvenement)



module.exports = router;