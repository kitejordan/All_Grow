const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cropRoutes = require('./routes/cropRoutes');

dotenv.config({ path: '../.env' });                //load environment variables
connectDB();                                       //connect to database
const app = express();

app.use(express.json());


app.use('/api/auth/', authRoutes);          //all routes defined in authRoutes will be prefixed with /api/auth
app.use('/api/crops',cropRoutes);            //all routes defined in cropRoutes will be prefixed with /api/crops

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));