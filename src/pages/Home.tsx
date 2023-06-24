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
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedSemester, setSelectedSemester] = useState<string>('all');
    const [selectedSubject, setSelectedSubject] = useState<string>('all');
    const navigate = useNavigate();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSemesterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const semester = event.target.value as string;
        setSelectedSemester(semester);
        setSelectedSubject('all');
    };

    const handleSubjectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedSubject(event.target.value as string);
    };

    useEffect(() => {
        setLoading(true);
        getBooks()
            .then((res) => {
                setBooks(res.data);
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            })
            .catch((err) => console.log(err));
    }, []);

    const onBookClick = (id: string) => {
        navigate(`/book/${id}`);
    };

    const filteredBooks = books.filter((book) => {
        if (selectedSemester === 'all' && selectedSubject === 'all') {
            return true;
        }
        if (selectedSemester !== 'all' && book.semester !== selectedSemester) {
            return false;
        }
        if (selectedSubject !== 'all' && book.subject !== selectedSubject) {
            return false;
        }
        return true;
    });

    return (
        <ThemeProvider theme={theme}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <Loader />
            </Backdrop>
            <CssBaseline />
            <NavBar />
            <Box sx={{ p: 3 }}>
                <Container maxWidth="lg">
                    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: '16px' }}>
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
                        <Select
                            value={selectedSemester}
                            onChange={handleSemesterChange}
                            variant="filled"
                            size="small"
                        >
                            <MenuItem value="all">All Semesters</MenuItem>
                            <MenuItem value="sem1">Semester 1</MenuItem>
                            <MenuItem value="sem2">Semester 2</MenuItem>
                            <MenuItem value="sem3">Semester 3</MenuItem>
                            <MenuItem value="sem4">Semester 4</MenuItem>
                            <MenuItem value="sem5">Semester 5</MenuItem>
                            <MenuItem value="sem6">Semester 6</MenuItem>
                            <MenuItem value="sem7">Semester 7</MenuItem>
                            <MenuItem value="sem8">Semester 8</MenuItem>
                        </Select>
                        <Select
                            value={selectedSubject}
                            onChange={handleSubjectChange}
                            variant="filled"
                            size="small"
                        >
                            <MenuItem value="all">All Subjects</MenuItem>
                            <MenuItem value="ds">Data Structues</MenuItem>
                            <MenuItem value="dbms">DBMS</MenuItem>
                            <MenuItem value="gt">Graphy theory</MenuItem>
                            <MenuItem value="aad">Algorithm Analysis and Design</MenuItem>
                            <MenuItem value="cd">Compiler Design</MenuItem>
                            <MenuItem value="cd">Computer Graphics</MenuItem>
                    
                        </Select>
                    </Box>
                    <Box sx={{ mt: 5 }}>
                        <Grid container spacing={5}>
                            {filteredBooks.map((book) => (
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
                                        <img src={book.image.url} alt={book.title} width="100%" height="100%" />
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
