import { useState, useEffect } from "react";
import axios from "axios";

export default function Summarizer() {
  const [articles, setArticles] = useState([]);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

 const apiKey = process.env.REACT_APP_NEWS_API_KEY;

useEffect(() => {
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;

    async function fetchNews() {
      try {
        const response = await fetch(
  `https://newsapi.org/v2/top-headlines?country=in&apiKey=9d2b5a9641814a41822794f77f19b099`);
        const data = await response.json();
        setArticles(data.articles);
        console.log(data.articles);
        console.log("Articles from API:", articles);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      }
    }

    fetchNews();
  }, []);



  const summarizeArticle = async (text) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/summarize/", {
        text: text,
      });
      setSummary(response.data.summary);
    } catch (err) {
      alert("Summarization failed.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI News Summarizer</h1>
      {articles.map((article, index) => (
        <div key={index} className="border p-3 mb-4 rounded">
          <h2 className="font-semibold">{article.title}</h2>
          <p>{article.description}</p>
          <button
            onClick={() => summarizeArticle(article.content || article.description)}
            className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
          >
            Summarize This
          </button>
        </div>
      ))}

      {loading && <p className="mt-4">Summarizing...</p>}

      {summary && (
        <div className="mt-6 p-4 bg-gray-100 border rounded">
          <h2 className="font-bold text-lg">Summary</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}
