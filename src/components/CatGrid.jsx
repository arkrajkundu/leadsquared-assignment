import React, { useState } from 'react';
import Card from './Card';
import Loader from './Loader';
import { Link } from 'react-router-dom'


const CatGrid = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Easy Mode</h2>
      <button onClick={fetchCats}>Fetch Cats</button>
      <Link to='/medium'><button>Medium Mode</button></Link>
      <Link to='/hard'><button>Hard Mode</button></Link>
      {loading && <Loader />}
      {error && <p>{error}</p>}
      <div className="grid">
        {cats.length > 0 ? (
          cats.map(cat => <Card key={cat.id} image={cat} />)
        ) : (
          <p>No cats found.</p>
        )}
      </div>
    </div>
  );
};

export default CatGrid;
