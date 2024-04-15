import React, { useState, useEffect } from "react";
import axiosInstance from "./axios";
import { Link } from "react-router-dom";
import "../../css/userProfile.css";
import Footer from './Footer';
import Header from './Header';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

const RecipeList = () => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newPost, setNewPost] = useState({
        title: "",
        category: "", // Change to store category name instead of ID
        ingredient: "",
        excerpt: "",
        content: "",
        image: null
    });
    const [categories, setCategories] = useState([]);
    const [editingPostId, setEditingPostId] = useState(null);

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

        const fetchCategories = async () => { // Fetch categories from API
            try {
                const response = await axiosInstance.get('/category/');
                // console.log(response, "aa")
                setCategories(response.data || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const checkAuthentication = async () => {
            // Check if access token exists in local storage

            // const accessToken = localStorage.getItem('access_token');
            // if (accessToken) {

            try {
                const response = await axiosInstance.get("/users/users/current/");
                console.log(response, "response111");

                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }

        };

        // Check authentication on component mount
        checkAuthentication();
        fetchUserPosts();
        fetchCategories(); // Call the function to fetch categories
    }, []);

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
        // If the target field is "category", find the corresponding category ID
        const categoryId = categories.find(category => category.name === value)?.id || "";
        console.log(categoryId, "categoryId")
        // Update the newPost state with the category ID
        setNewPost(prevState => ({
            ...prevState,
            [name]: name === "category" ? categoryId : value
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

    const handleEdit = (postId) => {
        setEditingPostId(postId);
        const postToEdit = posts.find(post => post.id === postId);
        setNewPost(postToEdit);
    };

    const handleSaveEdit = async () => {
        try {
            const formData = new FormData();
            formData.append("title", newPost.title);
            formData.append("category", newPost.category);
            formData.append("ingredient", newPost.ingredient);
            formData.append("excerpt", newPost.excerpt);
            formData.append("content", newPost.content);
            formData.append("image", newPost.image);

            await axiosInstance.put(`/${editingPostId}/`, formData, {
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
            setEditingPostId(null);
        } catch (error) {
            console.error('Failed to edit post:', error);
        }
        window.location.reload();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Header></Header>
            <h1>My froflie</h1>
            <Avatar sx={{ bgcolor: deepPurple[500], width: 66, height: 66 }} >{user.user_name}</Avatar>
            {/* <h2>Name:{user.user_name}</h2> */}
            <h2>emial:{user.email}</h2>
            <div className="recipe-list">
                {posts.map((post) => (
                    <div key={post.id} className="recipe-card">
                        <Link to={`/recipe/${post.id}`}>
                            {post.image && <img src={post.image} alt={post.title} />}
                            <h3>{post.title}</h3>
                            <p>{post.author}</p>
                        </Link>
                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                        <button onClick={() => handleEdit(post.id)}>Edit</button>
                    </div>
                ))}
            </div>
            <div>
                <h2>{editingPostId ? "Edit Post" : "Add New Post"}</h2>
                <input type="text" name="title" value={newPost.title} onChange={handleChange} placeholder="Title" />
                <select name="category" value={newPost.category} onChange={handleChange}>
                    <option value="">Select Category</option>
                    {categories.map((category, index) => ( // Render categories from state
                        <option key={index} value={category.name}>{category.name}</option>
                    ))}
                </select>
                <input type="text" name="ingredient" value={newPost.ingredient} onChange={handleChange} placeholder="Ingredient" />
                <input type="text" name="excerpt" value={newPost.excerpt} onChange={handleChange} placeholder="Excerpt" />
                <input type="text" name="content" value={newPost.content} onChange={handleChange} placeholder="Content" />
                <input type="file" onChange={handleImageChange} />
                {editingPostId ? (
                    <button onClick={handleSaveEdit}>Save Edit</button>
                ) : (
                    <button onClick={handleAddPost}>Add Post</button>
                )}
            </div>
            {/* <button onClick={() => window.history.back()}>Back</button> */}
            <Footer></Footer>
        </div>
    );
};

export default RecipeList;
