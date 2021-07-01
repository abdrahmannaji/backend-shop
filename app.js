const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const fileupload = require('express-fileupload')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')
var bodyParser = require('body-parser');
const errorHandler = require('./middleware/error')

const DBConnection = require('./config/db')

dotenv.config({ path: './config/.env' })


DBConnection()


const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const shopRoutes = require('./routes/shops')
const categoryRoutes = require('./routes/categories')
const commentRoutes = require('./routes/comments')
const replyRoutes = require('./routes/replies')
const subscriptionRoutes = require('./routes/subscriptions')
const searchRoutes = require('./routes/search')
const ProdauctItem = require('./routes/productItem')
const productRoutes = require('./routes/product')


const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

app.use(cookieParser())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// File uploading
app.use(
  fileupload({
    createParentPath: true,
})
)

app.use(bodyParser.json())

// Sanitize data
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Enable CORS
app.use(cors())

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100 // 100 request per 10 mins
})

// app.use(limiter)
// 
// Prevent http param pollution
app.use(express.static(path.join(__dirname, 'public')));
app.use(hpp())



app.use("/uploads", express.static('uploads'));

const versionOne = (routeName) => `/api/v1/${routeName}`
app.use(versionOne('auth'), authRoutes)
app.use(versionOne('users'), userRoutes)
app.use(versionOne('shops'), shopRoutes)
app.use(versionOne('categories'), categoryRoutes)
app.use(versionOne('comments'), commentRoutes)
app.use(versionOne('replies'), replyRoutes)
app.use(versionOne('subscriptions'), subscriptionRoutes)
app.use(versionOne('prodauctItem'), ProdauctItem)
app.use(versionOne('product'), productRoutes)
app.use(versionOne('search'), searchRoutes)

app.get("/", (req, res) => {
  res.send("النظام شغال")
});

app.use(errorHandler)

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log(
    `We are live on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close server & exit process

  server.close(() => process.exit(1))
})
