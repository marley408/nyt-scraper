import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../App.css';

const SavedArticles = () => {
  const [savedArticles, setSavedArticles] = useState([]);
  console.log(`articles: ${savedArticles}`);

  useEffect(() => {
    const fetchSavedArticles = async () => {
      const res = await fetch('/api/articles/saved-articles');
      const data = await res.json();

      console.log(res);
      setSavedArticles(data);
    };

    fetchSavedArticles();
  }, []);

  return (
    <div className="saved-page-container">
      <Navbar />
      <div className="card-container">
        {savedArticles.map((articles, index) => {
          return (
            <div className="container">
              <div className="row">
                <div className="card col">
                  <div key={index} className="card-body">
                    <h5 className="card-title">{articles.title}</h5>
                    <p className="card-text">{articles.summary}</p>
                    <a href={articles.link} className="btn btn-danger">
                      View
                    </a>
                    <button className="btn btn-danger">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavedArticles;
