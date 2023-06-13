import React, { useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
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
} from '@mui/material';
import { Edit } from '@mui/icons-material';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const SamplePage: React.FC = () => {
    const [openDialog, setOpenDialog] = useState(false);

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

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'firstName',
          headerName: 'First name',
          width: 150,
          editable: true,
        },
        {
          field: 'lastName',
          headerName: 'Last name',
          width: 150,
          editable: true,
        },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 110,
          editable: true,
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
      ];
      
      const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ];
      

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    // backgroundColor: '#f5f5f5',
                    minHeight: '100vh',
                    padding: '20px',
                }}
            >
                <Container maxWidth="xl">
                    <Typography variant="h4" align="center" gutterBottom>
                        Issue Book
                    </Typography>

                    {/* <TableContainer component={Paper} sx={{ border: '1px solid black' }}>
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
                    </TableContainer> */}


                    


                    {/* Floating Dialog */}
                    {/* <Dialog open={openDialog} onClose={handleCloseDialog}>
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
                    </Dialog> */}

                     <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
                </Container>
            </Box>
           
        </ThemeProvider>
    );
};

export default SamplePage;