const request = require('request');
const cheerio = require('cheerio');
var express = require('express');

// A GET route for scraping the nytimes website

request('https://www.nytimes.com/section/sports', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);

    // An empty array to save the data that we'll scrape
    var results = [];

    // With cheerio, find each p-tag with the "title" class
    // (i: iterator. element: the current element)
    $('.css-4jyr1y').each(function(i, element) {
      // Save the text of the element in a "title" variable
      var title = $(element)
        .find('.css-1dq8tca')
        .text()
        .trim();

      var summary = $(element)
        .find('.css-1echdzn')
        .text()
        .trim();

      // In the currently selected element, look at its child elements (i.e., its a-tags),
      // then save the values for any "href" attributes that the child elements may have
      var link = $(element)
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
    // res.send(results);
  }
});
