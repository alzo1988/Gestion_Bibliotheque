import {Utilisateur} from "../models/index.js"
import validerUtilisateur from "../validations/validationUser.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// await Address.sync()
export const userLogin = async (req, res) => {
    const { user_name, password } = req.body
    if (nom) {
        try {
            const user = await Utilisateur.findOne({ where: { user_name } })
            // console.log("User pass", user, "req pass", password)

            if (!user) return res.status(404).json({ message: "No such user exists" })

            //Verification en comparant les mots de passe
            const verifyPassword = await bcrypt.compare(password, user.password)

            //Si les mots de passe sont identiques
            if (verifyPassword) {
                let payload = { id: user.id }
                let token = jwt.sign(payload, process.env.TOKEN_SECRET)
                res.status(200).json({ data: { user, token } })
            } else {
                res.status(401).json({ message: "Le mot de passe est incorrect" })
            }

        } catch (error) {
            res.status(401).json({ message: error.message })
        }
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params
    if (!id) res.status(404).json({ message: 'Id est obligatoire' })
    try {
        const result = await Utilisateur.findByPk(id, { include: 'Roles' })
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
export const addUser = async (req, res) => {

    const { user_name, password } = req.body

    //hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = { user_name, password: hashedPassword }

    try {
        const result = await User.create(newUser)
        res.status(201).json({ data: result, message: 'Utilisateur cree avec succes' })
        // res.redirect('/users/login')
    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}


// Ajouter un utilisateur
export const addUtilisateur = async (req, res) => {

    const { nom, prenom, naissance,telephone,email,mot_de_passe } = req.body
    // validation
    
    const validationResult =validerUtilisateur(req.body)
    if(typeof validationResult==='object') return res.status(400).json({  message: validationResult })
    const newUtilisateur = {nom, prenom, naissance,telephone,email,mot_de_passe }

    try {
        const result = await Utilisateur.create(newUtilisateur)
        res.status(201).json({ data: result, message: 'Utilisateur crée avec succes' })
    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}
// la liste de tous les utilisateurs

export const ListeUtilisateur=async(req,res)=>{
    try {
        // extraire la liste de la table
        const result = await Utilisateur.findAll()
        // retourner la liste de la table
        res.status(200).json({ data: result })
        } catch (error) {
        res.status(404).json({ message: error.message })
        }
}

// Mettre a jour un utilisateur
export const updatedUtilisateur = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(404).json({ message: 'id est obligatoire' })

    const { nom, prenom, naissance,telephone,email,mot_de_passe } = req.body
    const updatedUtilisateur = { nom, prenom, naissance,telephone,email,mot_de_passe }
    try {
        const result = await Utilisateur.update(updatedUtilisateur, { where: { id } })
        res.status(200).json({ message: 'Utilisateur mis a jour' })

    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}




//Supprimer une reservation
export const deleteUtilisateur = async (req, res) => {
    const UtilisateurId = req.params.id
    if (!UtilisateurId) return res.status(404).json({ error: true, message: error.message })

    try {
        const result = await Utilisateur.destroy({ where: { id: UtilisateurId } })
        res.status(200).json({ data: result, message: 'Utilisateur supprimé' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}