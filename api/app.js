const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const filmRoutes = require('./filmRoutes'); //importera mina routes
const Film = require('./model');

app.use(express.json());


app.use('/api/filmer', filmRoutes); //använd mina routes

// Middleware
app.use(cors());
app.use(express.json());

// Connection till mongodb
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

// Starta Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
