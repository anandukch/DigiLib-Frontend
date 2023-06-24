import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Book } from '../../types';

export const BookTable = ({ books, loading }: { books: Book[], loading: boolean }) => {
  // Generate sl no for each book

  const columns: GridColDef[] = [
    { field: 'ISBN', headerName: 'ISBN', minWidth: 130 },
    { field: 'title', headerName: 'Title', minWidth: 130 },
    { field: 'author', headerName: 'Author', minWidth: 130 },
    { field: 'publisher', headerName: 'Publisher', minWidth: 130 },
    { field: 'no_of_copies', headerName: 'No of Copies', minWidth: 130 },
    { field: 'available_copies', headerName: 'No of Available Copies', minWidth: 130 },
    { field: 'virtual_copies', headerName: 'No of Virtual Copies', minWidth: 130 },


    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      minWidth: 130,
      renderCell: (_) => (
        <IconButton color="error">
          <Delete />
        </IconButton>
      ),
    },
  ];

  const paginationHandler = (params: any) => {
    console.log(params);
  }

  return (
    <div style={{ height: 500, width: '100%', marginTop: "100px" }}>
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
        onPaginationModelChange={paginationHandler}

      />
    </div>
  );
};
