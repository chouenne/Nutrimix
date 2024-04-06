import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SortMenu from "./Sortmenu"; // Import the SortMenu component
import "../../css/RecipeList.css";

const RecipeList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

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

    // 从本地存储中加载上次选定的分类
    const selectedCategoryFromLocalStorage = localStorage.getItem("selectedCategory");
    if (selectedCategoryFromLocalStorage) {
      setSelectedCategory(selectedCategoryFromLocalStorage);
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    // 每次 selectedCategory 变化时更新本地存储
    localStorage.setItem("selectedCategory", selectedCategory);
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const filteredPosts = selectedCategory === "All" ? posts : posts.filter(post => post.category === selectedCategory);

  return (
    <div>
      <h2>Recipe</h2>
      <SortMenu onSelectCategory={handleCategorySelect} />
      <div className="recipe-list">
        {filteredPosts.map((post) => (
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
