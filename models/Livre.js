//Importer la base de donnee pour creer les modeles
import database from "../connexion.js";

import { DataTypes } from 'sequelize'

//Modele de la table livre
const Livre = database.define('Livre', {
   
    titre: { type: DataTypes.STRING, allowNull: false },
    date_publication_livre: { type: DataTypes.DATEONLY },
    categorie_livre: { type: DataTypes.STRING, allowNull: false },
    nombre_exemplaire_total: { type: DataTypes.INTEGER, allowNull: false },
    nombre_exemplaire: { type: DataTypes.INTEGER, allowNull: false }
},
    { //Ajouter cet objet pour ne pas avoir les colonnes createdAt and updatedAt automatiquement
        timestamps: false
    })

export default Livre


  