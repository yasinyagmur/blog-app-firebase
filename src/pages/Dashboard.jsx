import { Box } from "@mui/material";
import React from "react";
import BlogCards from "../components/BlogCards";

const Dashboard = () => {
  return (
    <Box sx={{ marginTop: "5rem" }}>
      <BlogCards />
    </Box>
  );
};

export default Dashboard;
