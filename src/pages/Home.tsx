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
} from '@mui/material';
import { useEffect, useState } from 'react';
// import { Book } from '../types';
import { getBooks, getSubjects } from '../apis/booksApi';
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
    const [subjects, setSubjects] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value as string);
    };

    const handleSemesterChange = (event: SelectChangeEvent) => {
        const semester = event.target.value as string;
        setSelectedSemester(semester);
        // setSelectedSubject('all');
    };

    const handleSubjectChange = (event: SelectChangeEvent) => {
        setSelectedSubject(event.target.value as string);
    };

    useEffect(() => {
        setLoading(true);
        getBooks()
            .then((res) => {
                setBooks(res.data);

                setLoading(false);

            })
            .catch((err) => console.log(err));
        getSubjects().then((res) => {
            setSubjects(res.data);

        }).catch((err) => console.log(err));
    }, []);

    const onBookClick = (id: string) => {
        navigate(`/book/${id}`);
    };

    const filteredBooks = books.filter((book) => {
        if (selectedSemester === 'all' && selectedSubject === 'all' && searchTerm === '') {
            return true;
        }
        if (selectedSemester !== 'all' &&
            book.semester !== parseInt(selectedSemester) &&
            book.title.toLowerCase() == searchTerm.toLowerCase()) {
            return false;
        }
        if (selectedSubject !== 'all' && book.subject !== selectedSubject && book.title.toLowerCase() != searchTerm.toLowerCase()) {
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
                            <MenuItem value={1}>Semester 1</MenuItem>
                            <MenuItem value={2}>Semester 2</MenuItem>
                            <MenuItem value={3}>Semester 3</MenuItem>
                            <MenuItem value={4}>Semester 4</MenuItem>
                            <MenuItem value={5}>Semester 5</MenuItem>
                            <MenuItem value={6}>Semester 6</MenuItem>
                            <MenuItem value={7}>Semester 7</MenuItem>
                            <MenuItem value={8}>Semester 8</MenuItem>

                        </Select>
                        <Select
                            value={selectedSubject}
                            onChange={handleSubjectChange}
                            variant="filled"
                            size="small"
                        >

                            <MenuItem value="all">All Subjects</MenuItem>
                            {
                                subjects.map((subject) => (
                                    <MenuItem key={subject} value={subject}>{subject}</MenuItem>
                                ))

                            }

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
                                        <img loading='lazy' src={book.image.url} alt={"book.title"} width={"100%"} height={"100%"} />
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
