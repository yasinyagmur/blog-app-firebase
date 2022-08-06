import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Container } from "@mui/system";
import { useFetch } from "../auth/firebase";
import loading from "../assets/loading.gif";

export default function BlogCard() {
  const navigate = useNavigate();
  const { blogGet, isLoading } = useFetch();
  // console.log(blogGet);

  return (
    <Container
      sx={{
        marginTop: "2rem",
      }}
    >
      {isLoading ? (
        <Card
          sx={{
            display: "flex",
            margin: "auto",
          }}
        >
          <CardMedia
            component="img"
            image={loading}
            height="700"
            alt="green iguana"
            sx={{ margin: "auto" }}
          />
        </Card>
      ) : (
        blogGet?.map((item, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "inline-flex",
                margin: "1rem",
              }}
            >
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="200"
                  sx={{ objectFit: "fill" }}
                  image={item.imgurl ? item.imgurl : loading.gif}
                  alt={item.title}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ maxHeight: "2rem", overflow: "hidden" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{ height: "3.8rem", overflow: "hidden" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {item.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Container>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="Comment">
                      <ChatBubbleOutlineIcon />
                    </IconButton>
                  </Container>
                  <Button
                    size="small"
                    onClick={() =>
                      navigate(`/detail/${item.id}`, { state: item })
                    }
                  >
                    Detail
                  </Button>
                </CardActions>
              </Card>
            </Box>
          );
        })
      )}
    </Container>
  );
}
