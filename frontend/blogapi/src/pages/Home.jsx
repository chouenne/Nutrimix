import React, { useState } from 'react';
import Header from '../components/HomePageComponents/Header';
import FilterButton from '../components/HomePageComponents/FilterButton';
import Footer from '../components/HomePageComponents/Footer';
import RecipeList from '../components/HomePageComponents/RecipeList';

function Home() {
  const [searchQuery, setSearchQuery] = useState(''); // State to hold search query

  return (
    <div>
      <Header setSearchQuery={setSearchQuery} /> {/* Pass setSearchQuery function to Header */}
      <div style={{ display: 'flex' }}>
       <FilterButton />
      </div>
      <RecipeList searchQuery={searchQuery} /> {/* Pass searchQuery as prop to RecipeList */}
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Home;

