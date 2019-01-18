const Validator = require("validator");
const isEmpty = require("../functions/is_empty");

export function valideProduitInput(data) {
    let erreurs = {};


    if (Validator.isEmpty(data.nom_produit) || !data.nom_produit) {
        erreurs.nom_produit = "le nom du produit ne doit pas etre vide"
    }

    if (Validator.isEmpty(data.prix_produit) || !data.prix_produit) {
        erreurs.prix_produit = "le prix du produit ne doit pas etre vide"
    }

    if (Validator.isEmpty(data.url_image_produit) || !data.url_image_produit) {

        erreurs.url_image_produit = "l'image doit avoir une adresse"
    }


    if (data.nom_produit == !typeof String) {
        erreurs.typeNom_produit = "Le nom du produit doit être une chaîne de caractère."
    }

    if (data.prixProduit == !typeof Number) {
        erreurs.typePrix_produit = "Le prix du produit doit être une chaîne de caractère."
    }


    if (data.url_image_produit == !typeof String) {
        erreurs.typeUrl_image_produit = "L'url de l'image doit être une chaîne de caractère."
    }




    return {
        erreurs,
        estValide: isEmpty(erreurs)
    }
};


export const valideEvenementInput = (data) => {

    let erreurs = {}


    if (Validator.isEmpty(data.nom_event) || !data.nom_event) {

        erreurs.nom_event = "le nom de l'évenement ne doit pas etre vide"
    }

    if (Validator.isEmpty(data.date_debut_event) || !data.date_debut_event) {

        erreurs.date_debut_event = "la date du début de l'évenement "
    }

    if (Validator.isEmpty(data.date_fin_event) || !data.date_fin_event) {

        erreurs.typeDate_fin_event = "la date de fin de l'évenement ne doit pas etre vide"
    }



    if (data.nom_event == !typeof String) {
        erreurs.typeNomProduit = "Le nom de l'evenement doit être une chaîne de caractère."
    }

    if (data.date_debut_event == !typeof Date) {
        erreurs.typeDate_debut_event = "la date du debut de l'evenement doit être une chaîne de caractère."
    }

    if (data.date_fin_event == !typeof Date) {
        erreurs.typeDate_fin_event = "la date du debut de doit être une chaîne de caractère."
    }

    return {
        erreurs,
        estValide: isEmpty(erreurs)
    }
}


export const validePhotoInput = (data) => {

    let erreurs = {}


    if (Validator.isEmpty(data.legende_photo) || !data.legende_photo) {
        erreurs.legende_photo = "La legende de la photo ne doit pas etre vide"
    }

    if (data.legende_photo == !typeof String) {
        erreurs.typeLegendePhoto = "la légende de la photo doit être une chaîne de caractère."
    }



    return {
        erreurs,
        estValide: isEmpty(erreurs)
    }


}


export const valideIdeeInput = (data) => {

    if (Validator.isEmpty(data.nom_idee) || !data.nom_idee) {

        erreurs.nom_idee = "Le nom de l'idée ne doit pas etre vide."
    }


    if (Validator.isEmpty(data.description_idee) || !data.description_idee) {

        erreurs.description_idee = "La description de l'idée ne doit pas etre vide."
    }

    if (data.nom_idee == !typeof String) {
        erreurs.typeNom_idee = "Le nom de l'idée doit être une chaîne de caractère."
    }

    if (data.description_idee == !typeof String) {
        erreurs.typeDescription_idee = "La description de l'idée doit être une chaîne de caractère."
    }


    return {
        erreurs,
        estValide: isEmpty(erreurs)
    }


}

export const valideLieuInput = (data) => {

    if (Validator.isEmpty(data.nomLieu) || !data.nomLieu) {

        erreurs.nomLieu = "Le nom du lieu ne doit pas etre vide"
    }

    if (data.nomLieu == !typeof String) {
        erreurs.typeNomLieu = "Le nom du lieu doit être une chaîne de caractère."
    }



    return {
        erreurs,
        estValide: isEmpty(erreurs)
    }

};

export const valideCommentaireInput = (data) => {

    if (Validator.isEmpty(data.texte_commentaire) || !data.texte_commentaire) {

        erreurs.texte_commentaire = "Le texte du commentaire ne doit pas etre vide."
    }

    if (data.texte_commentaire == !typeof String) {
        erreurs.typeTexte_commentaire = "Le type du texte du commentaire doit être une chaîne de caractère."
    }



    return {
        erreurs,
        estValide: isEmpty(erreurs)
    }


};


export const valideUtilisateurInput = (data) => {

    if (Validator.isEmpty(data.prenom) || !data.prenom) {

        erreurs.prenom = "Le prénom ne doit pas etre vide."
    }

    if (Validator.isEmpty(data.nom) || !data.nom) {
        erreurs.nom = "Le nom ne doit pas etre vide."
    }

    if (Validator.isEmpty(data.rang) || !data.rang) {

        erreurs.rang = "Le rang ne doit etre vide"
    }

    if (Validator.isEmpty(data.adresse_mail) || !data.adresse_mail) {

        erreurs.adresse_mail = "Le mail ne doit pas etre vide."
    }

    if (Validator.isEmpty(data.mot_de_passe) || !data.mot_de_passe) {
        erreurs.mot_de_passe = "Le mot de passe ne doit pas etre vide."
    }






    if (data.prenom == !typeof String) {
        erreurs.typePrenom = "Le prénom d'utilisateur doit être une chaîne de caractère."
    }

    if (data.nom == !typeof String) {
        erreurs.typeNom = "le nom d'utilisateur doit être une chaîne de caractère."
    }

    if (data.rang == !typeof Number) {
        erreurs.typeRang = "la date du debut de doit être une chaîne de caractère."
    }


    if (data.adresse_mail == !typeof String || !Validator.isEmail(data.adresse_mail)) {
        erreurs.typeAdresse_mail = "Le nom de l'evenement doit être une chaîne de caractère."
    }


    if (data.mot_de_passe == !typeof String) {
        erreurs.typeNomProduit = "Le nom de l'evenement doit être une chaîne de caractère."
    }



    return {
        erreurs,
        estValide: isEmpty(erreurs)
    }



}