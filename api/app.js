const express = require('express');
const cors = require('cors');
const { port } = require('./config');
const connectDB = require('./film_db');
const Film = require('./models/film');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();


(async () => {
    try {
      const film = await Film.findOne();
      if (film) {
        console.log('Fetched movie:', film);
      } else {
        console.log('No movies found in the database');
      }
    } catch (error) {
      console.log('Error fetching movie:', error);
    }
  })();

  app.get('/films', async (req, res) => {
    try {
      const films = await Film.find();
      res.json(films);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });


//"dev": "nodemon app.js",
