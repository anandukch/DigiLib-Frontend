import {
    Box,
    Container,
    createTheme,
    CssBaseline,
    Typography,
    ThemeProvider,
    TextField,
    Select,
    MenuItem,
    Grid,
    SelectChangeEvent,
    Backdrop,
    CircularProgress
} from '@mui/material';
import { useEffect, useState } from 'react';
// import { Book } from '../types';
import { getBooks } from '../apis/booksApi';
import { BookData } from '../types';
import { useNavigate } from 'react-router';
import { NavBar } from '../components/NavBar';
import Loader from '../components/Loader/Loader';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const HomePage = () => {
    const [books, setBooks] = useState<BookData[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedSubject, setSelectedSubject] = useState<string>('all');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSubjectChange = (event: SelectChangeEvent<string>) => {
        setSelectedSubject(event.target.value);
    };
    useEffect(() => {
        setLoading(true);
        getBooks().then(res => {
            setBooks(res.data);
            setLoading(false)
        })
            .catch(err => console.log(err))

    }, [])

    const onBookClick = (id: string) => {
        navigate(`/book/${id}`)
    }

    if (loading) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <Loader/>
            </Backdrop>
        )
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavBar />


            <Box sx={{ p: 3 }}>


                <Container maxWidth="lg">
                    <Box sx={{ mt: 3, display: "flex", alignItems: 'center' }}>
                        <TextField
                            label="Search"
                            variant="filled"
                            size="medium"
                            fullWidth
                            value={searchTerm}
                            onChange={handleSearch}
                            style={{
                                backgroundColor: '#424242',
                            }}
                        />
                        {/* <Select
                            value={selectedSubject}
                            onChange={handleSubjectChange}
                            variant="filled"
                            size="small"
                        >
                            <MenuItem value="all">All Subjects</MenuItem>
                            <MenuItem value="science">Science</MenuItem>
                            <MenuItem value="history">History</MenuItem>
                            <MenuItem value="fiction">Fiction</MenuItem>
                        </Select> */}
                    </Box>
                    <Box sx={{ mt: 5 }}>


                        <Grid container spacing={5}>
                            {books.map((book) => (
                                <Grid item xs={12} sm={3} key={book.id}>
                                    <Box
                                        onClick={() => onBookClick(book.id)}
                                        sx={{
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '8px',
                                            p: 2,
                                            borderRadius: '8px',
                                            backgroundColor: '#424242',
                                            height: '100%',
                                            width: '100%',

                                        }}
                                    >
                                        <img src={book.image} alt={"book.title"} width={"100%"} height={"100%"} />
                                        <Typography variant="body2" align="center">
                                            {book.title}
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

export default HomePage;
