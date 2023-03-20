const BASEURL = 'https://openlibrary.org/search.json?q=';

module.exports = {
  searchBooks: async (req, res) => {
    try {
      const { query } = req.body;
      const newQuery = query.replaceAll(' ', '+');

      console.log(`${BASEURL}${newQuery}`);
      const response = await fetch(`${BASEURL}${newQuery}`);
      const json = await response.json();

      res.status(200).json(json.docs);
    } catch (error) {
      res
        .status(400)
        .json({ error: 'Something went wrong. Please try again.' });
    }
  },
};
