/* eslint-disable-next-line */
import should from 'should';
/* eslint-disable-next-line */
import sinon from 'sinon';
import bookController from '../controllers/booksController';

describe('Book Controller Tests:', () => {
  describe('Post', () => {
    it('should not allow an empty title on post', () => {
      /* eslint-disable-next-line */
      const Book = function(book) {
        this.save = () => {};
      };

      const req = {
        body: {
          author: 'Jon',
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = bookController(Book);
      controller.post(req, res);

      res.status
        .calledWith(400)
        .should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});
