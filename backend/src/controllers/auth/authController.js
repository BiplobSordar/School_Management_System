
// utils/hashPassword.js
import bcrypt from 'bcryptjs';
import { query } from '../../config/database.js';
import { generateUniqueAdmissionNumber } from '../../utils/generateAdmissonNumber.js';
import { hashPassword } from '../../utils/hashPassword.js';
import { generateToken } from '../../utils/generateJwtToken.js';







export const createUser = async (req, res, next) => {
    try {

        const { first_name, last_name, email, password, phone, blood_group, gender, date_of_birth, role } = req.body;



        // Check if email already exists
        const emailCheck = await query("SELECT * FROM users WHERE email = $1", [email]);


        // Early return if email already exists
        if (emailCheck.rows[0]) {
            console.log('Email already exists. Try again with another email.', email);
            return res.status(400).json({ message: "Email already exists. Try again with another email." });
        }

        // Hash the password if email is unique
        const password_hash = await hashPassword(password);

        // Insert new user into the users table
        const userQuery = `
                INSERT INTO users (first_name, last_name, email, password_hash, phone, blood_group, gender, date_of_birth, role)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING id
            `;

        const result = await query(userQuery, [
            first_name,
            last_name,
            email,
            password_hash,
            phone,
            blood_group,
            gender,
            date_of_birth,
            role
        ]);

        req.user_id = result.rows[0].id
        next()
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'User Creation Failed ....', error });
    }
}

export const createAddress = async (req, res, next) => {
    const { street_address, city, state, postal_code } = req.body


    try {
        const createAddressQuery = `Insert Into Addresses (street_address,city,state,postal_code,user_id) Values($1,$2,$3,$4,$5)`

        await query(createAddressQuery, [street_address, city, state, postal_code, req.user_id])
        next()
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Address Creation Failed ....', error });
    }
}


// controllers/adminController.js

export const registerAdmin = async (req, res) => {

    let user_id = req.user_id

    try {
        // If user creation was successful, insert the admin role into the admins table
        const adminQuery = `
            INSERT INTO admins (user_id)
            VALUES ($1)
        `;

        await query(adminQuery, [user_id]);

        return res.status(201).json({ message: 'Admin registered successfully.', success: true });
    } catch (error) {
        console.error('Error registering admin:', error);
        return res.status(500).json({ success: false, message: 'Error registering admin.', error: error.message });
    }
}

export const registerStudent = async (req, res) => {

    try {
        const { father_name, mother_name, guardian_contact, admission_date, grade, section, } = req.body

        console.log(guardian_contact, 'thsi is the guardina contact')
        const admission_number = await generateUniqueAdmissionNumber(grade);



        const studentQuery = `
            INSERT INTO students ( user_id, father_name, mother_name, guardian_contact, admission_date, grade, section, admission_number)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;
        await query(studentQuery, [

            req.user_id,
            father_name,
            mother_name,
            guardian_contact,
            admission_date,
            grade,
            section,
            admission_number
        ]);


        return res.status(201).json({ message: 'Student registered successfully.', admission_number });

    } catch (error) {

        console.error(error);
        return res.status(500).json({ message: 'Error registering student.', error });
    }
}
export const registerTeacher = async (req, res) => {

    try {

        const { qualification,
            subject,
            experience } = req.body




        const teacherQuery = `
            INSERT INTO teachers ( user_id, qualification, subject, experience)
            VALUES ($1, $2, $3, $4)
        `;
        await query(teacherQuery, [

            req.user_id,
            qualification,
            subject,
            experience

        ]);


        return res.status(201).json({ message: 'Teacher registered successfully.' });

    } catch (error) {

        console.error(error);
        return res.status(500).json({ message: 'Error registering teacher.', error });
    }
}
export const registerParent = async (req, res) => {

    try {

        const student = await query(`select * from students where admission_number=$1`, [req.body.child_admission_number])
        console.log(student.rows)

        if (student.rows.length === 0) {
            console.log('Student Not Found With This Addmision Id. Try again with another Admission Id.', req.body.child_admission_number);
            return res.status(400).json({ message: "Student Not Found. Try again with another Admisson Number." });
        }

        const parentQuery = `
           INSERT INTO parents (user_id, child_admission_number)
VALUES ($1, $2)
RETURNING id;
        `;

        const parent = await query(parentQuery, [
            req.user_id,
            req.body.child_admission_number
        ]);


        await query(`UPDATE students
SET parent_id = $1
WHERE id = $2;` , [parent.rows[0].id, student.rows[0].id])

        return res.status(201).json({ message: 'Parent registered successfully. After the Child Approval You Can Login To Your Dashbord' });

    } catch (error) {

        console.error(error);
        return res.status(500).json({ message: 'Error registering parent.', error });
    }
}



// controllers for Login User


export const login = async (req, res) => {


    const { email, password } = req.body


    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }


    try {


        const { rows } = await query(`select * from users where email=$1`, [email])
        const [user] = rows

        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid Credentials.Wrong Email!.' })
        }


        // password check 

        const password_check = await bcrypt.compare(password, user.password_hash)


        if (!password_check) {

            return res.status(401).json({ success: false, message: 'Invalid Credentials.Wrong Password!' })
        }

        //   generate Token
        const token = generateToken(user.id, user.email)

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000 * 24, // 24 hour
        });







        return res.status(200).json({ success: true, message: `${user.role} Logged In SuccessFully`, user })
    } catch (error) {
        console.log(error, 'Error Happend At Login Controller')
        return res.status(500).json({ success: false, message: 'User Logged In Failed' })
    }
}
export const studentLogin = async (req, res) => {


    const { admission_number, password } = req.body


    if (!admission_number || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }


    try {


        const { rows } = await query(`select students.user_id,users.* from students Inner Join users on users.id=students.user_id where students.admission_number=$1`, [admission_number])
        const [student] = rows
        console.log(student)

        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid Credentials.Wrong Email!.' })
        }


        // password check 

        const password_check = await bcrypt.compare(password, student.password_hash)


        if (!password_check) {

            return res.status(401).json({ success: false, message: 'Invalid Credentials.Wrong Password!' })
        }

        //   generate Token
        const token = generateToken(student.id, student.email)

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000 * 24, // 24 hour
        });







        return res.status(200).json({ success: true, message: `${student.role} Logged In SuccessFully`, student })
    } catch (error) {
        console.log(error, 'Error Happend At Login Controller')
        return res.status(500).json({ success: false, message: 'Student  Logged In Failed' })
    }
}



export const loadUser = async (req, res) => {

    const user_id = req.id

    try {
        const { rows: [user] } = await query(`select * from users where id=$1`, [user_id])

        if (!user) {
            return res.status(401).json({ message: 'User Not Found.', success: false })
        }

        return res.status(200).json({ user, success: true })


    } catch (error) {
        console.log(error, 'Error Happend At the Load User Controller')
        return res.status(500).json({ message: 'Cannot Load User ', success: false })
    }



}

export const logout = async (_, res) => {


    try {

        return res.status(200).cookie('token', "", { maxAge: 0 }).json({
            success: true,
            message: 'User LoggedOut Successfull..',
            status: 200
        })

    } catch (error) {

        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Failed To Logout..'
        })
    }
}






