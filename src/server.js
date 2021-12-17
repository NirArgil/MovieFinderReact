const express = require("express");
require('dotenv').config();
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS');
  next();
});

const apiKey = process.env.API_KEY;

app.get("/api/:searchTerm", (req, res) => {

  try {
    const searchTerm = req.params.searchTerm;

    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${searchTerm}`)
      .then(res => res.json())
      .then(data => {
        res.send({ data })

      })
  } catch (err) {
    console.error(err);
  }

})

app.get("/api/get-movie/:IDmovie", (req, res) => {
  try {
    const IDmovie = req.params.IDmovie;

    fetch(`http://www.omdbapi.com/?&apikey=${apiKey}&i=${IDmovie}`)
      .then(res => res.json())
      .then(data => {
        res.send({ data })

      })


  } catch (err) {
    console.error(err);
  }

})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});