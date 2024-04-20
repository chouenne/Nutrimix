import React, { useState, useEffect } from "react";
import axiosInstance from "./axios";
import { Link } from "react-router-dom";
import "../../css/userProfile.css";
import Footer from "./Footer";
import Typography from "@mui/material/Typography";
import Logo from "./Logo.jsx";
import UserControl from "./UserControl.jsx";
import {
    Box, TextField, Select, MenuItem, Button, IconButton
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const RecipeList = () => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newPost, setNewPost] = useState({
        title: "",
        category: "",
        ingredient: "",
        excerpt: "",
        content: "",
        image: null,
        maxCookingTime: "",
    });
    const [categories, setCategories] = useState([]);
    const [editingPostId, setEditingPostId] = useState(null);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await axiosInstance.get("", {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("access_token")}`,
                    },
                });
                setPosts(response.data || []);
                setLoading(false);
            } catch (error) {
                setError("Error fetching posts. Please try again later.");
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            // Fetch categories from API
            try {
                const response = await axiosInstance.get("/category/");
                console.log(response, "aa");
                setCategories(response.data || []);
            } catch (error) {
                console.error("Error fetching categories:", error);
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

        checkAuthentication();
        fetchUserPosts();
        fetchCategories(); // Call the function to fetch categories
    }, []);

    const handleDelete = async (postId) => {
        try {
            await axiosInstance.delete(`/${postId}/`);
            const response = await axiosInstance.get("/users/users/current/", {
                headers: {
                    Authorization: `JWT ${localStorage.getItem("access_token")}`,
                },
            });
            setPosts(response.data.posts || []);
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
        window.location.reload();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewPost((prevState) => ({
            ...prevState,
            [name]: name === "category" ? value : value,
            maxCookingTime:
                name === "maxCookingTime" ? parseInt(value) : prevState.maxCookingTime || 0,
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setNewPost((prevState) => ({
            ...prevState,
            image: file,
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
            formData.append("max_cooking_time", newPost.maxCookingTime);

            await axiosInstance.post("", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `JWT ${localStorage.getItem("access_token")}`,
                },
            });

            const response = await axiosInstance.get("/users/users/current/", {
                headers: {
                    Authorization: `JWT ${localStorage.getItem("access_token")}`,
                },
            });
            setPosts(response.data.posts || []);
            setNewPost({
                title: "",
                category: "",
                ingredient: "",
                excerpt: "",
                content: "",
                image: null,
                maxCookingTime: "",
            });
        } catch (error) {
            console.error("Failed to add post:", error);
        }
        window.location.reload();
    };

    const handleEdit = (postId) => {
        setEditingPostId(postId);
        const postToEdit = posts.find((post) => post.id === postId);
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
            formData.append("max_cooking_time", newPost.maxCookingTime);

            await axiosInstance.put(`/${editingPostId}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `JWT ${localStorage.getItem("access_token")}`,
                },
            });

            const response = await axiosInstance.get("/users/users/current/", {
                headers: {
                    Authorization: `JWT ${localStorage.getItem("access_token")}`,
                },
            });
            setPosts(response.data.posts || []);
            setNewPost({
                title: "",
                category: "",
                ingredient: "",
                excerpt: "",
                content: "",
                image: null,
            });
            setEditingPostId(null);
        } catch (error) {
            console.error("Failed to edit post:", error);
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
        <div className="profile-container">

            <header className="profile-header-flex">
                <Logo />
                <UserControl />
            </header>
            <div style={{ borderBottom: '0.5px solid #CCCCCC', marginTop: '3%', marginBottom: '3%' }}></div>

            <h2>My profile</h2>
            <ul>
                <li>username: {user.user_name}</li>
                <li>email: {user.email}</li>
            </ul>


            <Box width="50%" className="textfield-container">
                <h2>{editingPostId ? "Edit Post" : "Add New Recipe"}</h2>
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={newPost.title}
                    onChange={handleChange}
                    placeholder="Title"
                    variant="outlined"
                    margin="dense"
                // sx={{ borderRadius: '25px' }} 
                />
                <Select
                    fullWidth
                    label="Category"
                    name="category"
                    value={newPost.category}
                    onChange={handleChange}
                    placeholder="Category"
                    variant="outlined"
                    margin="dense"
                >
                    <MenuItem value="">
                        <em>Select Category</em>
                    </MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                    ))}
                </Select>
                <TextField
                    fullWidth
                    label="Ingredient"
                    name="ingredient"
                    value={newPost.ingredient}
                    onChange={handleChange}
                    placeholder="Ingredient"
                    variant="outlined"
                    margin="dense"
                />
                <TextField
                    fullWidth
                    label="Excerpt"
                    name="excerpt"
                    value={newPost.excerpt}
                    onChange={handleChange}
                    placeholder="Excerpt"
                    variant="outlined"
                    margin="dense"
                />
                <TextField
                    fullWidth
                    label="Content"
                    name="content"
                    value={newPost.content}
                    onChange={handleChange}
                    placeholder="Content"
                    variant="outlined"
                    margin="dense"
                />
                <input type="file" onChange={handleImageChange} />
                <Select
                    fullWidth
                    label="Max Cooking Time"
                    name="maxCookingTime"
                    value={newPost.maxCookingTime}
                    onChange={handleChange}
                    variant="outlined"
                    margin="dense"
                    defaultValue=""
                    // Adding style to change the color of the placeholder text
                    sx={{
                        "& .MuiSelect-placeholder": {
                            color: "rgba(0, 0, 0, 0.54)", // Adjust the color as needed
                        },
                    }}
                >
                    <MenuItem value="" disabled>
                        Select Max Cooking Time
                    </MenuItem>
                    <MenuItem value="5">5 mins</MenuItem>
                    <MenuItem value="10">10 mins</MenuItem>
                    <MenuItem value="15">15 mins</MenuItem>
                    <MenuItem value="20">20 mins</MenuItem>
                </Select>

                {editingPostId ? (
                    <Button
                        variant="contained"
                        // color="primary"
                        onClick={handleSaveEdit}
                        className="custom-button"
                    >
                        Save Edit
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        // color="primary"
                        onClick={handleAddPost}
                        className="custom-button"
                    >
                        Add
                    </Button>
                )}

            </Box>



            <h2>Manage my recipe released</h2>
            <div className="recipe-list">
                {posts.map((post) => (
                    <div key={post.id} className="recipe-card">
                        <Link to={`/recipe/${post.id}`} className="recipe-link">
                            {post.image && <img src={post.image} alt={post.title} />}
                            <h3>{post.title}</h3>
                            <p>{post.author}</p>
                        </Link>
                        <>
                            <button onClick={() => handleDelete(post.id)} className="icon-button delete-button">
                                <DeleteIcon />
                            </button>
                            <button onClick={() => handleEdit(post.id)} className="icon-button edit-button">
                                <EditIcon />
                            </button>
                        </>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default RecipeList;