import React, { useState } from 'react';
// import Header from '../components/HomePageComponents/Header';
import FilterButton from '../components/HomePageComponents/FilterButton';
import Footer from '../components/HomePageComponents/Footer';
import RecipeList from '../components/HomePageComponents/RecipeList';
import Bigbanner from '../components/HomePageComponents/Bigbanner';
import Headerr from '../components/HomePageComponents/Headerr';


function Home() {
  const [searchQuery, setSearchQuery] = useState(''); // State to hold search query

  return (
      <div style={{ width: '90%', margin: '0 auto', paddingTop: '3%' }}>
        <Headerr searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> {/* Pass searchQuery and setSearchQuery to Header */}
        <div style={{ borderBottom: '0.5px solid #CCCCCC', marginTop: '3%', marginBottom: '3%' }}> {/* Add borderBottom style */}
          {/* Your existing header content */}
        </div>      <div style={{ display: 'flex' }}>
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



