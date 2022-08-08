import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { logOut } from "../auth/firebase";
import { Link } from "@mui/material";
// import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
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
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {
  const { currentUser } = React.useContext(AuthContext);
  // console.log(currentUser);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [searchValue, setSearchValue] = useState("");
  // console.log(searchValue);

  const navigate = useNavigate();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogin = () => {
    navigate("/login");
    setAnchorEl(null);
  };
  const handleRegister = () => {
    navigate("/register");
    setAnchorEl(null);
  };
  const handleProfile = () => {
    navigate("/profile");
    setAnchorEl(null);
  };
  const handleNewBlog = () => {
    navigate("/newblog");
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logOut(navigate);
    setAnchorEl(null);
  };
  const handleAbout = () => {
    navigate("/about");
    setAnchorEl(null);
  };
  const handleHome = () => {
    navigate("/");
    setAnchorEl(null);
  };

  // SearchBlogs(searchValue);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <Link
            to="/"
            underline="none"
            sx={{
              flexGrow: 1,
              color: "white",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "350",
            }}
            onClick={() => navigate("/")}
          >
            Rain Man Blog App
          </Link>
          {currentUser && (
            <Search
            // onChange={(e) => setSearchValue(e.target.value)}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          )}

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: "end",
              fontSize: "1rem",
              fontWeight: "350",
            }}
          >
            {currentUser.displayName}
          </Typography>
          {!currentUser ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleHome}>Home</MenuItem>
                <MenuItem onClick={handleLogin}>Login</MenuItem>
                <MenuItem onClick={handleRegister}>Register</MenuItem>
                <MenuItem onClick={handleAbout}>About</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleHome}>Home</MenuItem>
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleNewBlog}>New Blog</MenuItem>
                <MenuItem onClick={handleAbout}>About</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
