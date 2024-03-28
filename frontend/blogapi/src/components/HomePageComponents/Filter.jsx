import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Filter({ onApplyFilter }) {
  const [filterOptions, setFilterOptions] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    maxCookingTime: 60,
    ingredientSearch: ''
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilterOptions(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleSliderChange = (event, newValue) => {
    setFilterOptions(prevState => ({
      ...prevState,
      maxCookingTime: newValue
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilterOptions(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const applyFilters = () => {
    onApplyFilter(filterOptions);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Dietary Restrictions
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={filterOptions.vegetarian} onChange={handleCheckboxChange} name="vegetarian" />}
          label="Vegetarian"
        />
        <FormControlLabel
          control={<Checkbox checked={filterOptions.vegan} onChange={handleCheckboxChange} name="vegan" />}
          label="Vegan"
        />
        <FormControlLabel
          control={<Checkbox checked={filterOptions.glutenFree} onChange={handleCheckboxChange} name="glutenFree" />}
          label="Gluten-Free"
        />
      </FormGroup>
      <Typography variant="h6" gutterBottom>
        Maximum Cooking Time
      </Typography>
      <Slider
        value={filterOptions.maxCookingTime}
        onChange={handleSliderChange}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={5}
        marks
        min={0}
        max={120}
      />
      <Typography variant="h6" gutterBottom>
        Search by Ingredient
      </Typography>
      <TextField
        fullWidth
        value={filterOptions.ingredientSearch}
        onChange={handleInputChange}
        name="ingredientSearch"
        label="Ingredient"
        variant="outlined"
      />
      <Button onClick={applyFilters} variant="contained" color="primary">Apply Filters</Button>
    </div>
  );
}
