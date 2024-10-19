import React from 'react';

const Card = ({ image }) => {
  return (
    <div className="card">
      <img src={image.url} alt="Cat" />
    </div>
  );
};

export default Card;
