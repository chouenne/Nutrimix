import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SortMenu from "./Sortmenu"; // Import the SortMenu component
import FilterButton from "./FilterButton";
import "../../css/RecipeList.css";

const RecipeList = ({ searchQuery }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [maxCookingTimeFilter, setMaxCookingTimeFilter] = useState(20); // Initial value for max cooking time filter
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

        const selectedCategoryFromLocalStorage = localStorage.getItem("selectedCategory");
        if (selectedCategoryFromLocalStorage) {
            setSelectedCategory(selectedCategoryFromLocalStorage);
        }

        fetchPosts();
    }, []);

    console.log(posts);


    useEffect(() => {
        localStorage.setItem("selectedCategory", selectedCategory);
    }, [selectedCategory]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleApplyFilter = (filterOptions) => {
        console.log("Filter options:", filterOptions);
        console.log("Max cooking time filter set to:C", filterOptions.maxCookingTime);
        setMaxCookingTimeFilter(filterOptions.maxCookingTime);
  
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log("Max Cooking Time Filter:", maxCookingTimeFilter);

    const filteredPosts = selectedCategory === "All"
        ? posts.filter(post =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (maxCookingTimeFilter === 0 || post.max_cooking_time <= maxCookingTimeFilter)
          )
        : posts.filter(post =>
            post.category === selectedCategory &&
            (maxCookingTimeFilter === 0 || post.max_cooking_time <= maxCookingTimeFilter)
          );

    return (
        <div>
            <h2>Recipe</h2>
            <FilterButton onApplyFilter={handleApplyFilter} />
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
