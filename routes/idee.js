 import express from 'express';
 import {
     recupererIdeeParId,
     recupererToutesLesIdee,
     ajouterIdee
 } from "../api/idee";

 const router = express.Router();

 router.route("/recuperer")
     .get(recupererToutesLesIdee);

 router.route("/recuperer/:id([0-9]*)")
     .get(recupererIdeeParId);


 router.route("/ajouter")
     .post(ajouterIdee)

 module.exports = router;