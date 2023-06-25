import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Book, BookData } from '../../types';
import { deleteBook } from '../../apis/booksApi';

export const BookTable = ({ books, loading, setBooks }: { books: BookData[], loading: boolean, setBooks: Function }) => {

  const onDeleteBook = (id: string) => {
    deleteBook(id).then(_ => {
      setBooks(books.filter((book) => book.id !== id));
    }
    ).catch(error => {
      alert(error.response.data.detail);
    })
  }

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
      renderCell: (params) => {
        return (
          <IconButton color="error" onClick={() => onDeleteBook(params.value)}>
            <Delete />
          </IconButton>
        )
      },
    },
  ];

  const rows = books.map((book, index) => {
    return {
      "id": book.id,
      "ISBN": book.ISBN,
      "title": book.title,
      "author": book.author,
      "publisher": book.publisher,
      "no_of_copies": book.no_of_copies,
      "available_copies": book.available_copies,
      "virtual_copies": book.virtual_copies,
      "action": book.id
    }

  })

  const paginationHandler = (params: any) => {
    console.log(params);
  }

  return (
    <div style={{ height: 500, width: '100%', marginTop: "100px" }}>
      <DataGrid

        rows={rows}
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
