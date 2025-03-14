import { createAddress, createUser, loadUser, login, logout, registerAdmin, registerParent, registerStudent, registerTeacher, studentLogin } from '../controllers/auth/authController.js'
import express from 'express'
import isAuthenticated from '../middlewears/isAuthenticated.js'
const authRoute = express.Router()



authRoute.route('/register/admin').post(createUser, createAddress, registerAdmin)
authRoute.route('/register/student').post(createUser, createAddress, registerStudent)
authRoute.route('/register/teacher').post(createUser, createAddress, registerTeacher)
authRoute.route('/register/parent').post(createUser, registerParent)
authRoute.route('/login').post(login)
authRoute.route('/student_login').post(studentLogin)
authRoute.route('/load_user').get(isAuthenticated, loadUser)
authRoute.route('/logout').get(isAuthenticated,logout)

export default authRoute