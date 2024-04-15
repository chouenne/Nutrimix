import React, { useState } from 'react';
import Header from '../components/HomePageComponents/Header';
import FilterButton from '../components/HomePageComponents/FilterButton';
import Footer from '../components/HomePageComponents/Footer';
import RecipeList from '../components/HomePageComponents/RecipeList';
import Bigbanner from '../components/HomePageComponents/Bigbanner';

function Home() {
  const [searchQuery, setSearchQuery] = useState(''); // State to hold search query

  return (
    <div>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> {/* Pass searchQuery and setSearchQuery to Header */}
      <div style={{ display: 'flex' }}>
      </div>
      <Bigbanner></Bigbanner>
      <RecipeList searchQuery={searchQuery} /> {/* Pass searchQuery as prop to RecipeList */}
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Home;



