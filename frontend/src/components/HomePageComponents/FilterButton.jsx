import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Filter from './Filter'; // Import the Filter component
import { styled } from '@mui/material/styles';

const FilterButton = ({ onApplyFilter }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'filter-popover' : undefined;

  const CustomButton = styled(Button)({
    borderColor: '#ccc', // Initial border color (light gray)
    backgroundColor: 'transparent', // Set background color to transparent (no fill)
    color:'#555',
    '&:hover': {
    backgroundColor:'#f0f0f0',
    borderColor: '#555', // Change border color on hover to dark gray
    },
    });

  return (
    <div style={{ position: 'relative' }}>
    <CustomButton aria-describedby={id} variant="contained" onClick={handleClick}>
        Filter
    </CustomButton>
    <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        style={{ position: 'absolute', right: '5px', top: '10%' }}
    >
        <Box p={2}>
            <Filter onApplyFilter={onApplyFilter} />
        </Box>
    </Popover>
</div>

  );
};

export default FilterButton;
