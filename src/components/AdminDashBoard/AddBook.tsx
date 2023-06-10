import { Box, Button, Container, TextField, Typography, Grid, MenuItem, ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { AuthorData } from '../../types';
import { getAuthors } from '../../apis/booksApi';

const AddBook = () => {
    const handleAddBook = () => {
        // Logic to handle adding a book
    };
    const [authors, setAuthors] = useState<AuthorData[]>([]);
    useEffect(() => {
        getAuthors()
            .then(response => {
                setAuthors(response.data);
            })
            .catch(error => {
                console.error('Error fetching authors:', error);
            }
            );
    }, []);


    return (
        <Container maxWidth="sm" >
            <Box sx={{ mt: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Add Book
                </Typography>
                <ThemeProvider theme={createTheme({
                    palette: {
                        mode: 'dark',
                    },
                })}>
                    <Box component="form" noValidate autoComplete="off">
                        <TextField label="ISBN" fullWidth sx={{ mt: 2 }} />

                        <TextField label="Title" fullWidth sx={{ mt: 2 }} />
                        <TextField label="Author" select fullWidth sx={{ mt: 2 }}>
                            {
                                authors.map((author) => (
                                    <MenuItem key={author.id} value={author.name}>{author.name}</MenuItem>
                                ))
                            }
                           
                        </TextField>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField label="Publisher" fullWidth sx={{ mt: 2 }} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Language" fullWidth sx={{ mt: 2 }} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField label="Subject" fullWidth sx={{ mt: 2 }} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Number of Copies" fullWidth sx={{ mt: 2 }} type="number" />
                            </Grid>
                        </Grid>
                        {/* Add more form fields as needed */}
                        <Button variant="contained" color="primary" onClick={handleAddBook} sx={{ mt: 3 }}>
                            Add Book
                        </Button>
                    </Box>
                </ThemeProvider>
            </Box>
        </Container>
    );
};

export default AddBook;
