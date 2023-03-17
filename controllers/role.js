import {Role} from "../models/index.js"
import validerRole1 from "../validations/validationRole.js"

export const createRoleUser = async (req, res) => {
    const roleId = req.params.id
    if (!roleId) res.status(404).json({ error: true, message: error.message })

    const { user_name, password } = req.body
    const newUser = { user_name, password }

    try {
        const currentRole = await Role.findByPk(roleId)
        const result = await currentRole.createUser(newUser)
        res.status(201).json({ data: result, message: 'Utilisateur ajoute' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Ajouter un role
export const addRole = async (req, res) => {

    const { nom} = req.body
    // validation
    const validationResult =validerRole1(req.body)
    if(typeof validationResult==='object') return res.status(400).json({  message: validationResult })
    const newRole = {nom }

    try {
        const result = await Role.create(newRole)
        res.status(201).json({ data: result, message: 'Role crée avec succes' })
    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}
// la liste de tous les role

export const ListeRole=async(req,res)=>{
    try {
        // extraire la liste de la table
        const result = await Role.findAll()
        // retourner la liste de la table
        res.status(200).json({ data: result })
        } catch (error) {
        res.status(404).json({ message: error.message })
        }
}
// Mettre a jour un role
export const updatedRole = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(404).json({ message: 'id est obligatoire' })

    console.log(`Role id`,id)

    const { nom} = req.body
    const updatedRole = { nom}
    try {
        const result = await Role.update(updatedRole, { where: { id } })
        res.status(200).json({ message: 'Role bien updated' })

    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}
//Supprimer un role
export const deleteRole = async (req, res) => {
    const RoleId = req.params.id
    if (!RoleId) return res.status(404).json({ error: true, message: error.message })

    try {
        const result = await Role.destroy({ where: { id: RoleId } })
        res.status(200).json({ data: result, message: 'Role supprime' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}