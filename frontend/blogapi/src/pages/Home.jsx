import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/HomePageComponents/Header';
import Sortmenu from '../components/HomePageComponents/Sortmenu';
import FilterButton from '../components/HomePageComponents/FilterButton';
import RecipeCard from '../components/HomePageComponents/RecipeCard';
import Footer from '../components/HomePageComponents/Footer';
// import recipesData from '../recipes.json';
import '../css/Home.css'; 

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(12); // Number of initially visible posts

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    setLoading(true);
    // Define your API endpoint URL
    const API_URL = 'http://localhost:8000/api/';

    // Fetch data from the API
    axios.get(API_URL)
      .then(response => {
        // Set the fetched posts to state
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  };

  const handleLoadMore = () => {
    setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 12);
  };

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sortmenu />
       <FilterButton />
      </div>

      <div className="recipe-grid">
      {initialRecipes.slice(0, visiblePosts).map(post => (
          <RecipeCard
            key={post.id}
            imageUrl={post.imageUrl}
            title={post.title}
            chefName={post.chefName}
        />
      ))}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <button
          onClick={handleLoadMore}
          disabled={loading || visiblePosts >= posts.length}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
       <footer>  <Footer>
    </Footer></footer>
    </div>
   
  )
}

export default Home

