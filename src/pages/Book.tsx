
import { Backdrop, Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getBook, reserveBook } from '../apis/booksApi';
import { BookData } from '../types';
import { NavBar } from '../components/NavBar';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookData>();
  useEffect(() => {
    if (id) {
      getBook(id)
        .then(response => {
          setBook(response.data)
        }
        ).catch(error => {
          console.error('Error fetching book:', error);
        }
        );

    }

  }, [id])

  const reserveBookHandler = (book_id: string) => {
    reserveBook(book_id)
      .then(_ => {
        alert('Book reserved successfully');
      }
      ).catch(error => {

        const { status, data } = error.response;
        if (status === 401) alert('You should login first');
        else alert(data.detail);
      }
      );
  }
  if (!book) return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
      open={book ? false : true}
    >
      <CircularProgress color="inherit" />
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
        <Box sx={{ width: '40%', marginRight: '1rem' }}>

          <img src={book?.image} alt="Book Cover" style={{ width: '100%', objectFit: 'contain' }} />


        </Box>
        <Box sx={{ flex: 1 }} justifyContent="center">

          <Typography variant="h4" align="center" sx={{ marginBottom: '1rem', fontWeight: 'bold', textDecoration: 'underline' }}>
            {book?.title}
          </Typography>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mattis ullamcorper risus in imperdiet.
              Suspendisse potenti. Sed ut diam magna. Suspendisse potenti. Sed ut diam magna. Suspendisse potenti.
              Sed ut diam magna. Suspendisse potenti. Sed ut diam magna. Suspendisse potenti. Sed ut diam magna.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', margin: '3rem' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.2rem', marginRight: '0.5rem' }}>
              Number of Copies:
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>{book?.available_copies}</Typography>
            <Typography variant="body1" sx={{ marginLeft: '1rem', fontSize: '1rem', color: '#666666' }}>
              (virtual_copies: {book?.virtual_copies})
            </Typography>
          </Box>
          <Button variant="contained" color="primary" onClick={() => { reserveBookHandler(book.id) }}>
            Reserve
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default BookDetail;
