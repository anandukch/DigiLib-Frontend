import { Box, Button, Container, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useState, ChangeEvent, useEffect } from 'react';
import { Author } from '../../types';
import { addAuthor, getAuthors } from '../../apis/booksApi';
import { BasicTable } from './AuthorTable';
// const theme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });
const AddAuthor = () => {
  const [authorData, setAuthorData] = useState<Author>({
    name: '',
    description: '',
  });
  const [authors, setAuthors] = useState<any>([]);
  useEffect(() => {
    getAuthors()
      .then(response => {
        console.log(response.data);

        // Handle successful response
        setAuthors(response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching authors:', error);
      });
  }, [])
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthorData({
      ...authorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAuthor = () => {
    // check if the value are not empty
    if (!authorData.name || !authorData.description) {
      alert('Please fill in all the fields');
      return;
    }
    addAuthor(authorData)
      .then(response => {
        setAuthors([...authors, response.data]);
        setAuthorData({
          name: '',
          description: '',
        });
      })
      .catch(error => {
        // Handle error
        console.error('Error adding author:', error);
      });
  };

  return (
    <ThemeProvider theme={createTheme({
      palette: {
        mode: 'dark',
      },
    })}>
      <Container maxWidth="sm" >
        <Box sx={{ mt: 3 }}>
          <Typography variant="h4" gutterBottom>
            Add Author
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            <TextField label="Name" fullWidth sx={{ mt: 2 }} name="name" value={authorData.name} onChange={handleInputChange} />
            <TextField label="Description" fullWidth sx={{ mt: 2 }} name="description" value={authorData.description} onChange={handleInputChange} />
            <Button variant="contained" color="primary" onClick={handleAddAuthor} sx={{ mt: 3 }}>
              Add Author
            </Button>
          </Box>
        </Box>
      </Container>
      <div style={{
        marginTop: '5rem',
      }}>
        <Typography variant="h6" gutterBottom>
          All Authors
        </Typography>
        <BasicTable authors={authors} />
      </div>



    </ThemeProvider>
  );
};

export default AddAuthor;
