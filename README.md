# Sideline Web Scraper

A full stack MERN application that scrapes the New York Times sports section for articles. Users can sign in or register an account to read, save, and delete articles.

## Installation

1. Clone repo
2. Run npm install
3. Create a .env file. You'll need to add two things: MONGO_PW= and TOKEN_SECRET=
4. For TOKEN_SECRET=, enter any combination and length of letters and/or numbers after the equal sign. This is for creating an authentication token.
5. Create Mongo DB Atlas cluster
   1. Create user, set password, and add IP address
   2. Add password to MONGO_PW= in the .env file
   3. Navigate to test folder and inside db.js file update the MONGO_URI string with your own MONGO_URI info
6. Run command: npm run dev (This will run Concurrently and nodemon on both client and server)

## Features:

- REST API
- JWT Authentication
- Bootstrap 4
- MERN: Mongo DB, Express, React, and Node
- React Hooks and Context API
- MVC design pattern
- Web scraping with Cheerio
