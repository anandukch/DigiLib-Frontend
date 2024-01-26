
import { Backdrop, Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { NavBar } from '../components/NavBar';
import Loader from '../components/Loader/Loader';
import Popup from '../components/Popup';
import { getBook } from '../apis/recommend';
import { BookData } from './RecommendationHome';

const BookRecommendation = () => {
  const { name } = useParams<{ name: string }>();
  const [book, setBook] = useState<BookData>();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const navigate = useNavigate();

  const closeSnackbar = () => {
    setShowSnackbar(false);
  };
  useEffect(() => {
    if (name) {
      getBook(name)
        .then(response => {
          setBook(response.data)
        }
        ).catch(error => {
          console.error('Error fetching book:', error);
          navigate('/book/recommendations');
        }
        );

    }

  }, [name])
  if (!book) return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
      open={book ? false : true}
    >
      <Loader />
    </Backdrop>
  )
  return (
    <>
      <NavBar />
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: '#424242',
          borderRadius: '8px',
          marginBottom: '1rem',
          height: '70vh',
          marginTop: '2rem'
        }}
      >
        <Box sx={{ width: '20%', marginRight: '1rem', overflow: 'hidden' }}>
          <img
            src={book?.image}
            alt="Book Cover"
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          />
        </Box>
        <Box sx={{ flex: 1 }} justifyContent="center">

          <Typography variant="h4" align="left" sx={{ marginBottom: '1rem', marginLeft: "2rem", fontWeight: 'bold', textDecoration: 'underline' }}>
            {book?.book_name}
          </Typography>

        </Box>

      </Container>
      {/* create a continer to disppalt recommended books */}
      
    </>
  );
};

export default BookRecommendation;
