import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import cartRoute from './routes/cartRoute.js'
import sendMail  from './email.js';
import cron from 'node-cron';
import { sendEmailNotification } from './controllers/userController.js'; // Import the function
import {sendEmailIfCartNotEmpty} from './controllers/cartController.js'


// Define a cron job to send emails at a specific schedule 1 min
// cron.schedule('* * * * *', async () => {
//   try {
//     const status = await mail('arfiesolutions@gmail.com', 'armannakhwa19@gmail.com', 'Sending Email using Node.js', 'That was easy!');
//     console.log('MAil Sent:', status);
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// });

// console.log('Cron job started.');

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/cart', cartRoute)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
// Start cron job to send emails to inactive users every 15 mins
cron.schedule('*/10 * * * *', async () => {
  try {
    // Call the function to send email notifications to inactive users
    await sendEmailNotification() 
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
});

cron.schedule('*/10 * * * *', async () => {
  try {
    // Call the function to send email notifications to cart pending users
    await sendEmailIfCartNotEmpty()
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
});

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
