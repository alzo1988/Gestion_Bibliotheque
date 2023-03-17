import {Amende} from "../models/index.js"
import valideramende from "../validations/validationAmende.js"

// Ajouter une amende
export const addAmende = async (req, res) => {

    const { date_amende,montant } = req.body
    const validationResult =valideramende(req.body)
    if(typeof validationResult==='object') return res.status(400).json({  message: validationResult })
    const newAmende = {date_amende,montant}

    try {
        const result = await Amende.create(newAmende)
        res.status(201).json({ data: result, message: 'Amende crée avec succes' })
    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}
// la liste de toutes les amendes

export const ListeAmende=async(req,res)=>{
    try {
        // extraire la liste de la table
        const result = await Amende.findAll()
        // retourner la liste de la table
        res.status(200).json({ data: result })
        } catch (error) {
        res.status(404).json({ message: error.message })
        }
}

// Mettre a jour une amende
export const updatedAmende = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(404).json({ message: 'id est obligatoire' })

    const { date_amende,montant } = req.body
    const updatedAmende = { date_amende,montant}
    try {
        const result = await Amende.update(updatedAmende, { where: { id } })
        res.status(200).json({ message: 'Amende mise a jour' })

    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}


//Supprimer une amende
export const deleteAmende = async (req, res) => {
    const AmendeId = req.params.id
    if (!AmendeId) return res.status(404).json({ error: true, message: error.message })

    try {
        const result = await Amende.destroy({ where: { id: AmendeId } })
        res.status(200).json({ data: result, message: 'Amende supprimée' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}