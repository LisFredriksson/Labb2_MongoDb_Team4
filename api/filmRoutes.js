const express = require('express');
const Film = require('./model');
const db = require('./film_db');
const router = express.Router();


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
// NY kod - Ger rating över 7
router.get('/HR', async (req, res) => {
    try {
        const films = await Film.find({ betyg: { $gte: 7 } });
        res.status(200).json(films);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// NY kod - Ger rating under 6
router.get('/LR', async (req, res) => {
    try {
        const films = await Film.find({ betyg: { $lt: 6 } });
        res.status(200).json(films);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// NY kod - Kan välja år
router.get('/year/:year', async (req, res) => {
    const year = parseInt(req.params.year);
    try {
        const films = await Film.find({ år: year });
        res.status(200).json(films);
    } catch (err) {
        res.status(500).json({ message: err.message });
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



module.exports = router;
