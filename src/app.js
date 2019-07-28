import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import bookRouter from './routes/bookRouter';

dotenv.config();

const app = express();

if (process.env.ENV === 'Test') {
  console.log('This is a test');
  const db = mongoose.connect('mongodb://localhost/bookAPI_Test', {
    useNewUrlParser: true,
  });
} else {
  console.log('This is for real');
  const db = mongoose.connect('mongodb://localhost/bookAPI', {
    useNewUrlParser: true,
  });
}

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.json({
    books: `${req.protocol}://${req.headers.host}/api/books`,
  });
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
