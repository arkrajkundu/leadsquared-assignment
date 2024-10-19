import React, { useState, useEffect } from 'react';
import Card from './Card';
import Loader from './Loader';
import { Link } from 'react-router-dom'

const CatList = () => {
  const [allCats, setAllCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;

  useEffect(() => {
    const fetchCats = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=20&page=1&order=Desc`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setAllCats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCats();
  }, []);

  const totalPages = Math.ceil(allCats.length / limit);
  const currentCats = allCats.slice((currentPage - 1) * limit, currentPage * limit);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      {loading && <Loader />}
      {error && <p>{error}</p>}
      <div className="grid">
        {currentCats.length > 0 ? (
          currentCats.map(cat => <Card key={cat.id} image={cat} />)
        ) : (
          !loading && <p>No cats found.</p>
        )}
      </div>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <Link to='/'><button>Easy Mode</button></Link>
      <Link to='/hard'><button>Hard Mode</button></Link>
    </div>
  );
};

export default CatList;