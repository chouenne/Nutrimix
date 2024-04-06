import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import axios from 'axios';

export default function Sortmenu({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/category/');
<<<<<<< HEAD
        setCategories(['All', ...response.data.map(category => category.name)]);
=======
        setCategories([{ id: null, name: 'All' }, ...response.data]);
>>>>>>> wei
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);


  const handleCategoryClick = (categoryId) => {
    onSelectCategory(categoryId);
  };

  return (
    <ButtonGroup variant="text" color="primary" aria-label="Sort by">
      {categories.map((category, index) => (
<<<<<<< HEAD
        <Button key={index} onClick={() => handleCategoryClick(category)}>
          {category}
=======
        <Button key={index} onClick={() => handleCategoryClick(category.id)}>
          {category.name}
>>>>>>> wei
        </Button>
      ))}
    </ButtonGroup>
  );
}
