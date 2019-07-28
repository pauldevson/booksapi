/* eslint-disable-next-line */
import should from 'should';
/* eslint-disable-next-line */
import request from 'supertest';
import mongoose from 'mongoose';

process.env.ENV = 'Test';

const app = require('../app.js');

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book Crud Test', () => {
  it('should allow a book to be posted and return read and _id', function something(done) {
    this.timeout(10000);
    const bookPost = { title: 'My Book', author: 'Jon', genre: 'Fiction' };

    agent
      .post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach(async () => {
    try {
      await Book.deleteMany({}).exec();
    } catch (error) {
      // console.log(error);
    }
  });

  after(done => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
