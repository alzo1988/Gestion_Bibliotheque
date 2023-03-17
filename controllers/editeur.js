import {Editeur} from "../models/index.js"
import validerediteur from "../validations/validationEditeur.js"

// Ajouter un editeur
export const addEditeur = async (req, res) => {

    const { nom,adresse,telephone } = req.body
    const validationResult =validerediteur(req.body)
    if(typeof validationResult==='object') return res.status(400).json({  message: validationResult })
    const newEditeur = {nom,adresse,telephone}

    try {
        const result = await Editeur.create(newEditeur)
        res.status(201).json({ data: result, message: 'Editeur crée avec succes' })
    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}
// la liste de tous les editeurs

export const ListeEditeur=async(req,res)=>{
    try {
        // extraire la liste de la table
        const result = await Editeur.findAll()
        // retourner la liste de la table
        res.status(200).json({ data: result })
        } catch (error) {
        res.status(404).json({ message: error.message })
        }
}

// Mettre a jour un editeur
export const updatedEditeur = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(404).json({ message: 'id est obligatoire' })

    const { nom,adresse,telephone } = req.body
    const updatedEditeur = { nom,adresse,telephone}
    try {
        const result = await Editeur.update(updatedEditeur, { where: { id } })
        res.status(200).json({ message: 'Editeur mise a jour' })

    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}


//Supprimer un Editeur
export const deleteEditeur = async (req, res) => {
    const EditeurId = req.params.id
    if (!EditeurId) return res.status(404).json({ error: true, message: error.message })

    try {
        const result = await Editeur.destroy({ where: { id: EditeurId } })
        res.status(200).json({ data: result, message: 'Editeur supprimé' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}