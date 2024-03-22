import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts']; 

export default function SortMenu({ onSelectCategory }) {
  return (
    <ButtonGroup variant="text" color="primary" aria-label="Sort by">
      {categories.map((category, index) => (
        <Button key={index} onClick={() => onSelectCategory(category)}>
          {category}
        </Button>
      ))}
    </ButtonGroup>
  );
}