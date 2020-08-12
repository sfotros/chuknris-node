const express = require('express');
const request = require('request');
// const hbs = require('hbs');
const path = require('path');
const axios = require('axios');
const app = express();

const publicDirectory = path.join(__dirname, '/public');

app.use(express.static(publicDirectory));

const viewsPath = path.join(__dirname + '/views');

app.set('view engine', 'hbs');

app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => {
  const jokeUrl = 'https://api.chucknorris.io/jokes/random';

  request({ url: jokeUrl, json: true }, (error, apiResponse) => {
    if (error) {
      res.send('There was an error');
    } else {
      res.render('index', {
        joke: apiResponse.body.value,
      });
    }
  });
  //   const apiResponse = axios.get(jokeUrl);
});

// app.get('/', (req, res) => {
//   res.send('Joke: ' + apiResponse.body.value);
// });

app.post('/category', async (req, res) => {
  const categ = req.body.theCategory;
  const jokeCatUrl = `https://api.chucknorris.io/jokes/random?category=${categ}`;
  const apiResponse = await axios.get(jokeCatUrl);

  res.render('category', {
    jokeCat: apiResponse.data.value,
  });
});

app.listen(5000, () => {
  console.log('Server is up nd running');
});
