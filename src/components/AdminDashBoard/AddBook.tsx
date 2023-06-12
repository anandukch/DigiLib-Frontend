import { Box, Button, Container, TextField, Typography, Grid, Backdrop, CircularProgress } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { Book } from '../../types';
import { addBook, getBooks } from '../../apis/booksApi';
import { BookTable } from './BookTable';
const { VITE_CLOUDINARY_UPLOAD_PRESENT, VITE_CLOUDINARY_NAME } = import.meta.env


const AddBook = () => {
    const [books, setBooks] = useState<any>([]);
    const [imagePreview, setImagePreview] = useState<any>(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [bookData, setBookData] = useState<Book>({
        ISBN: "",
        title: "",
        subject: "",
        publisher: "",
        language: "",
        no_of_copies: 0,
        author: "",
        image: ""
    })
    const handleAddBook = () => {

        const formData = new FormData();
        formData.append("file", selectedFile!)
        formData.append("upload_preset", VITE_CLOUDINARY_UPLOAD_PRESENT)
        formData.append("cloud_name", VITE_CLOUDINARY_NAME)
        setLoading(true);
        fetch("https://api.cloudinary.com/v1_1/anandukch/image/upload", {
            method: "post",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                setBookData({ ...bookData, image: data.url })
                addBook({ ...bookData, image: data.url })
                    .then(response => {
                        setBooks([...books, response.data]);
                        setLoading(false);
                        setBookData({
                            ISBN: "",
                            title: "",
                            subject: "",
                            publisher: "",
                            language: "",
                            no_of_copies: 0,
                            author: "",
                            image: ""
                        })
                    })
                    .catch(error => {
                        console.error('Error adding book:', error);
                    });
            }
            )


    };
    useEffect(() => {
        getBooks()
            .then(response => {
                setBooks(response.data)
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }, []);
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBookData({
            ...bookData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileSelect = (event: any) => {
        setSelectedFile(event.target.files[0]);
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && e.target.result) {
                    setImagePreview(e.target.result.toString());

                }
            };
            reader.readAsDataURL(file);
        }
    }
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Container maxWidth="sm">
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        Add Book
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            {/* Book Preview */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    minHeight: 300,
                                    border: '1px solid #ccc',
                                    borderRadius: 4,
                                    marginBottom: 2,
                                }}
                            >
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Book Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                ) : (
                                    <Typography variant="h2" color="textSecondary">
                                        +
                                    </Typography>
                                )}
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <label htmlFor="image-upload">
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                        style={{ display: 'none' }}
                                    />
                                    <Button variant="outlined" component="span">
                                        Upload Image
                                    </Button>
                                </label>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Box component="form" noValidate autoComplete="off">
                                <TextField
                                    label="ISBN"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    name="ISBN"
                                    onChange={handleInputChange}
                                    value={bookData.ISBN}
                                />

                                <TextField
                                    label="Title"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    name="title"
                                    onChange={handleInputChange}
                                    value={bookData.title}
                                />

                                <TextField
                                    label="Author"

                                    fullWidth
                                    sx={{ mt: 2 }}
                                    name="author"
                                    onChange={handleInputChange}
                                    value={bookData.author}
                                />



                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Publisher"
                                            fullWidth
                                            sx={{ mt: 2 }}
                                            name="publisher"
                                            value={bookData.publisher}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Language"
                                            fullWidth
                                            sx={{ mt: 2 }}
                                            name="language"
                                            onChange={handleInputChange}
                                            value={bookData.language}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Subject"
                                            fullWidth
                                            sx={{ mt: 2 }}
                                            name="subject"
                                            onChange={handleInputChange}
                                            value={bookData.subject}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Number of Copies"
                                            fullWidth
                                            sx={{ mt: 2 }}
                                            type="number"
                                            name="no_of_copies"
                                            value={bookData.no_of_copies}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </Grid>

                                <Button variant="contained" color="primary" onClick={handleAddBook} sx={{ mt: 3 }}>
                                    Add Book
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>

            <BookTable books={books} />
        </>
    );
};

export default AddBook;
