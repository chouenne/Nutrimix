import React, { useState } from 'react';
import Header from '../components/HomePageComponents/Header';
import Sortmenu from '../components/HomePageComponents/Sortmenu';
import FilterButton from '../components/HomePageComponents/FilterButton';
import RecipeCard from '../components/HomePageComponents/RecipeCard';
import Footer from '../components/HomePageComponents/Footer';
import '../css/Home.css'; 

function Home() {

  const initialRecipes = [
    { id: 1, imageUrl: 'recipe1.jpg', title: 'Recipe 1', chefName: 'Chef A' },
    { id: 2, imageUrl: 'recipe2.jpg', title: 'Recipe 2', chefName: 'Chef B' },
    { id: 3, imageUrl: 'recipe3.jpg', title: 'Recipe 3', chefName: 'Chef C' },
    { id: 4, imageUrl: 'recipe3.jpg', title: 'Recipe 4', chefName: 'Chef D' },
    { id: 5, imageUrl: 'recipe3.jpg', title: 'Recipe 5', chefName: 'Chef E' },
    { id: 6, imageUrl: 'recipe3.jpg', title: 'Recipe 6', chefName: 'Chef F' },
    { id: 7, imageUrl: 'recipe3.jpg', title: 'Recipe 7', chefName: 'Chef G' },
    { id: 8, imageUrl: 'recipe3.jpg', title: 'Recipe 8', chefName: 'Chef H' },
    { id: 9, imageUrl: 'recipe3.jpg', title: 'Recipe 9', chefName: 'Chef I' },
    { id: 10, imageUrl: 'recipe3.jpg', title: 'Recipe 10', chefName: 'Chef J' },
    { id: 11, imageUrl: 'recipe3.jpg', title: 'Recipe 11', chefName: 'Chef K' },
    { id: 12, imageUrl: 'recipe3.jpg', title: 'Recipe 12', chefName: 'Chef L' },
    { id: 13, imageUrl: 'recipe1.jpg', title: 'Recipe 1', chefName: 'Chef A' },
    { id: 14, imageUrl: 'recipe2.jpg', title: 'Recipe 2', chefName: 'Chef B' },
    { id: 15, imageUrl: 'recipe3.jpg', title: 'Recipe 3', chefName: 'Chef C' },
    { id: 16, imageUrl: 'recipe3.jpg', title: 'Recipe 4', chefName: 'Chef D' },
    { id: 17, imageUrl: 'recipe3.jpg', title: 'Recipe 5', chefName: 'Chef E' },
    { id: 18, imageUrl: 'recipe3.jpg', title: 'Recipe 6', chefName: 'Chef F' },
    { id: 19, imageUrl: 'recipe3.jpg', title: 'Recipe 7', chefName: 'Chef G' },
    { id: 20, imageUrl: 'recipe3.jpg', title: 'Recipe 8', chefName: 'Chef H' },
    { id: 21, imageUrl: 'recipe3.jpg', title: 'Recipe 9', chefName: 'Chef I' },
    { id: 22, imageUrl: 'recipe3.jpg', title: 'Recipe 10', chefName: 'Chef J' },
    { id: 23, imageUrl: 'recipe3.jpg', title: 'Recipe 11', chefName: 'Chef K' },
    { id: 24, imageUrl: 'recipe3.jpg', title: 'Recipe 12', chefName: 'Chef L' },
  ];

  const [visibleRecipes, setVisibleRecipes] = useState(12); 

  const loadMore = () => {
    setVisibleRecipes(prevVisibleRecipes => prevVisibleRecipes + 12);
  };

  const divStyle = {
    display: 'flex',
  };

  return (
    <div>
      <Header />
      <div style={divStyle}>
        <Sortmenu />
       <FilterButton />
       </div>

       <div className="recipe-grid">
       {initialRecipes.slice(0, visibleRecipes).map(recipe => (
          <RecipeCard
            key={recipe.id}
            imageUrl={recipe.imageUrl}
            title={recipe.title}
            chefName={recipe.chefName}
        />
      ))}
    </div>
    {visibleRecipes < initialRecipes.length && (
        <button onClick={loadMore}>Load More</button>
      )}
       <footer>  <Footer>
    </Footer></footer>
    </div>
   
  

  )
}

export default Home

