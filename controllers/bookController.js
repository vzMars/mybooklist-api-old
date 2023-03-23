const BASEURL = 'https://books.googleapis.com/books/v1/volumes';

module.exports = {
  searchBooks: async (req, res) => {
    try {
      const query = req.params.query.replaceAll(' ', '%20');

      const response = await fetch(
        `${BASEURL}?q=${query}&maxResults=40&key=${process.env.GOOGLE_API_KEY}`
      );
      const json = await response.json();
      const books = json.items ? json.items : [];

      res.status(200).json(books);
    } catch (error) {
      res
        .status(400)
        .json({ error: 'Something went wrong. Please try again.' });
    }
  },
  bookDetails: async (req, res) => {
    try {
      const { id } = req.params;

      const response = await fetch(
        `${BASEURL}/${id}?key=${process.env.GOOGLE_API_KEY}`
      );
      const json = await response.json();

      if (!response.ok) {
        throw Error('The book ID could not be found.');
      }

      res.status(200).json(json.volumeInfo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
