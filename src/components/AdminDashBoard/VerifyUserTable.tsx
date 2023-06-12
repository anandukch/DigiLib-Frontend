import React, { useEffect, useState } from 'react';
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
    Stack,
    Chip,
    Backdrop,
    CircularProgress,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { getNonVerifiedUsers } from '../../apis/userApi';


const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const VerifyUserTable: React.FC = () => {
    // const [openDialog, setOpenDialog] = useState(false);
    // const [transactions, setTransactions] = useState<BookTransaction[]>([]);
    // const [transIndx, setTransIndx] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const isMobile = useMediaQuery('(max-width: 600px)');

    // const handleOpenDialog = (index: number) => {
    //     setTransIndx(index);
    //     setOpenDialog(true);
    // };

    // const handleCloseDialog = () => {
    //     setOpenDialog(false);
    // };



    useEffect(() => {
        setLoading(true)
        getNonVerifiedUsers()
            .then(response => {
                console.log(response.data);
                // setTransactions(response.data);
                setLoading(false)
            }).catch(error => {
                alert(error.response.data.detail);
                setLoading(false)
            }
            );
        // getAllTransactions()
        //     .then(response => {
        //         setTransactions(response.data);
        //     }).catch(error => {
        //         console.error('Error fetching book:', error);
        //     }
        //     );
    }, [])

    
    return (
        <ThemeProvider theme={theme}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
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
                                    <TableCell sx={{ fontWeight: 'bold' }}>Actual Date of return</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Fine</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {transactions.map((transaction, index) => (
                                    <TableRow key={transaction.id} sx={{ backgroundColor: index % 2 === 0 ? '#515151' : '#3b3b3b' }}>
                                        <TableCell>{transaction.book_item.acc_no}</TableCell>
                                        <TableCell>
                                            <img src={transaction.book.image} alt="Cover" style={{ width: '50px' }} />
                                        </TableCell>
                                        <TableCell>{transaction.book.title}</TableCell>
                                        <TableCell>{transaction.user.name}</TableCell>

                                        <TableCell>{formatDate(transaction.date_of_reservation)}</TableCell>
                                        <TableCell>{transaction.date_of_issue ? formatDate(transaction.date_of_issue) : '-'}</TableCell>
                                        <TableCell>{transaction.date_of_return ? formatDate(transaction.date_of_return) : '-'}</TableCell>
                                        <TableCell>{transaction.actual_date_of_return ? formatDate(transaction.actual_date_of_return) : '-'}</TableCell>

                                        <TableCell>{transaction.fine ?? 0}</TableCell>

                                        <TableCell>
                                            <Stack direction="row" spacing={1}>
                                                <Chip label={transaction.status} color="primary" />
                                            </Stack>
                                        </TableCell>

                                        <TableCell>
                                            {
                                                transaction.status == 'reserved' ?
                                                    (<IconButton color="primary" onClick={() => issueBookHandler(index)} style={{ fontSize: 'small' }}>
                                                        Issue
                                                        <Edit fontSize="small" />
                                                    </IconButton>) : transaction.status == 'issued' ?
                                                        (<IconButton color="primary" style={{ fontSize: 'small' }} onClick={() => returnBookHandler(index)}>
                                                            Return
                                                            <Edit fontSize="small" />
                                                        </IconButton>) :
                                                        (<IconButton color="primary" style={{ fontSize: 'small' }} disabled>
                                                            Return
                                                            <Edit fontSize="small" />
                                                        </IconButton>)
                                            }

                                        </TableCell>
                                    </TableRow>
                                ))} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default VerifyUserTable;
