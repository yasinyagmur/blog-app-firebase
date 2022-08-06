import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import { Box, TextField } from "@mui/material";
import { deleteBlog, EditBlogCard } from "../auth/firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

export default function Details() {
  const navigate = useNavigate();
  const item = useLocation();
  // console.log(item);
  const { title, content, imgurl } = item.state;

  const [ısEditClick, setIsEditClick] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editImgUrl, setEditImgUrl] = useState("");
  const [editContent, setEditContent] = useState("");
  // console.log(editTitle);
  // console.log(editImgUrl);
  // console.log(editContent);
  const handleEdit = () => {
    setIsEditClick(true);
  };
  const editConfirm = () => {
    EditBlogCard(editTitle, editImgUrl, editContent, item.state.id);
    setIsEditClick(false);
  };

  return (
    <Container
      sx={{
        display: "flex",
        height: "90vh",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginTop: "6rem",
          marginBottom: "1rem",
          maxWidth: 450,
        }}
      >
        <Box>
          <CardMedia component="img" alt={title} height="300" image={imgurl} />
          {ısEditClick && (
            <Box
              sx={{
                maxWidth: "100%",
              }}
            >
              <TextField
                fullWidth
                sx={{ marginTop: "0.5rem" }}
                label="Image Url"
                required
                id="fullWidth"
                onChange={(e) => setEditImgUrl(e.target.value)}
              />
            </Box>
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            {ısEditClick && (
              <Box
                sx={{
                  maxWidth: "100%",
                }}
              >
                <TextField
                  fullWidth
                  label="Title"
                  required
                  id="fullWidth"
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </Box>
            )}

            <Typography variant="body2" color="text.secondary">
              {content}
            </Typography>
            {ısEditClick && (
              <Box
                sx={{
                  maxWidth: "100%",
                }}
              >
                <TextField
                  sx={{ marginTop: "0.5rem" }}
                  fullWidth
                  label="Content"
                  multiline
                  rows={3}
                  required
                  id="fullWidth"
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <Button
                  size="small"
                  sx={{ marginTop: "0.6rem" }}
                  onClick={editConfirm}
                >
                  Confirm
                </Button>
                <Button
                  size="small"
                  sx={{ marginTop: "0.6rem" }}
                  onClick={() => setIsEditClick(false)}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </CardContent>
        </Box>
        {!ısEditClick && (
          <CardActions sx={{ marginBottom: "1rem" }}>
            <Button size="small" onClick={handleEdit}>
              <EditIcon fontSize="small" />
              Edit
            </Button>
            <Button
              size="small"
              onClick={() => deleteBlog(item.state.id, navigate)}
            >
              <DeleteIcon fontSize="small" /> Delete
            </Button>
          </CardActions>
        )}
      </Card>
    </Container>
  );
}
