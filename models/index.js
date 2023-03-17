import Department from "./Department.js";
import Reservation from "./Reservation.js";
import User from "./User.js";
import Role from "./Role.js";
import Livre from "./Livre.js"

//Les relations
User.belongsToMany(Role,{through:'UserRole'})
Role.belongsToMany(User,{through:'UserRole'})

export {Department, User, Role, Reservation,Livre}