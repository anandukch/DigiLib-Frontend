
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Book } from '../../types';
import { Delete } from '@mui/icons-material';
import { Box, Container, IconButton, Typography, useMediaQuery } from '@mui/material';

export const BookTable = ({ books }: { books: Book[] }) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  return (
    <Box>
      <Container maxWidth="xl" style={{
        marginTop: '90px',
        width: !isMobile ? "80%" : "auto",
        marginLeft: !isMobile ? '300px' : "auto",
      }}>
        <Typography variant="h4" align="center" gutterBottom>
          All Books
        </Typography>
        <TableContainer component={Paper} style={{
          textAlign: 'center',
        }}
          sx={{ border: '1px solid black' }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: '#140f0f' }}>
              <TableRow >
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>ISBN</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Title</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Author</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Publisher</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>No of Copies</TableCell>
                {/* <TableCell align="center">Publisher</TableCell> */}
                <TableCell align="center">Action</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((row, index) => (
                <TableRow
                  key={row.ISBN}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: index % 2 === 0 ? '#515151' : '#3b3b3b' }}
                >
                  <TableCell scope="row" align="center">
                    {row.ISBN}
                  </TableCell>
                  <TableCell align="center">{row.title}</TableCell>
                  <TableCell align="center">{row.author}</TableCell>
                  <TableCell align="center">{row.publisher}</TableCell>
                  <TableCell align="center">{row.no_of_copies}</TableCell>

                  <TableCell align="center">
                    <IconButton color="error">
                      <Delete />
                    </IconButton>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
