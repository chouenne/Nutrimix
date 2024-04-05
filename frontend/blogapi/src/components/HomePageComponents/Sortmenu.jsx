import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const categories = ['All', 'Main Courses', 'Salads', 'Desserts', 'Snacks']; 

export default function SortMenu({ onSelectCategory }) {

  const handleCategoryClick = (category) => {
    onSelectCategory(category);
  };
  
  return (
    <ButtonGroup variant="text" color="primary" aria-label="Sort by">
      {categories.map((category, index) => (
         <Button key={index} onClick={() => handleCategoryClick(category)}>
         {category}
       </Button>
      ))}
    </ButtonGroup>
  );
}