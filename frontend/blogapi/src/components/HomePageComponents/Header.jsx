import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import logo from '../../assets/images/receipe-logo.svg';
import axiosInstance from './axios';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '50px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '40%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'dark',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));


// // 登录成功后将用户 ID 存储在本地存储中
// localStorage.setItem('user_id', response.data.user_id);

// // 获取存储的用户 ID
// const userId = localStorage.getItem('user_id');

// // 使用存储的用户 ID 来获取用户信息
// const fetchUserData = async () => {
//   try {
//     const response = await axiosInstance.get(`/users/${userId}/`);
//     setUser(response.data); // 设置用户信息
//   } catch (error) {
//     console.error('Failed to fetch user data:', error);
//   }
// };





export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // user login status
  const [user, setUser] = useState({}); // user info

  useEffect(() => {
    const checkAuthentication = async () => {
      // Check if access token exists in local storage
      const accessToken = localStorage.getItem('access_token');
      // const userId = localStorage.getItem('user_id');

      if (accessToken) {
        setIsAuthenticated(true);
        // fetchUserData(userId);
        // If needed, you can also decode and set user info here
        // Example: setUser(decodedUserInfo);
        try {
          const response = await axiosInstance.get('/users/users/current/'); // 修改为获取当前登录用户信息的端点
          console.log(response,"response")
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      } else {
        setIsAuthenticated(false);
        setUser({});
      }
    };

    // Check authentication on component mount
    checkAuthentication();
    console.log(isAuthenticated,"isAuthenticated")
  }, []);

  const handleLogout = () => {
    // Clear access token from local storage and reset state
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
    setUser({});
  };
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#DFE0DE', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <img src={logo} alt="Logo" style={{ width: 40, marginRight: 16 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <div className='flex uppercase font-semibold'>
            {isAuthenticated ? (
              <div className='flex items-center gap-4'>
                <div className='text-sm flex gap-2'>Hello <p className='underline text-midnight cursor-pointer'>@{user.user_name}</p></div>
                <Button onClick={handleLogout} variant="contained" sx={{ bgcolor: '#f06292', color: 'white', textTransform: 'capitalize' }}>Logout</Button>
              </div>
            ) : (
              <>
                  <Button
                    href="#"
                    color="primary"
                    variant="outlined"
                    sx={{ margin: '0 8px' }}
                    component={NavLink}
                    to="/login"
                  >
                    Login
                  </Button>
                  <Button
                    href="#"
                    color="primary"
                    variant="outlined"
                    sx={{ margin: '0 8px' }}
                    component={NavLink}
                    to="/register"
                  >
                    Register
                  </Button>
                </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
