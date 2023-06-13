import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

export const BookTable = ({ books }: { books: Book[] }) => {
  // Generate sl no for each book
  const booksWithSlNo = books.map((book, index) => ({ ...book, slNo: books.length - index }));

  const columns: GridColDef[] = [
    { field: 'slNo', headerName: 'Sl No', flex: 1 },
    { field: 'ISBN', headerName: 'ISBN', flex: 1 },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'author', headerName: 'Author', flex: 1 },
    { field: 'publisher', headerName: 'Publisher', flex: 1 },
    { field: 'no_of_copies', headerName: 'No of Copies', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <IconButton color="error">
          <Delete />
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={booksWithSlNo}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
         // Sort by slNo in descending order
      />
    </div>
  );
};
