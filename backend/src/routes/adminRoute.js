import express from 'express'
import { deleteUserByAdmin, editUserByAdmin, filterQuery, getSingleUserProfile, uploadProfilePictureByAdmin } from '../controllers/adminController.js'
import isAuthenticated from '../middlewears/isAuthenticated.js'
import isAdmin from '../middlewears/isAdmin.js'
import isUserExist from '../middlewears/isUserExist.js'
import upload from '../middlewears/multer.js'


const adminRoute = express.Router()


adminRoute.route('/user_lists').post(filterQuery)
adminRoute.route('/profile/:user_id').get(getSingleUserProfile)
adminRoute.route('/update_profile/:user_id').put(editUserByAdmin)
adminRoute.route("/delete_user/:user_id").delete(deleteUserByAdmin);
adminRoute.route('/upload_profile_image/:user_id').post(upload.single("image"), uploadProfilePictureByAdmin);




export default adminRoute;
