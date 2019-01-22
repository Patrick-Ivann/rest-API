import express from 'express';
import {
    publierUnAchat,
    recupererAchats,
    recupererAcheteur,
    recupererProduit
} from "../api/achete";
import {
    verificationEmetteur
} from '../functions/functionSheet';

const router = express.Router();

router.route("/recuperer/")
    .get(recupererAchats);

router.route("/recuperer/utilisateur/:id([0-9]*)")
    .get(recupererAcheteur);

router.route("/recuperer/produit/:id([0-9]*)")
    .get(recupererProduit);

router.route("/ajouter/")
    .post(verificationEmetteur, publierUnAchat);

module.exports = router;