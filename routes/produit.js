import express from 'express';

import { recupererTousLesProduits, recupererProduitParId } from "../api/produit";

const router = express.Router();


router.route("/recuperer")
    .get(recupererTousLesProduits)

router.route("/recuperer/:id([0-9]*)")
    .get(recupererProduitParId)





export default router