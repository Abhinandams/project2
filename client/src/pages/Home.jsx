import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/fetch-news/?topic=technology') // Django endpoint
      .then(res => setArticles(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Summarized News</h1>
      {articles.map((a, i) => (
        <div key={i} className="border p-4 mb-2 rounded">
          <h2 className="text-xl font-semibold">{a.title}</h2>
          <p className="text-gray-700">{a.summary}</p>
          <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            Read Full
          </a>
        </div>
      ))}
    </div>
  );
}

export default Home;
