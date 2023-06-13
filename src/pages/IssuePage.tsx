import React, { useEffect, useState } from 'react';
import { DataGrid, GridApi, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {
    Box,
    Container,
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
import { BookTransaction } from '../types';
import { getAllTransactions, issueBook, returnBook } from '../apis/booksApi';
import { formatDate } from '../utils';
import { v4 } from 'uuid';


const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const TransactionTable: React.FC = () => {
    // const [openDialog, setOpenDialog] = useState(false);
    const [transactions, setTransactions] = useState<BookTransaction[]>([]);
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
        getAllTransactions()
            .then(response => {
                setTransactions(response.data);
            }).catch(error => {
                console.error('Error fetching book:', error);
            }
            );
    }, [])

    const issueBookHandler = (transIndx:number) => {
        setLoading(true);
        const transId = transactions[transIndx].id;
        issueBook(transId)
            .then(_ => {
                getAllTransactions()
                    .then(response => {
                        setTransactions(response.data);
                        setLoading(false);
                    }).catch(error => {
                        console.error('Error fetching book:', error);
                    }
                    );

            }
            ).catch(error => {
                console.error('Error fetching book:', error);
            }
            );
    }

    const returnBookHandler = (index: number) => {
        setLoading(true);
        returnBook(transactions[index].id)
            .then(_ => {
                getAllTransactions()
                    .then(response => {
                        setTransactions(response.data);
                        setLoading(false);
                    }
                    ).catch(error => {
                        console.error('Error fetching book:', error);
                    }
                    );
            }).catch(error => {
                console.log(error);

            })

    }


    const columns: GridColDef[] = [
        { 
            field: 'acc_no', 
        headerName: 'Accession No', 
        width: 120 
    },
        {
          field: 'img',
          headerName: 'Book Image',
          width: 100,
          editable: true,
          renderCell: (params) => {
            // console.log(params.value);
            
            return <img style={{width:"100%"}} src={params.value}></img>;
          }
        },
        {
          field: 'title',
          headerName: 'Book Title',
          width: 100,
          editable: true,
        },
        {
          field: 'name',
          headerName: 'User Name',
          width: 100,
          editable: true,
        },
        {
          field: 'res_date',
          headerName: 'Reservation Date',
          width: 100,
          editable: true,
        },
        {
            field: 'iss_date',
            headerName: 'Issue Date',
            width: 100,
            editable: true,
          },
          {
            field: 'return_date',
            headerName: 'Date of return',
            width: 100,
            editable: true,
          },
          {
            field: 'act_return_date',
            headerName: 'Actual Date of return',
           width: 120,
            editable: true,
          },
          {
            field: 'fine',
            headerName: 'Fine',
            width: 100,
            editable: true,
          },
          {
            field: 'status',
            headerName: 'Status',
            width: 100,
            editable: true,
          },          
          {
            field: 'action',
            headerName: 'Action',
            width: 100,
            editable: true,
            renderCell: (params) => {

                const {status,index}= params.value
                return status == 'reserved' ?
                (<IconButton color="primary" onClick={() => issueBookHandler(index)} style={{ fontSize: 'small' }}>
                    Issue
                    <Edit fontSize="small" />
                </IconButton>) : status == 'issued' ?
                    (<IconButton color="primary" style={{ fontSize: 'small' }} onClick={() => returnBookHandler(index)}>
                        Return
                        <Edit fontSize="small" />
                    </IconButton>) :
                    (<IconButton color="primary" style={{ fontSize: 'small' }} disabled>
                        Return
                        <Edit fontSize="small" />
                    </IconButton>)
              }
          },
      ];
      
      const rows = transactions.map((transaction,index)=>{
        return{
            "id":v4(),
          "acc_no":transaction.book_item.acc_no,
          "img":transaction.book.image,
          "title":transaction.book.title,
          "status":transaction.status,
          "fine":transaction.fine,
          "act_return_date":transaction.actual_date_of_return,
          "return_date":transaction.date_of_return,
          "iss_date":transaction.date_of_issue,
          "res_date":transaction.date_of_reservation,
          "name":transaction.user.name,
          "action":{
            "status":transaction.status,
            "index":index
          }


        }
      })

    //   console.log(rows);
      

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
                    marginLeft: !isMobile ? '250px' : "auto",
                }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Issue Book
                    </Typography>
                    {/* <TableContainer component={Paper} sx={{ border: '1px solid black' }}>
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
                                {transactions.map((transaction, index) => (
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
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer> */}

            <Box sx={{ height: 500, width: 1200 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 10,
                        },
                    },
                    }}
                    pageSizeOptions={[10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    autoPageSize
                    />
                  </Box>

                    {/* Floating Dialog */}
                    {/* <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <DialogTitle>Issue Book Details</DialogTitle>
                        <DialogContent>
                            Render complete details of student and book
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={issueBookHandler} color="primary">
                                Confirm Issue
                            </Button>
                            <Button onClick={handleCloseDialog} color="secondary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog> */}
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default TransactionTable;
