import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { Container } from "@mui/system";
import { Box } from "@mui/material";

export default function Details() {
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
          <Button size="small">Update </Button>
          <Button size="small">Delete </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
