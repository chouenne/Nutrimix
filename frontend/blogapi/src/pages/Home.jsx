import React from 'react';
import Header from '../components/HomePageComponents/Header';
import Sortmenu from '../components/HomePageComponents/Sortmenu';
import FilterButton from '../components/HomePageComponents/FilterButton';


function Home() {
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
    </div>

  )
}

export default Home

