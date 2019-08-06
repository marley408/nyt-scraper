const router = require('express').Router();
const request = require('request');
const cheerio = require('cheerio');
const User = require('../models/User');
const Article = require('../models/Article');

// A GET route for scraping the nytimes website
router.get('/scrape', (req, res) => {
  request('https://www.nytimes.com/section/sports', (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      // An empty array to save the data that we'll scrape
      const results = [];

      // With cheerio, find each p-tag with the "title" class
      // (i: iterator. element: the current element)
      $('.css-4jyr1y').each(function(i, element) {
        // Save the text of the element in a "title" constiable
        const title = $(element)
          .find('.css-1dq8tca')
          .text()
          .trim();

        const summary = $(element)
          .find('.css-1echdzn')
          .text()
          .trim();

        // In the currently selected element, look at its child elements (i.e., its a-tags),
        // then save the values for any "href" attributes that the child elements may have
        const link = $(element)
          .find('a')
          .attr('href');

        // Save these results in an object that we'll push into the results array we defined earlier
        results.push({
          title: title,
          summary: summary,
          link: link
        });
      });

      // Log the results once you've looped through each of the elements found with cheerio

      console.log(results);
      res.send(results);
    }
  });
});

// Save an article
router.post('/save', async (req, res) => {
  const { title, summary, link } = req.body;

  try {
    // find article
    let article = await Article.findOne({ title });

    // create if doesnt exist
    if (!article) {
      article = new Article({
        title,
        summary,
        link
      });

      await article.save();
    }

    const user = await User.findOneAndUpdate(
      { _id: '5d48da6f18b7df0c9fd60cf8' },
      { $push: { articles: article } }
    );

    console.log(user);

    res.json(article);
  } catch (err) {
    console.log(err);
    res.status(500).json('server error');
  }
});

module.exports = router;
