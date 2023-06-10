import { AppBar, Box, Container, createTheme, CssBaseline, IconButton, Toolbar, Typography, ThemeProvider, TextField, Select, MenuItem, Grid, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
// import { Book } from '../types';
import { AccountCircle } from '@mui/icons-material';
import { getBooks } from '../apis/booksApi';
import { Book } from '../types';
import { useNavigate } from 'react-router';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const HomePage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedSubject, setSelectedSubject] = useState<string>('all');
    const navigate = useNavigate();
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSubjectChange = (event: SelectChangeEvent<string>) => {
        setSelectedSubject(event.target.value);
    };

    const filteredBooks = books.filter(book => {
        const matchesSearchTerm = book.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSubject = selectedSubject == 'all' || book.subject == selectedSubject;
        return matchesSearchTerm && matchesSubject;
    });

    useEffect(() => {
        getBooks().then(res => setBooks(res.data))
            .catch(err => console.log(err))
    }, [])

    const profileHandler = () => {
        navigate('/dashboard', { replace: true })
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Digilib
                    </Typography>
                    <IconButton color="inherit" edge="end" aria-label="profile" onClick={profileHandler}>
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box sx={{ p: 3 }}>
                <Container maxWidth="md">
                    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <TextField
                            label="Search"
                            variant="filled"
                            size="small"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <Select
                            value={selectedSubject}
                            onChange={handleSubjectChange}
                            variant="filled"
                            size="small"
                        >
                            <MenuItem value="all">All Subjects</MenuItem>
                            <MenuItem value="science">Science</MenuItem>
                            <MenuItem value="history">History</MenuItem>
                            <MenuItem value="fiction">Fiction</MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={3}>
                            {filteredBooks.map(book => (
                                <Grid item xs={6} sm={3} key={book.ISBN}>
                                    <Box
                                        onClick={() => alert(book.title)}
                                        sx={{
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '8px',
                                            p: 2,
                                            borderRadius: '8px',
                                            backgroundColor: '#424242',
                                        }}
                                    >
                                        <img src={book.image} alt={book.title} width={120} height={180} />
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
