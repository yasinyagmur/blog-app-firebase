import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography sx={{ display: "flex", marginLeft: "1rem" }}>
            <Link
              href="https://github.com/yasinyagmur/blog-app-firebase"
              sx={{ color: "white", fontSize: "0.8rem" }}
              target="_blank"
              rel="noreferrer"
              underline="none"
            >
              <GitHubIcon />
              GitHub Project
            </Link>
          </Typography>
          <Typography sx={{ display: "flex", marginLeft: "1rem" }}>
            <Link
              href="https://www.linkedin.com/in/yasinyagmur/"
              sx={{ color: "white", fontSize: "0.8rem" }}
              target="_blank"
              rel="noreferrer"
              underline="none"
            >
              <LinkedInIcon />
              Linkedin Profile
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
