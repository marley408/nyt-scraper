import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import { UserContext } from '../components/UserContext';
import '../App.css';
import { Redirect } from 'react-router';

const SavedArticles = () => {
  const [savedArticles, setSavedArticles] = useState([]);

  const context = useContext(UserContext);

  useEffect(() => {
    const fetchSavedArticles = async () => {
      const res = await fetch(
        `/api/articles/saved-articles?userId=${context.id}`,
        {
          headers: {
            'auth-token': localStorage.getItem('token')
          }
        }
      );
      const data = await res.json();

      setSavedArticles(data);
    };

    fetchSavedArticles();
  }, [context.id]);

  const deleteButton = async e => {
    e.preventDefault();
    const clickedArticle = e.target.parentNode;

    await fetch(`/api/articles/delete?userId=${context.id}`, {
      mode: 'cors',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        title: clickedArticle.querySelector('.card-title').textContent
      })
    });

    // remove article after its saved
    clickedArticle.remove();
  };

  return context.id ? (
    <div className="saved-page-container">
      <Navbar />
      <div className="card-container">
        {savedArticles.length > 0 ? (
          savedArticles.map((articles, index) => {
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
          })
        ) : (
          <h1 className="text-center">You haven't saved any articles yet.</h1>
        )}
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default SavedArticles;
