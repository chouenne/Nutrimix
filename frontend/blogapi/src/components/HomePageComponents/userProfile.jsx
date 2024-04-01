import React, { useState, useEffect } from "react";
import axiosInstance from "./axios";
import { Link } from "react-router-dom";
import "../../css/RecipeList.css";

const RecipeList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newPost, setNewPost] = useState({
        title: "",
        category: "",
        ingredient: "",
        excerpt: "",
        content: "",
        image: null 
    });
    const [categories, setCategories] = useState([]);
  
    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await axiosInstance.get('', {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem('access_token')}`
                    }
                });
                setPosts(response.data || []);
                setLoading(false);
            } catch (error) {
                setError("Error fetching posts. Please try again later.");
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, []);

    // Extract unique categories from posts
    useEffect(() => {
        const uniqueCategories = [...new Set(posts.map(post => post.category))];
        setCategories(uniqueCategories);
    }, [posts]);

    const handleDelete = async (postId) => {
        try {
            await axiosInstance.delete(`/${postId}/`);
            const response = await axiosInstance.get('/users/users/current/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('access_token')}`
                }
            });
            setPosts(response.data.posts || []);
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewPost(prevState => ({
            ...prevState,
            [name]: value
        }));
        
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setNewPost(prevState => ({
            ...prevState,
            image: file
        }));
    };

    const handleAddPost = async () => {
        try {
            const formData = new FormData();
            formData.append("title", newPost.title);
            formData.append("category", newPost.category);
            formData.append("ingredient", newPost.ingredient);
            formData.append("excerpt", newPost.excerpt);
            formData.append("content", newPost.content);
            formData.append("image", newPost.image);

            await axiosInstance.post('', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `JWT ${localStorage.getItem('access_token')}`
                }
            });

            const response = await axiosInstance.get('/users/users/current/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('access_token')}`
                }
            });
            setPosts(response.data.posts || []);
            setNewPost({
                title: "",
                category: "",
                ingredient: "",
                excerpt: "",
                content: "",
                image: null 
            });
        } catch (error) {
            console.error('Failed to add post:', error);
        }
        window.location.reload()
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
            <div className="recipe-list">
                {posts.map((post) => (
                    <div key={post.id} className="recipe-card">
                        <Link to={`/recipe/${post.id}`}>
                            {post.image && <img src={post.image} alt={post.title} />}
                            <h3>{post.title}</h3>
                            <p>{post.author}</p>
                        </Link>
                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </div>
                ))}
            </div>
            <div>
                <h2>Add New Post</h2>
                <input type="text" name="title" value={newPost.title} onChange={handleChange} placeholder="Title" />
                <select name="category" value={newPost.category} onChange={handleChange}>
                    <option value="">Select Category</option>
                    {categories.map((category, index) => {
                        console.log("Category:", category.name); 
                        return (
                            <option key={index} value={category}>{category}</option>
                        )
                    })}
                </select>
                <input type="text" name="ingredient" value={newPost.ingredient} onChange={handleChange} placeholder="Ingredient" />
                <input type="text" name="excerpt" value={newPost.excerpt} onChange={handleChange} placeholder="Excerpt" />
                <input type="text" name="content" value={newPost.content} onChange={handleChange} placeholder="Content" />
                <input type="file" onChange={handleImageChange} />
                <button onClick={handleAddPost}>Add Post</button>
            </div>
            <button onClick={() => window.history.back()}>Back</button>

        </div>
    );
};

export default RecipeList;
