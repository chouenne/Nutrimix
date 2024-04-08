import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../css/RecipeDetail.css";

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/${recipeId}/`);
        setPost(response.data);
        setLikes(response.data.likes);
        setIsLiked(response.data.isLiked);
        setIsBookmarked(response.data.isBookmarked);
        setLoading(false);
      } catch (error) {
        setError('Error fetching recipe details. Please try again later.');
        setLoading(false);
      }
    };

    fetchPost();

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/posts/${recipeId}/comments/`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [recipeId]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      // console.log(accessToken,"accessToken")
      if (!accessToken) {
        console.error('Access token not found in local storage.');
        return; 
      }
      const config = {
        headers: {
          'Authorization': `JWT ${localStorage.getItem('access_token')}`,
        }
      };

      const response = await axios.post(`http://127.0.0.1:8000/api/posts/${recipeId}/comments/`, { post: recipeId, content: comment }, config);
      console.log(response, "ddd");
      setComments(prevComments => {
        if (!Array.isArray(prevComments)) {
          return [response.data];
        }
        return [...prevComments, response.data];
      });
      setComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleLike = async () => {
    try {
      if (!isLiked) {
        await axios.post(`http://127.0.0.1:8000/api/${recipeId}/like/`);
        setLikes(likes + 1);
        setIsLiked(true);
      } else {
        await axios.delete(`http://127.0.0.1:8000/api/${recipeId}/like/`);
        setLikes(likes - 1);
        setIsLiked(false);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleBookmark = async () => {
    try {
      if (!isBookmarked) {
        await axios.post(`http://127.0.0.1:8000/api/${recipeId}/bookmark/`);
        setIsBookmarked(true);
      } else {
        await axios.delete(`http://127.0.0.1:8000/api/${recipeId}/bookmark/`);
        setIsBookmarked(false);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div key={post.id} className="recipe-detail">
      {post.image && <img src={post.image} alt={post.title} />}
      <h2>{post.title}</h2>
      <p>By: {post.author}</p>
      <p>{post.excerpt}</p>
      <h3>Contents:</h3>
      <p>{post.content}</p>

      {/* Display comments */}
      <h3>Comments:</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.content}</li>
        ))}
      </ul>

      {/* Comment form */}
      <input type="text" value={comment} onChange={handleCommentChange} />
      <button onClick={handleSubmitComment}>Submit Comment</button>

      {/* Like button */}
      <button onClick={handleLike}>{isLiked ? 'Unlike' : 'Like'}</button>
      <span>Likes: {likes}</span>

      {/* Bookmark button */}
      <button onClick={handleBookmark}>{isBookmarked ? 'Remove Bookmark' : 'Bookmark'}</button>
    </div>
  );
};

export default RecipeDetail;
