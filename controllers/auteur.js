import {Auteur} from "../models/index.js"
import validerauteur from "../validations/validationAuteur.js"

// Ajouter un auteur
export const addAuteur = async (req, res) => {

    const { nom,prenom,naissance,nationalite,sexe,biographie } = req.body
    const validationResult =validerauteur(req.body)
    if(typeof validationResult==='object') return res.status(400).json({  message: validationResult })
    const newAuteur = {nom,prenom,naissance,nationalite,sexe,biographie }

    try {
        const result = await Auteur.create(newAuteur)
        res.status(201).json({ data: result, message: 'Auteur crée avec succes' })
    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}
// la liste de tous les auteurs

export const ListeAuteur=async(req,res)=>{
    try {
        // extraire la liste de la table
        const result = await Auteur.findAll()
        // retourner la liste de la table
        res.status(200).json({ data: result })
        } catch (error) {
        res.status(404).json({ message: error.message })
        }
}

// Mettre a jour un auteur
export const updatedAuteur = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(404).json({ message: 'id est obligatoire' })

    const { nom,prenom,naissance,nationalite,sexe,biographie } = req.body
    const updatedAuteur = { nom,prenom,naissance,nationalite,sexe,biographie}
    try {
        const result = await Auteur.update(updatedAuteur, { where: { id } })
        res.status(200).json({ message: 'Auteur mise a jour' })

    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}


//Supprimer un Auteur
export const deleteAuteur = async (req, res) => {
    const AuteurId = req.params.id
    if (!AuteurId) return res.status(404).json({ error: true, message: error.message })

    try {
        const result = await Auteur.destroy({ where: { id: AuteurId } })
        res.status(200).json({ data: result, message: 'Auteur supprimé' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}