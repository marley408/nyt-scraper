import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import { UserContext } from '../components/UserContext';
import '../App.css';
import { Redirect } from 'react-router';

const Home = () => {
  const [articles, setArticles] = useState([]);

  const context = useContext(UserContext);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch('/api/articles/scrape', {
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      });
      const data = await res.json();

      // console.log(res);
      setArticles(data);
    };

    fetchArticles();
  }, [context.id]);

  const saveButton = async e => {
    e.preventDefault();
    // console.log(e.target.parentNode);
    const clickedArticle = e.target.parentNode;

    await fetch(`/api/articles/save?userId=${context.id}`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        title: clickedArticle.querySelector('.card-title').textContent,
        summary: clickedArticle.querySelector('.card-text').textContent,
        link: clickedArticle.querySelector('a').href
      })
    });

    // remove article after its saved
    clickedArticle.remove();
  };

  return context.id ? (
    <div className="home-page-container">
      <Navbar />
      <div className="card-container">
        {articles.map((articles, index) => {
          return (
            <div className="container" key={index}>
              <div className="row">
                <div className="card col">
                  <div className="card-body">
                    <h5 className="card-title">{articles.title}</h5>
                    <p className="card-text">{articles.summary}</p>
                    <a
                      href={`https://www.nytimes.com${articles.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-danger"
                    >
                      View
                    </a>
                    <button onClick={saveButton} className="btn btn-danger">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default Home;
