const express = require('express');
const Film = require('./film_db');
const db = require('./film_db2');
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

//UPDATE
router.put('/update', async (req, res) => {

    console.log(req.body._id + req.body.titel)

    let _id = await req.body._id
    let titel = await req.body.titel

    try {
        console.log(await db.update(_id, titel));
        res.sendStatus(200);

    } catch (err) {
        res.sendStatus(500).json({ message: err.message });
    }
});

router.delete('/delete', async (req, res) => {
    let _id = await req.body._id
    try {
        console.log(await db.remove(_id));
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(500).json({ message: err.message });
    }
});


module.exports = router;
