import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    createTheme,
    ThemeProvider,
    useMediaQuery,
} from '@mui/material';
import { Edit } from '@mui/icons-material';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const IssueBookPage: React.FC = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const isMobile = useMediaQuery('(max-width: 600px)');

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Sample data for the table
    const bookList = [
        {
            bookNumber: 'B001',
            coverImage: 'book1.jpg',
            reservationDate: '2023-05-26',
            userName: 'John Doe',
        },
        {
            bookNumber: 'B002',
            coverImage: 'book2.jpg',
            reservationDate: '2023-05-27',
            userName: 'Jane Smith',
        },
        // Add more book data as needed
    ];

    return (
        <ThemeProvider theme={theme}>
            <Box>
                <Container maxWidth="xl" style={{
                    width: !isMobile ? "80%":"auto",
                    marginLeft:!isMobile? '300px':"auto",
                }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Issue Book
                    </Typography>
                    <TableContainer component={Paper} sx={{ border: '1px solid black' }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: '#140f0f' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Book Number</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Cover Image</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Reservation Date</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>User Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bookList.map((book, index) => (
                                    <TableRow key={book.bookNumber} sx={{ backgroundColor: index % 2 === 0 ? '#515151' : '#3b3b3b' }}>
                                        <TableCell>{book.bookNumber}</TableCell>
                                        <TableCell>
                                            <img src={book.coverImage} alt="Cover" style={{ width: '50px' }} />
                                        </TableCell>
                                        <TableCell>{book.reservationDate}</TableCell>
                                        <TableCell>{book.userName}</TableCell>
                                        <TableCell>
                                            <IconButton color="primary" onClick={handleOpenDialog}>
                                                Issue
                                                <Edit />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Floating Dialog */}
                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <DialogTitle>Issue Book Details</DialogTitle>
                        <DialogContent>
                            Render complete details of student and book
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">
                                Confirm Issue
                            </Button>
                            <Button onClick={handleCloseDialog} color="secondary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default IssueBookPage;
