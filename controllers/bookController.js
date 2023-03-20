const BASEURL = 'https://openlibrary.org/search.json?q=';

module.exports = {
  searchBooks: async (req, res) => {
    try {
      const query = req.params.query.replaceAll(' ', '+');

      const response = await fetch(`${BASEURL}${query}`);
      const json = await response.json();

      res.status(200).json(json.docs);
    } catch (error) {
      res
        .status(400)
        .json({ error: 'Something went wrong. Please try again.' });
    }
  },
};
