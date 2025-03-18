import {
    createAddress, createUser, editUser, getProfile, loadUser, login, logout, registerAdmin, registerParent, registerStudent, registerTeacher, studentLogin,
    uploadProfileImage
} from '../controllers/auth/authController.js'
import express from 'express'
import isAuthenticated from '../middlewears/isAuthenticated.js'
import upload from '../middlewears/multer.js'
const authRoute = express.Router()



authRoute.route('/register/admin').post(createUser, createAddress, registerAdmin)
authRoute.route('/register/student').post(createUser, createAddress, registerStudent)
authRoute.route('/register/teacher').post(createUser, createAddress, registerTeacher)
authRoute.route('/register/parent').post(createUser, registerParent)
authRoute.route('/login').post(login)
authRoute.route('/student_login').post(studentLogin)
authRoute.route('/load_user').get(isAuthenticated, loadUser)
authRoute.route('/logout').get(isAuthenticated, logout)
authRoute.get("/profile", isAuthenticated, getProfile);
authRoute.post("/profile/upload_profile_image", isAuthenticated, upload.single("image"),uploadProfileImage);
authRoute.put("/update_profile", isAuthenticated,editUser);

export default authRoute