import {Livre} from "../models/index.js"
import validerlivre from "../validations/validationLivre.js"

// Ajouter un livre
export const addLivre = async (req, res) => {

    const { titre,date_publication_livre,categorie_livre,nombre_exemplaire_total,nombre_exemplaire } = req.body
    const validationResult =validerlivre(req.body)
    if(typeof validationResult==='object') return res.status(400).json({  message: validationResult })
    const newLivre = {titre,date_publication_livre,categorie_livre,nombre_exemplaire_total,nombre_exemplaire }

    try {
        const result = await Livre.create(newLivre)
        res.status(201).json({ data: result, message: 'Livre crée avec succes' })
    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}
// la liste de tous les livres

export const ListeLivre=async(req,res)=>{
    try {
        // extraire la liste de la table
        const result = await Livre.findAll()
        // retourner la liste de la table
        res.status(200).json({ data: result })
        } catch (error) {
        res.status(404).json({ message: error.message })
        }
}

// Mettre a jour un livre
export const updatedLivre = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(404).json({ message: 'id est obligatoire' })

    const { titre,date_publication_livre,categorie_livre,nombre_exemplaire_total,nombre_exemplaire } = req.body
    const updatedLivre = { titre,date_publication_livre,categorie_livre,nombre_exemplaire_total,nombre_exemplaire}
    try {
        const result = await Livre.update(updatedLivre, { where: { id } })
        res.status(200).json({ message: 'Livre mise a jour' })

    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}


//Supprimer un Livre
export const deleteLivre = async (req, res) => {
    const LivreId = req.params.id
    if (!LivreId) return res.status(404).json({ error: true, message: error.message })

    try {
        const result = await Livre.destroy({ where: { id: LivreId } })
        res.status(200).json({ data: result, message: 'Livre supprimé' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}