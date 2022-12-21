const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");
const { isObjectIdOrHexString } = require("mongoose");
const port = 5050;
// Set up default mongoose connection
const url = "mongodb+srv://admin:1234@cluster0.g2j0mmi.mongodb.net/test";
const client = new MongoClient(url);
app.use(
 bodyParser.urlencoded({
 extended: false,
 })
);
const dbName = "PatientsDB";
let db;
client
 .connect()
 .then(async () => {
 db = client.db(dbName);
 console.log("Connected to Mongodb");
 })
 .catch((err) => {
 console.log(err);
 console.log("Unable to connect to Mongodb");
 });
app.get("/", (req, res) => {
 db.collection("Patient")
 .find({})
 .toArray()
 .then((records) => {
 return res.json(records);
 })
 .catch((err) => {
 console.log(err);
 return res.json({ msg: "There was an error processing your query" });
 });
});

app.post("/", (req, res) => {
    console.log(req.body);
    const movie_name = req.body.movie_name;
    const director = req.body.director;
    const genre = req.body.genre;
    const character = req.body.character;
    db.collection("Patient")
    .insertOne({
    movie_name,
    director,
    genre,
    character
    })
    .then((records) => {
    return res.json(records);
    })
    .catch((err) => {
    console.log(err);
    return res.json({ msg: "There was an error processing your query" });
    });
    }); 

    app.put("/:_id", (req, res) => {
        const id = req.params._id;
        const published = req.body.published;
        db.collection("Patient")
        .updateOne(
        {
        _id: ObjectId(id)
        },
        {
        $set: {
        published
        }
        }
        )
        .then((records) => {
        return res.json(records);
        })
        .catch((err) => {
        console.log(err);
        return res.json({ msg: "There was an error processing your query" });
        });
        });

        app.delete("/:_id", (req, res) => {
            const id = req.params._id;
            db.collection("Patient")
            .deleteOne(
            {
            _id: ObjectId(id)
            })
            .then((records) => {
            return res.json(records);
            })
            .catch((err) => {
            console.log(err);
            return res.json({ msg: "There was an error processing your query" });
            });
            });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
   });