const postgre = require('../database')

const loginController = {
    register: async(req, res) => {
        try {
            const { email, password } = req.body
            
            if (!email || !password) {
                return res.status(400).json({msg: "Email and password are required"})
            }

            const sql = 'INSERT INTO users(email, password) VALUES($1, $2) RETURNING *'
            const { rows } = await postgre.query(sql, [email, password])
            
            res.json({msg: "Register successful", data: rows[0]})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    
    login: async(req, res) => {
        try {
            const { email, password } = req.body

            if (!email || !password) {
                return res.status(400).json({msg: "Email and password are required"})
            }

            const sql = 'SELECT * FROM users WHERE email = $1 AND password = $2'
            const { rows } = await postgre.query(sql, [email, password])
            
            if (rows[0]) {
                return res.json({msg: "Login successful", data: rows[0]})
            }
            
            return res.status(401).json({msg: "Invalid email or password"})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    }
}

module.exports = loginController