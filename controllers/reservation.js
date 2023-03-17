import {Reservation} from "../models/index.js"
import validerreservation from "../validations/validationReservation.js"

// Ajouter une reservation
export const addReservation = async (req, res) => {

    const { date_reservation, date_expiration, status_reservation } = req.body
    const validationResult =validerreservation(req.body)
    if(typeof validationResult==='object') return res.status(400).json({  message: validationResult })
    const newReservation = {date_reservation, date_expiration, status_reservation }

    try {
        const result = await Reservation.create(newReservation)
        res.status(201).json({ data: result, message: 'Reservation crée avec succes' })
    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}
// la liste de toutes les reservations

export const ListeReservation=async(req,res)=>{
    try {
        // extraire la liste de la table
        const result = await Reservation.findAll()
        // retourner la liste de la table
        res.status(200).json({ data: result })
        } catch (error) {
        res.status(404).json({ message: error.message })
        }
}

// Mettre a jour une Reservation
export const updatedReservation = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(404).json({ message: 'id est obligatoire' })

    const { date_reservation, date_expiration, status_reservation  } = req.body
    const updatedReservation = { date_reservation, date_expiration, status_reservation }
    try {
        const result = await Reservation.update(updatedReservation, { where: { id } })
        res.status(200).json({ message: 'Reservation updated' })

    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}




//Supprimer une reservation
export const deleteReservation = async (req, res) => {
    const ReservationId = req.params.id
    if (!ReservationId) return res.status(404).json({ error: true, message: error.message })

    try {
        const result = await Reservation.destroy({ where: { id: ReservationId } })
        res.status(200).json({ data: result, message: 'Reservation supprimée' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}