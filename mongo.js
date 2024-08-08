var express = require('express');
var {MongoClient} = require('mongodb');
var bodyparser = require('body-parser');

var app = express();
const port = process.env.PORT || 4055;

app.use(bodyparser.urlencoded({ extended: true }));

const mongourl = "mongodb://localhost:27017/";
const dbname = 'feedback';
let db;


MongoClient.connect(mongourl, { useUnifiedTopology: true })
    .then(client => {
        db = client.db(dbname);
        console.log('Database connected');
    })
    .catch(err => {
        console.error('Failed to connect to the database. Error:', err);
    });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit', async (req, res) => {
    const { name, mail, msg } = req.body;

    if (!db) {
        res.status(500).send("Database not connected");
        return;
    }

    try {
        await db.collection('details').insertOne({ name, mail, msg });
        console.log('Data inserted successfully');
        res.redirect('/');
    } catch (err) {
        console.error('Error in inserting data:', err);
        res.status(500).send('Insert failed');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
