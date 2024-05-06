import React from 'react';
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "50px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "50%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "dark",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleSearch = (query) => {
    // Pass the search query to the parent component or perform search actions here
    console.log("Search query:", query);
    // For now, let's just log the search query
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon style={{ color: "#306A09" }} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(searchQuery);
          }
        }}
        sx={{
          borderColor: "#306A09",
          borderWidth: "2px",
          borderStyle: "solid",
          borderRadius: "50px",
          paddingLeft: "8px",
          paddingRight: "8px",
        }}
      />
    </Search>
  );
};

export default SearchBar;
