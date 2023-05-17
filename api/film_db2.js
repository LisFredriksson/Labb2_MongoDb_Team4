const config = require('./config');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId

const connectionString = config.db;
const client = new MongoClient(connectionString);
const db = client.db()
const collection = db.collection('films')


async function update(_id, titel) {
    await client.connect(); // Anslut

    let result = await collection.updateOne({ _id: new ObjectId(_id) }, { $set: { titel: titel } }) // Lägg till ett dokument

    client.close(); // Stäng anslutning

    return result; // Returnera result (innehåller eventuella felmeddelanden)
}

module.exports = {
    update,
}
