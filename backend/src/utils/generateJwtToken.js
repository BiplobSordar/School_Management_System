import jwt from 'jsonwebtoken'

export const generateToken = (user_id, user_email) => {

    return jwt.sign({ user_id, user_email }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}