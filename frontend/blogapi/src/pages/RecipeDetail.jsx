import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams hook
import axios from 'axios';

const RecipeDetail = () => {
  const { recipeId } = useParams(); // Use useParams hook to access route parameters
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/${recipeId}/`); // Use recipeId from useParams
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching recipe details. Please try again later.');
        setLoading(false);
      }
    };

    fetchPost();
  }, [recipeId]); // Use recipeId in the dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div key={post.id} className="recipe-detail">
      {/* Display recipe image */}
      {post.image && <img src={post.image} alt={post.title} />}

      {/* Display recipe title */}
      <h2>{post.title}</h2>

      {/* Display recipe author */}
      <p>By: {post.author}</p>

      {/* Display recipe description */}
      <p>{post.excerpt}</p>

      {/* Display recipe ingredients */}
      {/* <h3>Ingredients:</h3>
      <ul>
        {post.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul> */}

      {/* Display recipe content */}
      <h3>Contents:</h3>
      <p>{post.content}</p>
    </div>
  );
};

export default RecipeDetail;
