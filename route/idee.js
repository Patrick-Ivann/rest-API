import express from 'express';
import {recupererIdeeParId, recupererToutesLesIdee} from "../api/idee";

const router = express.Router();

router.route("/recuperer")
    .get(recupererToutesLesIdee);

router.route("/recuperer/:id([0-9]*)")
    .get(recupererIdeeParId);

module.exports = router ;