import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Filter = ({ onApplyFilter }) => {
  const [maxCookingTime, setMaxCookingTime] = useState(20); // Initial value for max cooking time

  // Event handler for updating max cooking time
  const handleSliderChange = (event, newValue) => {
    setMaxCookingTime(newValue);
  };

  // Event handler for applying filters
  const applyFilters = () => {
    console.log("Max Cooking TimeA:", maxCookingTime);
    onApplyFilter({ maxCookingTime });
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Maximum Cooking Time
      </Typography>
      <Slider
        value={maxCookingTime}
        onChange={handleSliderChange}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={null}
        marks={[
          { value: 5, label: '5' },
          { value: 10, label: '10' },
          { value: 15, label: '15' },
          { value: 20, label: '20' },
        ]}
        min={5}
        max={20}
      />
      <Button onClick={applyFilters} variant="contained" color="primary">
        Apply Filters
      </Button>
    </div>
  );
};

export default Filter;
