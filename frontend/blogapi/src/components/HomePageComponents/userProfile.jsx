import React, { useState, useEffect } from "react";
import axiosInstance from "./axios"; // 导入 axios 实例
import { Link } from "react-router-dom";
import "../../css/RecipeList.css";

const RecipeList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await axiosInstance.get('', {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem('access_token')}`
                    }
                });
                setPosts(response.data);
                setLoading(false);
            } catch (error) {
                setError("Error fetching posts. Please try again later.");
                setLoading(false);
            }
        };

        fetchUserPosts();
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
