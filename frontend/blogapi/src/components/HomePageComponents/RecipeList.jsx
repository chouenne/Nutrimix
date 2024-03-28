import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/RecipeList.css";

const RecipeList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/");
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching posts. Please try again later.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Recipe</h2>
      <div className="recipe-list">
        {posts.map((post) => (
          <div key={post.id} className="recipe-card">
            <Link to={`/recipe/${post.id}`}>
              {post.image && <img src={post.image} alt={post.title} />}
              <h3>{post.title}</h3>
              <p>{post.author}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
