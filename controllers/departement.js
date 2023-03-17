import {Departement} from "../models/index.js"
import validerdepartement from "../validations/validationDepartement.js"

// Ajouter un editeur
export const addDepartement = async (req, res) => {

    const { nom_departement } = req.body
    const validationResult =validerdepartement(req.body)
    if(typeof validationResult==='object') return res.status(400).json({  message: validationResult })
    const newDepartement = {nom_departement}

    try {
        const result = await Departement.create(newDepartement)
        res.status(201).json({ data: result, message: 'Departement crée avec succes' })
    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}
// la liste de tous les departemnt

export const ListeDepartement=async(req,res)=>{
    try {
        // extraire la liste de la table
        const result = await Departement.findAll()
        // retourner la liste de la table
        res.status(200).json({ data: result })
        } catch (error) {
        res.status(404).json({ message: error.message })
        }
}

// Mettre a jour un departement
export const updatedDepartement = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(404).json({ message: 'id est obligatoire' })

    const { nom_departement } = req.body
    const updatedDepartement = { nom_departement}
    try {
        const result = await Departement.update(updatedDepartement, { where: { id } })
        res.status(200).json({ message: 'Departement mise a jour' })

    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}


//Supprimer un Departement
export const deleteDepartement = async (req, res) => {
    const DepartementId = req.params.id
    if (!DepartementId) return res.status(404).json({ error: true, message: error.message })

    try {
        const result = await Departement.destroy({ where: { id: DepartementId } })
        res.status(200).json({ data: result, message: 'Departement supprimé' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}