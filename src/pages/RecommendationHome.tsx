import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  Typography,
  ThemeProvider,
  TextField,
  Grid,
  Backdrop,
  MenuItem,
  Select,
  SelectChangeEvent,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
// import { Book } from '../types';
import { getBooks, getSubjects } from "../apis/booksApi";
// import { BookData } from "../types";
import { useNavigate } from "react-router";
import { NavBar } from "../components/NavBar";
import Loader from "../components/Loader/Loader";
import { getBook, getPopularBooks } from "../apis/recommend";
// import { getPopularBooks } from "../apis/recommend";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});
export type BookData = {
  book_name: string;
  author: string;
  image: string;
};
const RecommendationHome = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSemester, setSelectedSemester] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [subjects, setSubjects] = useState<string[]>([]);
  const navigate = useNavigate();

  const onBookClick = (id: string) => {
    navigate(`/book/${id}`);
  };

  const getBookDetail = (book_name: string) => {
    setLoading(true);
    navigate(`/book/recommendations/${book_name}`);
    // getBook(book_name)
    //   .then((res) => {
    //     console.log(res.data);
        
    //     // navigate(`/book/${res.data.book_id}`);
    //   })
    //   .catch((err) => console.log(err))
    //   .finally(() => setLoading(false));
  }

  useEffect(() => {
    getPopularBooks()
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <Loader />
      </Backdrop>
      <CssBaseline />
      <NavBar />
      <Box sx={{ p: 3 }}>
        <Container maxWidth="lg">
          <Box sx={{ mt: 5 }}>
            <Grid container spacing={5}>
              {books.map((book) => (
                <Grid item xs={12} sm={3} >
                  <Box
                    onClick={() => getBookDetail(book.book_name)}
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px",
                      p: 2,
                      borderRadius: "8px",
                      backgroundColor: "#424242",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <img
                      loading="lazy"
                      src={book.image}
                      alt={"book.title"}
                      width={"100%"}
                      height={"100%"}
                    />
                    <Typography variant="body2" align="center">
                      {book.book_name}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default RecommendationHome;
