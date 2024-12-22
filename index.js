const express = require("express")
const app = express()

require('dotenv').config()

app.use(express.json())

const loginRouter = require('./routes/login.router')

app.use("/auth", loginRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))