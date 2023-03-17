import {Emprunt} from "../models/index.js"
import valideremprunt from "../validations/validationEmprunt.js"

// Ajouter un Emprunt
export const addEmprunt = async (req, res) => {

    const { date_emprunt,date_retour_prevu, date_retour_effectif,status } = req.body
    const validationResult =valideremprunt(req.body)
    if(typeof validationResult==='object') return res.status(400).json({  message: validationResult })
    const newEmprunt = {date_emprunt,date_retour_prevu, date_retour_effectif,status }

    try {
        const result = await Emprunt.create(newEmprunt)
        res.status(201).json({ data: result, message: 'Emprunt crée avec succes' })
    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}
// la liste de tous les livres Emprunter

export const ListeEmprunt=async(req,res)=>{
    try {
        // extraire la liste de la table
        const result = await Emprunt.findAll()
        // retourner la liste de la table
        res.status(200).json({ data: result })
        } catch (error) {
        res.status(404).json({ message: error.message })
        }
}

// Mettre a jour un Emprunt
export const updatedEmprunt = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(404).json({ message: 'id est obligatoire' })

    const { date_emprunt,date_retour_prevu, date_retour_effectif,status } = req.body
    const updatedEmprunt = { date_emprunt,date_retour_prevu, date_retour_effectif,status}
    try {
        const result = await Emprunt.update(updatedEmprunt, { where: { id } })
        res.status(200).json({ message: 'Emprunt mise a jour' })

    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}


//Supprimer un Livre
export const deleteEmprunt = async (req, res) => {
    const EmpruntId = req.params.id
    if (!EmpruntId) return res.status(404).json({ error: true, message: error.message })

    try {
        const result = await Emprunt.destroy({ where: { id: EmpruntId } })
        res.status(200).json({ data: result, message: 'Emprunt supprimé' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}