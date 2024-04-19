import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import SearchBar from "./SearchBar";
import UserControl from "./UserControl";
import Logo from "./Logo.jsx";

const Headerr = ({ searchQuery, setSearchQuery }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
          <div style={{ display: "flex", justifyContent: "space-between"}}>
            <div style={{ display: "flex", alignItems: "center" }}>
       <Logo />
            <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
            </div>
            <div><UserControl /></div>
          </div>
      </AppBar>
    </Box>
  );
};

export default Headerr;
