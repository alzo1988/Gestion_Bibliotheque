//Importer la base de donnee pour creer les modeles
import database from "../connexion.js";

import { DataTypes } from 'sequelize'

//Modele de la table rayon
const Rayon = database.define('Rayon', {
   
    nom: { type: DataTypes.STRING, allowNull: false }
},
    { //Ajouter cet objet pour ne pas avoir les colonnes createdAt and updatedAt automatiquement
        timestamps: false
    })

export default Rayon


  