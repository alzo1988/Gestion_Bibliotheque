import {Rayon} from "../models/index.js"
import validerrayon from "../validations/validationRayon.js"

// Ajouter un rayon
export const addRayon = async (req, res) => {

    const { nom } = req.body
    const validationResult =validerrayon(req.body)
    if(typeof validationResult==='object') return res.status(400).json({  message: validationResult })
    const newRayon = {nom }

    try {
        const result = await Rayon.create(newRayon)
        res.status(201).json({ data: result, message: 'Rayon crée avec succes' })
    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}
// la liste de tous les rayon

export const ListeRayon=async(req,res)=>{
    try {
        // extraire la liste de la table
        const result = await Rayon.findAll()
        // retourner la liste de la table
        res.status(200).json({ data: result })
        } catch (error) {
        res.status(404).json({ message: error.message })
        }
}

// Mettre a jour un rayon
export const updatedRayon = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(404).json({ message: 'id est obligatoire' })

    const { nom } = req.body
    const updatedRayon = { nom}
    try {
        const result = await Rayon.update(updatedRayon, { where: { id } })
        res.status(200).json({ message: 'Rayon mise a jour' })

    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}


//Supprimer un rayon
export const deleteRayon = async (req, res) => {
    const RayonId = req.params.id
    if (!RayonId) return res.status(404).json({ error: true, message: error.message })

    try {
        const result = await Rayon.destroy({ where: { id: RayonId } })
        res.status(200).json({ data: result, message: 'Rayon supprimée' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}