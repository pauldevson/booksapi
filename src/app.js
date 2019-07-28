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

const db = mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
});

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

export default app;
