import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/RecipeList.css'; 

const RecipeList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const fetchAuthorName = async (authorId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/users/${authorId}`);
      return response.data.name; // Assuming the user object has a 'name' property
    } catch (error) {
      console.error('Error fetching author name:', error);
      return 'Unknown Author';
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Recipes</h2>
      <div className="recipe-list">
        {posts.map(post => (
          <div key={post.id} className="recipe-card">
            {post.image && <img src={post.image} alt={post.title} />}
            <h3>{post.title}</h3>
            <p>{post.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
