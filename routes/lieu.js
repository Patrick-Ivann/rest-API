import express from 'express';
import {
    recupererLieuParId,
    recupererTousLesLieux,
} from "../api/lieu";

const router = express.Router();

router.route("/recuperer")
    .get(recupererTousLesLieux);

router.route("/recuperer/:id([0-9]*)")
    .get(recupererLieuParId);

module.exports = router;