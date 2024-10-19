import React, { useState, useEffect } from 'react';
import Card from './Card';
import Loader from './Loader';

const CatListInfinite = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchCats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=${page}&order=Desc`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setCats((prevCats) => [...prevCats, ...data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <div className="single-column">
        {cats.map((cat) => (
          <Card key={cat.id} image={cat} />
        ))}
      </div>

      {loading && <Loader />}
      {!loading && hasMore && (
        <button onClick={fetchCats} className="load-more">
          Load More
        </button>
      )}

      {!hasMore && <p>No more images to load</p>}
    </div>
  );
};

export default CatListInfinite;
