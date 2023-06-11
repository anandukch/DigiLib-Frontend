import React, { useEffect, useState } from 'react';
import {
    Box,

    Container,

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
    Stack,
    Chip,
} from '@mui/material';
import { getUserTransactions } from '../../apis/userApi';
import { BookTransaction } from '../../types';
import { formatDate } from '../../utils';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const TransactionTable: React.FC = () => {

    const [transactions, setTransactions] = useState<BookTransaction[]>([]);
    const isMobile = useMediaQuery('(max-width: 600px)');



    useEffect(() => {
        getUserTransactions()
            .then(response => {
                setTransactions(response.data);
            }).catch(error => {
                console.error('Error fetching book:', error);
            }
            );
    }, [])


    return (
        <ThemeProvider theme={theme}>
            <Box>
                <Container maxWidth="xl" style={{
                    width: !isMobile ? "80%" : "auto",
                    marginLeft: !isMobile ? '300px' : "auto",
                }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Issue Book
                    </Typography>
                    <TableContainer component={Paper} sx={{ border: '1px solid black' }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: '#140f0f' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Accession No</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Book Image</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Book Title</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>User Name</TableCell>

                                    <TableCell sx={{ fontWeight: 'bold' }}>Reservation Date</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Issue Date</TableCell>

                                    <TableCell sx={{ fontWeight: 'bold' }}>Date of return</TableCell>

                                    <TableCell sx={{ fontWeight: 'bold' }}>Fine</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.map((transaction, index) => (
                                    <TableRow key={transaction.id} sx={{ backgroundColor: index % 2 === 0 ? '#515151' : '#3b3b3b' }}>
                                        <TableCell>{transaction.book_item.acc_no}</TableCell>
                                        <TableCell>
                                            <img src={transaction.book.image} alt="Cover" style={{ width: '50px' }} />
                                        </TableCell>
                                        <TableCell>{transaction.book.title}</TableCell>
                                        <TableCell>{transaction.user.name}</TableCell>

                                        <TableCell>{transaction.date_of_reservation ? formatDate(transaction.date_of_reservation) : '-'}</TableCell>
                                        <TableCell>{transaction.date_of_issue ? formatDate(transaction.date_of_issue) : '-'}</TableCell>
                                        <TableCell>{transaction.date_of_return ? formatDate(transaction.date_of_return) : '-'}</TableCell>

                                        <TableCell>{transaction.fine ?? 0}</TableCell>

                                        <TableCell>
                                            <Stack direction="row" spacing={1}>
                                                <Chip label={transaction.status} color="primary" />

                                            </Stack>
                                        </TableCell>


                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>


                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default TransactionTable;
