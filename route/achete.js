import express from 'express';
import {recupererAchat, recupererAcheteur, recupererProduit} from "../api/achete";

const router = express.Router();

router.route("/recuperer/")
    .get(recupererAchat);

router.route("/recuperer/utilisateur/:id([0-9]*)")
    .get(recupererAcheteur);

router.route("/recuperer/produit/:id([0-9]*)")
    .get(recupererProduit);

module.exports = router;