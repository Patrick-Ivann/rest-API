import express from 'express';
import {recupererLieuParId, recupererToutesLesLieu} from "../api/lieu";

const router = express.Router();

router.route("/recuperer")
    .get(recupererToutesLesLieu);

router.route("/recuperer/:id([0-9]*)")
    .get(recupererLieuParId);

module.exports = router;