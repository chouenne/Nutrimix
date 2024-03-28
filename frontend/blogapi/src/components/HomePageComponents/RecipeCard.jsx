import React from 'react';

const RecipeCard = ({ imageUrl, title, chefName }) => {
  return (
    <div className="recipe-card">
      <img src={imageUrl} alt={title} />
      <div className="recipe-details">
        <h2>{title}</h2>
        <p>{chefName}</p>
      </div>
    </div>
  );
}

export default RecipeCard;
