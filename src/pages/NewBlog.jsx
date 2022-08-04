import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export default function NewBlog() {
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: "100%",
        margin: "auto",
        marginTop: "10rem",
      }}
    >
      <TextField
        fullWidth
        label="Title"
        id="fullWidth"
        sx={{ marginTop: "1rem" }}
        required
      />
      <TextField
        fullWidth
        label="Image URL"
        id="fullWidth"
        sx={{ marginTop: "1rem" }}
        required
      />
      <TextField
        id="outlined-multiline-static"
        label="Content"
        multiline
        rows={10}
        fullWidth
        required
        sx={{ mt: 2 }}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ margin: "1rem 0" }}
        type="submit"
      >
        Save
      </Button>
    </Box>
  );
}
