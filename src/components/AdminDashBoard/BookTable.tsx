import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Book } from '../../types';

export const BookTable = ({ books, loading }: { books: Book[], loading: boolean }) => {
  // Generate sl no for each book

  const columns: GridColDef[] = [
    { field: 'ISBN', headerName: 'ISBN', width: 130 },
    { field: 'title', headerName: 'Title' },
    { field: 'author', headerName: 'Author' },
    { field: 'publisher', headerName: 'Publisher' },
    { field: 'no_of_copies', headerName: 'No of Copies' },
    { field: 'available_copies', headerName: 'No of Available Copies' },
    { field: 'virtual_copies', headerName: 'No of Virtual Copies' },


    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (_) => (
        <IconButton color="error">
          <Delete />
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid

        rows={books}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 6,
            },
          },
        }}
        disableRowSelectionOnClick
        autoHeight
        loading={loading}
        onPaginationModelChange={(e) => console.log(e)}

      />
    </div>
  );
};
