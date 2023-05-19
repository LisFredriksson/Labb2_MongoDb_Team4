const express = require('express');
const Film = require('./film_db');
const router = express.Router();
const mongoose = require('mongoose');


// Få alla filmer
router.get('/', async (req, res) => {
    try {
        const films = await Film.find();
        res.status(200).json(films);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Post request med en ny film med schemat från film_db
router.post('/', async (req, res) => {
    const film = new Film({
        titel: req.body.titel,
        regissör: req.body.regissör,
        genre: req.body.genre,
        år: req.body.år,
        betyg: req.body.betyg,
        skådespelare: req.body.skådespelare
    });

    try {
        const savedFilm = await film.save();
        res.status(200).json(savedFilm);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Uppdatera en film, ej klar
router.put('/:id', async (req, res) => {
    try {
        const updatedFilm = await Film.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedFilm);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Få alla filmer med ett exakt betyg
router.get('/betyg/:betyg', async (req, res) => {
    try {
        const betyg = Number(req.params.betyg);
        const films = await Film.find({ betyg: betyg });
        res.status(200).json(films);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Routes för delete ej klar

module.exports = router;
