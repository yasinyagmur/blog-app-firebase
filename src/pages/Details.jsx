import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import { Box } from "@mui/material";
import { deleteBlog } from "../auth/firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Details() {
  const navigate = useNavigate();
  const item = useLocation();
  console.log(item);
  const { title, content, imgurl } = item.state;

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
          marginBottom: "3rem",
          maxWidth: 450,
        }}
      >
        <Box>
          <CardMedia component="img" alt={title} height="300" image={imgurl} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {content}
            </Typography>
          </CardContent>
        </Box>
        <CardActions sx={{ marginBottom: "1rem" }}>
          <Button size="small">
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
      </Card>
    </Container>
  );
}
