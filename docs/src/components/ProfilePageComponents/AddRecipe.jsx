import React, { useState } from 'react';
import { Button, Modal, Backdrop, Fade, Container, Box, TextField, Select, MenuItem } from '@mui/material';

const AddRecipe = ({ categories, handleAddPost }) => {
  const [open, setOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    category: '',
    ingredient: '',
    excerpt: '',
    content: '',
    image: null,
    maxCookingTime: '',
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setNewPost({ ...newPost, image: file });
  };

  const handleAdd = () => {
    handleAddPost(newPost);
    handleClose();
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Recipe
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-recipe-modal"
        aria-describedby="add-recipe-form"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Container maxWidth="60%">
            <Box
              sx={{
                width: '50%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
              }}
            >
              <h2>Add New Recipe</h2>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={newPost.title}
                onChange={handleChange}
                placeholder="Title"
                variant="outlined"
                margin="normal"
              />
              <Select
                fullWidth
                label="Category"
                name="category"
                value={newPost.category}
                onChange={handleChange}
                placeholder="Category"
                variant="outlined"
                margin="normal"
              >
                <MenuItem value="">
                  <em>Select Category</em>
                </MenuItem>
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                fullWidth
                label="Ingredient"
                name="ingredient"
                value={newPost.ingredient}
                onChange={handleChange}
                placeholder="Ingredient"
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Excerpt"
                name="excerpt"
                value={newPost.excerpt}
                onChange={handleChange}
                placeholder="Excerpt"
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Content"
                name="content"
                value={newPost.content}
                onChange={handleChange}
                placeholder="Content"
                variant="outlined"
                margin="normal"
              />
              <input type="file" onChange={handleImageChange} />
              <Select
                fullWidth
                label="Max Cooking Time"
                name="maxCookingTime"
                value={newPost.maxCookingTime}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                defaultValue=""
              >
                <MenuItem value="" disabled>
                  Select Max Cooking Time
                </MenuItem>
                <MenuItem value="5">5 mins</MenuItem>
                <MenuItem value="10">10 mins</MenuItem>
                <MenuItem value="15">15 mins</MenuItem>
                <MenuItem value="20">20 mins</MenuItem>
              </Select>
              <Button variant="contained" color="primary" onClick={handleAdd}>
                Add
              </Button>
            </Box>
          </Container>
        </Fade>
      </Modal>
    </>
  );
};

export default AddRecipe;

