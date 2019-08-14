const router = require('express').Router();
const request = require('request');
const cheerio = require('cheerio');
const User = require('../models/User');
const Article = require('../models/Article');
const verify = require('./verifyToken');

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

      // console.log(results);
      res.send(results);
    }
  });
});

// Save an article
router.post('/save', verify, async (req, res) => {
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

    // check if user already has article saved. will return null if user does not
    const user = await User.findById(req.query.userId);

    // grab all of the user's articles and then check to see if a specific article is in the array
    const userArticles = user.articles;
    const userWithArticle = userArticles.includes(article.id);

    console.log(userWithArticle);

    // if user doesnt have the article then add it to their collection
    if (!userWithArticle) {
      await user.updateOne({ $push: { articles: article } });
    }

    // const user = await User.findOneAndUpdate(
    //   { _id: '5d4a37a42b1dd905b9500ce0' },
    //   { $push: { articles: article } }
    // );

    res.json(article);
  } catch (err) {
    console.log(err);
    res.status(500).json('server error');
  }
});

// GET route for displaying saved articles for a specfic user
router.get('/saved-articles', verify, async (req, res) => {
  const user = await User.findById(req.query.userId).populate('articles');

  res.json(user.articles);
});

// route for deleting an article
router.delete('/delete', verify, async (req, res) => {
  const title = req.body.title;

  try {
    // find article by title
    let article = await Article.findOne({ title });
    // find user then remove article from collection
    const user = await User.findOneAndUpdate(
      { _id: req.query.userId },
      { $pull: { articles: { $in: [article] } } }
    );

    console.log(user);

    const response = {
      message: 'Article successfully deleted',
      id: article._id
    };
    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
