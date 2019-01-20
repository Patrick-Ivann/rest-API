import express from 'express';
import {
    recupererToutLesEvenements, recupererEvenementParId, recupererEvenementParLieu
} from '../api/evenement';

const router = express.Router();

router.route("/recuperer")
    .get(recupererToutLesEvenements);

router.route("/recuperer/:id([0-9]*)")
    .get(recupererEvenementParId);

router.route("/recuperer/:lieu([a-z]*)")
    .get(recupererEvenementParLieu);



module.exports = router ;