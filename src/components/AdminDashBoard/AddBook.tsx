import { Box, Button, Container, TextField, Typography, Grid, MenuItem, ThemeProvider, createTheme } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { AuthorData, Book } from '../../types';
import { addBook, getAuthors, getBooks } from '../../apis/booksApi';
import { BookTable } from './BookTable';

const AddBook = () => {
    const [books, setBooks] = useState<any>([]);
    const [bookData, setBookData] = useState<Book>({
        ISBN: "",
        title: "",
        subject: "",
        publisher: "",
        language: "",
        no_of_copies: 0,
        author: ""
    })
    const handleAddBook = () => {
        addBook(bookData)
            .then(response => {
                setBooks([...books, response.data]);
            }
            )
            .catch(error => {
                console.error('Error adding book:', error);
            }
            );

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
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBookData({
            ...bookData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        getBooks()
            .then(response => {
                setBooks(response.data)
            }
            )
            .catch(error => {
                console.error('Error fetching books:', error);
            }
            );
    }
        , []);

    return (
        <>
            <Container maxWidth="sm" >

                <Box sx={{ mt: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        Add Book
                    </Typography>
                        <Box component="form" noValidate autoComplete="off">
                            <TextField label="ISBN" fullWidth sx={{ mt: 2 }} name='ISBN' onChange={handleInputChange} value={bookData.ISBN} />

                            <TextField label="Title" fullWidth sx={{ mt: 2 }} name='title' onChange={handleInputChange} value={bookData.title} />
                            <TextField label="Author" select fullWidth sx={{ mt: 2 }} name='author' onChange={handleInputChange} value={bookData.author} >
                                {
                                    authors.map((author) => (
                                        <MenuItem key={author.id} value={author.name}>{author.name}</MenuItem>
                                    ))
                                }

                            </TextField>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField label="Publisher" fullWidth sx={{ mt: 2 }} name='publisher' value={bookData.publisher} onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Language" fullWidth sx={{ mt: 2 }} name='language' onChange={handleInputChange} value={bookData.language} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField label="Subject" fullWidth sx={{ mt: 2 }} name='subject' onChange={handleInputChange} value={bookData.subject} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Number of Copies" fullWidth sx={{ mt: 2 }} type="number" name='no_of_copies' value={bookData.no_of_copies} onChange={handleInputChange} />
                                </Grid>
                            </Grid>
                            {/* Add more form fields as needed */}
                            <Button variant="contained" color="primary" onClick={handleAddBook} sx={{ mt: 3 }}>
                                Add Book
                            </Button>
                        </Box>
                </Box>

            </Container>    


            <BookTable books={books} />

        </>
    );
};

export default AddBook;
