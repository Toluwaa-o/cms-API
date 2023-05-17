require('dotenv').config()
require('express-async-errors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const express = require('express')
const morgan = require('morgan')
const cloudinary = require('cloudinary').v2
cloudinary.config({
    api_key: process.env.CLOUDINARY_KEY,
    cloud_name: process.env.CLOUDINARY_NAME,
    api_secret: process.env.CLOUDINARY_SECRET
})

const app = express()


const connectDB = require('./DB/connectDB')
const {auth} = require('./Middleware/authentication')
const reportsRoutes = require('./Routes/reportsRoutes')
const authRoutes = require('./Routes/authRoutes')
const userRoutes = require('./Routes/userRoutes')
const notFound = require('./Middleware/not-found')
const errorHandler = require('./Middleware/error-handler')

app.use(express.json())
app.use(express.static('./Public'))
app.use(fileUpload({useTempFiles: true}))
app.use(cookieParser(process.env.JWT_SECRET))
app.use(morgan('tiny'))
app.use('/cms-api/auth', authRoutes)
app.use('/cms-api/users', auth, userRoutes)
app.use('/cms-api/reports', auth, reportsRoutes)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()