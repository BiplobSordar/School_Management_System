import { distroyFile, extractPublicId, uploadFile } from "../config/cloudinaryConfig.js";
import { query } from "../config/database.js";
import { userExist } from "./auth/authController.js";

export const filterQuery = async (req, res) => {

     const {
          search,
          grade,
          section,
          group,
          department,
          experience,
          studentName,
          contactNumber,
          role,
          studentAdmissionNumber
     } = req.body
     console.log(req.body)

     try {

          const filterQuery = `SELECT 
    u.id, u.first_name, u.last_name, u.email, u.phone, u.blood_group, 
    u.gender, u.date_of_birth, u.profile_image, u.role,
    s.grade, s.section, s.group, s.admission_number,
    t.subject, t.experience,
    a.status AS admin_status,
    p.child_admission_number AS parent_student_admission_number
FROM users u
LEFT JOIN students s ON s.user_id = u.id AND u.role = 'student'
LEFT JOIN teachers t ON t.user_id = u.id AND u.role = 'teacher'
LEFT JOIN admins a ON a.user_id = u.id AND u.role = 'admin'
LEFT JOIN parents p ON p.user_id = u.id AND u.role = 'parent'
WHERE 
    u.role = $1  -- Role-based filtering
    AND ($2::text IS NULL OR $2 = '' 
         OR u.first_name ILIKE '%' || $2 || '%'
         OR u.last_name ILIKE '%' || $2 || '%'
         OR u.email ILIKE '%' || $2 || '%')
    AND ($3::text IS NULL OR $3 = '' 
         OR (s.grade IS NOT NULL AND s.grade ILIKE '%' || $3 || '%'))
    AND ($4::text IS NULL OR $4 = '' 
         OR (s.section IS NOT NULL AND s.section ILIKE '%' || $4 || '%'))
    AND ($5::text IS NULL OR $5 = '' 
         OR (s.group IS NOT NULL AND s.group ILIKE '%' || $5 || '%'))
    AND ($6::text IS NULL OR $6 = '' 
         OR (t.subject IS NOT NULL AND t.subject ILIKE '%' || $6 || '%'))
    AND ($7::text IS NULL OR $7 = '' 
         OR (t.experience IS NOT NULL AND t.experience::TEXT ILIKE '%' || $7 || '%'))
    AND ($8::text IS NULL OR $8 = '' 
         OR (p.child_admission_number IS NOT NULL AND p.child_admission_number ILIKE '%' || $8 || '%'))

`
          const values = [
               role,
               search ? `%${search}%` : null,
               grade ? `%${grade}%` : null,
               section ? `%${section}%` : null,
               group ? `%${group}%` : null,
               department ? `%${department}%` : null,
               experience ? `%${experience}%` : null,
               studentAdmissionNumber ? `%${studentAdmissionNumber}%` : null
          ];

          const { rows } = await query(filterQuery, values)

          //   return rows;
          return res.status(200).json({ success: true, users: rows })
     } catch (error) {
          console.error("Error fetching users by role:", error);
          throw error;
     }
};



export const getSingleUserProfile = async (req, res) => {
     try {

          const { user_id } = req.params;

          const { rows: userExist } = await query(`select * from users where id=$1`, [user_id])

          if (userExist.length === 0) {
               return res.status(404).json({ message: 'User Not Found', success: false })
          }


          const userRole = `${userExist[0].role}s`

          const getUserQuery = `SELECT users.*, ${userRole}.*, addresses.* 
 FROM users
 INNER JOIN ${userRole} ON ${userRole}.user_id = users.id
 INNER JOIN addresses ON addresses.user_id = users.id
 WHERE users.id = $1;`

          const { rows } = await query(getUserQuery, [user_id])


          // Check if user exists
          if (rows.length === 0) {
               return res.status(404).json({ message: "User not found" });
          }

          // Return user profile
          res.status(200).json({ success: true, user: rows[0] });
     } catch (error) {
          console.error("Error fetching user profile:", error);
          res.status(500).json({ message: "Internal Server Error" });
     }
};
export const userExistByGivenId = async (user_id, res) => {


     try {
          const { rows } = await query(`select * from users where id=$1`, [user_id])

          if (rows.length === 0) {
               return res.status(404).json({ message: 'User Not Found', success: false })
          }

          console.log(rows[0], 'thsi is the exexitong user who want to delete')
          return rows[0]


     } catch (error) {
          console.error("Error fetching user Details:", error);
          res.status(500).json({ message: "Internal Server Error" });
     }
}


export const editUserByAdmin = async (req, res) => {
     const { user_id } = req.params
     console.log(req.body)



     const { first_name, last_name, email, phone, blood_group, gender, date_of_birth, street_address, city, state, postal_code, father_name,
          mother_name,
          guardian_contact,
          admission_date,
          grade,
          section,
          admission_number, qualification,
          subject,
          experience } = req.body




     try {

          const user = await userExistByGivenId(user_id, res)
          console.log(user, 'thsi is the user who want to update')

          await query(`
                 UPDATE users 
                 SET 
                   first_name = $1, 
                   last_name = $2, 
                   email = $3, 
                   phone = $4, 
                   blood_group = $5, 
                   gender = $6, 
                   date_of_birth = $7
                 WHERE id = $8
               `, [first_name, last_name, email, phone, blood_group, gender, date_of_birth, user_id]);


          await query(`
                 UPDATE addresses 
                 SET 
                   street_address = $1, 
                   city = $2, 
                   state = $3, 
                   postal_code = $4
                 WHERE user_id = $5
               `, [street_address, city, state, postal_code, user_id]);




          switch (user.role) {
               case 'student':
                    await query(`update students set father_name=$1,mother_name=$2,guardian_contact=$3,
                    admission_date=$4,
                    grade=$5,
                    section=$6,
                    admission_number=$7 
                    where user_id=$8
                    `, [father_name, mother_name, guardian_contact, admission_date, grade, section, admission_number, user_id])

                    break;

               case 'teacher':
                    await query(`update teachers set
          
                              qualification=$1,
                              subject=$2,
                              experience=$3 
                              where user_id=$4`, [qualification, subject, experience, user_id])

               default:
                    break;
          }


          // await getProfile(req)
          return res.status(200).json({ success: true, message: 'User Updated Successfully?' })




     } catch (error) {
          console.error("Error Updateing User Details:", error);
          res.status(500).json({ message: "Internal Server Error" });
     }


}


export const deleteUserByAdmin = async (req, res) => {
     try {
          const { user_id } = req.params; // Extract user ID from URL params
          console.log('i am here at ehe delte con', user_id)

          // Check if user exists
          const user = await userExistByGivenId(user_id, res)
          console.log(user, 'thsi is the user')


          // Delete the user
          await query("DELETE FROM users WHERE id = $1", [user_id]);

          res.status(200).json({ message: "User deleted successfully", success: true });
          return

     } catch (error) {
          console.error("Error deleting user:", error);
          return res.status(500).json({ message: "Internal Server Error", success: false });
     }
};


export const uploadProfilePictureByAdmin = async (req, res) => {
     const { image } = req.body;

     console.log(image)
     const { user_id } = req.params

     if (!image) {
          return res.status(400).json({ message: 'No file exist' });
     }

     const user = userExistByGivenId(user_id, res)



     if (user.profile_image) {

          const publicId = extractPublicId(user.profile_image)
          console.log(publicId, 'thsi is the publci id')
          const result = await distroyFile(publicId)
          console.log(result, 'thsi si the result after delete')

     }


     // Uploading the file buffer to Cloudinary using the upload method
     const result = await uploadFile(image)


     await query(`update users set profile_image=$1 where id =$2 RETURNING *`, [result?.secure_url, user_id])


     return res.status(200).json({
          message: 'File uploaded successfully',
          // url: result.secure_url, // Cloudinary URL for the uploaded file
          success: true
     });
};
