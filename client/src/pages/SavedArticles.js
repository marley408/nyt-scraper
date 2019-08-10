import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../App.css';

const SavedArticles = () => {
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const fetchSavedArticles = async () => {
      const res = await fetch('/api/articles/saved-articles');
      const data = await res.json();

      setSavedArticles(data);
    };

    fetchSavedArticles();
  }, []);

  const deleteButton = async e => {
    e.preventDefault();
    const clickedArticle = e.target.parentNode;

    await fetch('/api/articles/delete', {
      mode: 'cors',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
        // 'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        title: clickedArticle.querySelector('.card-title').textContent
      })
    });

    // remove article after its saved
    clickedArticle.remove();
  };

  return (
    <div className="saved-page-container">
      <Navbar />
      <div className="card-container">
        {savedArticles.map((articles, index) => {
          return (
            <div className="container" key={index}>
              <div className="row">
                <div className="card col">
                  <div key={index} className="card-body">
                    <h5 className="card-title">{articles.title}</h5>
                    <p className="card-text">{articles.summary}</p>
                    <a href={articles.link} className="btn btn-danger">
                      View
                    </a>
                    <button onClick={deleteButton} className="btn btn-danger">
                      Delete
                    </button>
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
