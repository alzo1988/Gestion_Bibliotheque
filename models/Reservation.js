//Importer la base de donnee pour creer les modeles
import database from "../connexion.js";
import { DataTypes } from 'sequelize'

//Modele de la table reservation
const Reservation = database.define('Reservation', {
    date_reservation: { type: DataTypes.STRING, allowNull:false },
    date_expiration: { type: DataTypes.STRING, allowNull : false  },
    status_reservation: { type: DataTypes.STRING, allowNull:false }
   

},
    { //Ajouter cet objet pour ne pas avoir les colonnes createdAt and updatedAt automatiquement
        timestamps: false
    })


export default Reservation