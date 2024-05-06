import React from 'react'
import logo from "../../assets/images/receipe-logo.svg";
import Typography from "@mui/material/Typography";

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <a href="/" style={{ textDecoration: "none" }}>
                  <img
                  src={logo}
                  alt="Logo"
                  style={{ width: 40, marginRight: 16 }}
                />
                </a>
                <Typography
                variant="h6"
                component="div"
                color="black"
                sx={{ fontFamily: "Raleway", marginRight: "20px"}}
                >
                 NutriMix
                </Typography>
    </div>
  )
}

export default Logo
