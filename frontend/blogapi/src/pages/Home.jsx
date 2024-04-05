import React, { useState, useEffect } from 'react';
import Header from '../components/HomePageComponents/Header';
import FilterButton from '../components/HomePageComponents/FilterButton';
import Footer from '../components/HomePageComponents/Footer';
import RecipeList from '../components/HomePageComponents/RecipeList';


function Home() {
 
  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
       <FilterButton />
      </div>
      <RecipeList></RecipeList>
       <footer>  <Footer>
    </Footer></footer>
    </div>
   
  )
}

export default Home

