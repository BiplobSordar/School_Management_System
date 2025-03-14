import { query } from "../config/database.js";

export async function generateUniqueAdmissionNumber(grade) {
    const year = new Date().getFullYear();
    const randomNumber = Math.floor(10000 + Math.random() * 90000); // 5-digit random number

    const admissionNumber = `${year}${grade}${randomNumber}`;
    

    // Check for uniqueness in DB
    const checkQuery = 'SELECT * FROM students WHERE admission_number = $1';
    const { rowCount } =await query(checkQuery,[admissionNumber]) 
   

    if (rowCount > 0) {
        // If exists (extremely rare), recursively generate again
        return generateUniqueAdmissionNumber(grade);
    } else {
        return admissionNumber;
    }
}