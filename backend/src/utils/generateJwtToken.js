import jwt from 'jsonwebtoken'

export const generateToken = (user_id, user_email,user_role) => {

    return jwt.sign({ user_id, user_email,user_role }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}