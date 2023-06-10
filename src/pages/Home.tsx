import  { useState } from 'react';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        // mode: 'light',
    },
});

const HomePage = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [books, setBooks] = useState(Array.from(Array(20).keys()));

    const handleSearch = () => {
        // Logic to handle book search
    };

    const handleLoadMore = () => {
        const nextBatch = Array.from(Array(20).keys());
        setBooks(prevBooks => [...prevBooks, ...nextBatch]);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        Book Search
                    </Typography>
                    <Box component="form" noValidate autoComplete="off" sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <TextField
                                label="Search Books"
                                size="small"
                                value={searchText}
                                onChange={e => setSearchText(e.target.value)}

                            />
                            <FormControl sx={{ minWidth: '120px' }}>
                                <InputLabel id="subject-label">Subject</InputLabel>
                                <Select
                                    labelId="subject-label"
                                    size="small"
                                    value={selectedSubject}
                                    onChange={e => setSelectedSubject(e.target.value)}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="math">Math</MenuItem>
                                    <MenuItem value="science">Science</MenuItem>
                                    <MenuItem value="history">History</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ minWidth: '120px' }}>
                                <InputLabel id="semester-label">Semester</InputLabel>
                                <Select
                                    labelId="semester-label"
                                    size="small"
                                    value={selectedSemester}
                                    onChange={e => setSelectedSemester(e.target.value)}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="1">Semester 1</MenuItem>
                                    <MenuItem value="2">Semester 2</MenuItem>
                                    <MenuItem value="3">Semester 3</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={handleSearch} size="small">
                                Search
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {books.map(book => (
                            <Box
                                key={book}
                                sx={{
                                    width: 'calc(20% - 20px)',
                                    margin: '10px',
                                    padding: '20px',
                                    backgroundColor: '#e91e63',
                                    color: '#fff',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <img src="https://via.placeholder.com/150" alt={`Book ${book + 1}`} />
                                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                                    Book {book + 1}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                    {books.length < 100 && (
                        <Box sx={{ mt: 3 }}>
                            <Button variant="contained" color="primary" onClick={handleLoadMore}>
                                Load More
                            </Button>
                        </Box>
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default HomePage;
