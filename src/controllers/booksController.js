export default function booksController(Book) {
  async function post(req, res) {
    const book = new Book(req.body);
    if (!req.body.title) {
      res.status(400);
      return res.send('Title is required');
    }

    try {
      await book.save();
      res.status(201);

      return res.json(book);
    } catch (error) {
      return res.send(error);
    }
  }

  async function get(req, res) {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    try {
      console.log('about to query ********************************');
      const books = await Book.find(query);
      console.log(books);

      const returnBooks = books.map(book => {
        const newBook = book.toJSON();
        newBook.links = {};
        newBook.links.self = `${req.protocol}://${req.headers.host}/api/books/${book._id}`;
        return newBook;
      });
      return res.json(returnBooks);
    } catch (error) {
      return res.send(error);
    }
  }

  return { post, get };
}
