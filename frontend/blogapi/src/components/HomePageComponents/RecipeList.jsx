import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SortMenu from "./Sortmenu"; // Import the SortMenu component
import "../../css/RecipeList.css";

const RecipeList = ({ searchQuery }) => {
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

fetchPosts();
}, []);

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
}, [searchQuery]); // Re-fetch posts whenever searchQuery changes

const filteredPosts = posts.filter(post => {
if (searchQuery && searchQuery.trim() !== "") {
return post.title.toLowerCase().includes(searchQuery.toLowerCase());
} else {
return true; // Include all posts if searchQuery is not provided or empty
}
}).filter(post => selectedCategory === "All" || post.category === selectedCategory);

const handleCategorySelect = (category) => {
setSelectedCategory(category);
};

if (loading) {
return <div>Loading...</div>;
}

if (error) {
return <div>{error}</div>;
}

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
