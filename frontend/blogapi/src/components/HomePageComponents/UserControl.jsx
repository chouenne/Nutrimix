import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axiosInstance from "./axios";

const UserControl = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // user login status
  const [user, setUser] = useState({}); // user info
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const checkAuthentication = async () => {
      // Check if access token exists in local storage

      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        setIsAuthenticated(true);

        try {
          const response = await axiosInstance.get("/users/users/current/");
          // console.log(response, "response");

          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      } else {
        setIsAuthenticated(false);
        setUser({});
      }
    };

    // Check authentication on component mount
    checkAuthentication();


  }, []);

  const handleLogout = () => {
    // Clear access token from local storage and reset state
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    setUser({});
    navigate('/');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //same with handle click
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleProfileadmin = () => {
    navigate("/ManageAccounts");
  };
  const handleMyFavorites = () => {
    navigate("/favorites");
  };

  return (
    <div className="flex uppercase font-semibold">
      {isAuthenticated ? (
        <IconButton
          onClick={handleMenu}
          sx={{
            borderRadius: "50px",
            border: "1px solid darkgray",
            padding: "6px",
          }}
        >
          <MenuIcon />
          <AccountCircleIcon />
        </IconButton>
      ) : (
        <>
          <Button
            href="#"
            color="primary"
            variant="outlined"
            sx={{
              margin: "0 8px",
              color: "#306A09",
              borderColor: "#306A09",
            }} // Set green color for text and border
            component={NavLink}
            to="/login"
          >
            Login
          </Button>
          <Button
            href="#"
            color="primary"
            variant="outlined"
            sx={{
              margin: "0 8px",
              color: "#306A09",
              borderColor: "#306A09",
            }} // Set green color for text and border
            component={NavLink}
            to="/register"
          >
            Register
          </Button>
        </>
      )}

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ display: !isAuthenticated && 'none' }}
      >
        {isAuthenticated && (
          <>
            <MenuItem onClick={handleProfile}>User Zone</MenuItem>
            <MenuItem onClick={handleMyFavorites}>Recipe Collection</MenuItem>
            {user.is_superuser && (
              <MenuItem onClick={handleProfileadmin}>
                <NavLink
                  to="/ManageAccounts"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Manage Accounts
                </NavLink>
              </MenuItem>
            )}
            <MenuItem onClick={handleLogout} >Logout</MenuItem>
          </>
        )}
      </Menu>
    </div>


  );
};

export default UserControl;
