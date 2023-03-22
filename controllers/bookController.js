const BASEURL = 'https://books.googleapis.com/books/v1/volumes?q=';

module.exports = {
  searchBooks: async (req, res) => {
    try {
      const query = req.params.query.replaceAll(' ', '%20');

      const response = await fetch(
        `${BASEURL}${query}&maxResults=40&key=${process.env.GOOGLE_API_KEY}`
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
};
