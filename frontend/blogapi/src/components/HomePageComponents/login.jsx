import React, { useState } from 'react';
import axiosInstance from './axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import { Grid, Link, Typography, IconButton } from '@material-ui/core';
import { Icon } from '@material-ui/core';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LoginImage from '../../assets/images/login.jpg'; 
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#559E34', // Change the primary color
      },
    },
  });

export default function SignIn() {
    const navigate = useNavigate();
    const initialFormData = {
        email: '',
        password: '',
    };
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axiosInstance.post(`token/`, {
                email: formData.email,
                password: formData.password,
            });

            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');

            // Redirect to home page after successful login
            navigate('/');

        } catch (error) {
            setError('Invalid email or password.');
            console.error('Login failed:', error);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        }
    };

    return (
<Container component="main" maxWidth="xs">
    <CssBaseline />
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ display: 'flex', gap: '10px', width: '620px' }}>
            {/* Left div for the image */}
            <div style={{ position: 'relative', width: '300px' }}>
    <img src={LoginImage} alt="Login" style={{  width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            filter: 'brightness(80%)' }} />
    <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: 'white',
        width: '100%',
        fontFamily: 'Raleway, sans-serif'
    }}>
        <h2>Embrace the art of cooking!</h2>
    </div>
</div>
            {/* Right div for the login form */}
            <div style={{ width: '300px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign:'center' }}>
                    {/* <Avatar style={{ margin: '1px', backgroundColor: '#000' }}></Avatar> */}
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>

                    <ThemeProvider theme={theme}>
                    <form style={{ width: '100%', marginTop: '1px' }} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ 
                                margin: '24px 0px 16px', 
                                backgroundColor: '#F1BD22',
                                '&:hover': {
                                    backgroundColor: '#D8A319', // Adjust hover background color as needed
                                }
                            }}
                            onClick={handleSubmit}
                        >
                            Login
                        </Button>
                        <Grid container>
                            <Grid item xs={12}>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container justifyContent="center">
    {/* Line with text "or login with" */}
    <Grid item xs={12} style={{ color: '#bdbdbd', marginTop: '20px' }}>
        or login with
    </Grid>
    {/* Icons grid with gap */}
    <Grid container spacing={5} justifyContent="center" style={{marginTop: '5px' }}>
        <Grid item>
            <AppleIcon />
        </Grid>
        <Grid item>
            <FacebookIcon />
        </Grid>
        <Grid item>
            <GoogleIcon />
        </Grid>
    </Grid>
</Grid>


                    </form>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    </div>
</Container>

    
    );
}
