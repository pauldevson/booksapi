import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import bookRouter from './routes/bookRouter';

dotenv.config();

const app = express();

const { ENV, CONNECTION_STRING } = process.env;

if (ENV === 'Test') console.log('This is a test');
console.log(CONNECTION_STRING);

const db = mongoose.connect(
  'mongodb://booksapidb.documents.azure.com:10255/booksApi?ssl=true&replicaSet=globaldb',
  {
    auth: {
      user: 'booksapidb',
      password:
        'JP0HYsqZGBngu5o6AShYHX6iwNF5n6nbWLjPVrrus9YEii3JH7ya39sJbCAJxL0EU7dnRhbjkLbwOWdnSKpHjA==',
    },
    useNewUrlParser: true,
  }
);

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.json({
    books: `https://${req.headers.host}/api/books`,
  });
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
