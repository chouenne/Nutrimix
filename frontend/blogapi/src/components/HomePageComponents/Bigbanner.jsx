import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const backgroundImage =
    'https://static.vecteezy.com/system/resources/previews/008/333/248/non_2x/cooking-spices-isolated-on-white-background-cook-recipe-free-photo.jpg';

const divStyle = {
    background: `url(${backgroundImage}) center / cover`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    minHeight: '50vh', // Ensure the div covers the entire viewport height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};
export default function ProductHero() {
    return (
        <div style={divStyle}>
            {/* Increase the network loading priority of the background image. */}
            <img
                style={{ display: 'none' }}
                src={backgroundImage}
                alt="increase priority"
            />
            {/* <Typography color="inherit" align="center" variant="h2" marked="center">
                Upgrade your Sundays
            </Typography> */}
            {/* <Typography
                color="inherit"
                align="center"
                variant="h5"
                style={{ marginBottom: '4rem', marginTop: '4rem' }} // Use inline styles
            >
                Enjoy secret offers up to -70% off the best luxury hotels every Sunday.
            </Typography> */}
            <Link to="/Register" style={{ textDecoration: 'none' }}>
                <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    component="a"
                    href="/premium-themes/onepirate/sign-up/"
                    style={{ minWidth: '200px' }} // Use inline styles
                >
                    Register
                    </Button>
            </Link>
            <Typography variant="body2" color="inherit" style={{ marginTop: '2rem' }}> {/* Use inline styles */}
                Discover the experience
            </Typography>
        </div>
    );
}

