import { SpaceBar } from '@mui/icons-material';
import { Box, Button, Container, CssBaseline, Typography } from '@mui/material';

const BookDetail = () => {
  return (
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
      }}
    >
      <Box sx={{ width: '40%', marginRight: '1rem'}}>
        {/* Cover Picture */}
 
          <img src="https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg?w=1380&t=st=1686408345~exp=1686408945~hmac=ef45187790f3bffa7f9e3ea36af1a6738ea26e1d135631bf8ca336a94cc15ea4" alt="Book Cover" style={{ width: '100%', objectFit: 'contain' }} />


      </Box>
      <Box sx={{ flex: 1 }} justifyContent="center">
        {/* Book Title */}
        <Typography variant="h4" align="center" sx={{ marginBottom: '1rem', fontWeight: 'bold', textDecoration: 'underline' }}>
          Book Title
        </Typography>
        {/* Description */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mattis ullamcorper risus in imperdiet.
            Suspendisse potenti. Sed ut diam magna. Suspendisse potenti. Sed ut diam magna. Suspendisse potenti.
            Sed ut diam magna. Suspendisse potenti. Sed ut diam magna. Suspendisse potenti. Sed ut diam magna.
          </Typography>
        </Box>

        {/* Number of Copies */}
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '3rem' }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.2rem', marginRight: '0.5rem' }}>
            Number of Copies:
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>23</Typography>
          <Typography variant="body1" sx={{ marginLeft: '1rem', fontSize: '1rem', color: '#666666' }}>
            (Available: 15)
          </Typography>
        </Box>
        {/* Reserve Button */}
        <Button variant="contained" color="primary">
          Reserve
        </Button>
      </Box>
    </Container>
  );
};

export default BookDetail;
