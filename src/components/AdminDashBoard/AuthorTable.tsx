
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { AuthorData } from '../../types';
// import { Delete } from '@mui/icons-material';
// import { IconButton, useMediaQuery } from '@mui/material';

// export const BasicTable = ({ authors }: { authors: AuthorData[] }) => {
//   const isMobile = useMediaQuery('(max-width: 600px)');
//   return (
//     <TableContainer component={Paper} style={{
//       textAlign: 'center',
//       width: !isMobile ? '80%' : "auto",
//       marginLeft: !isMobile ? '300px' : "auto",
//     }}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell align="center">Id</TableCell>
//             <TableCell align="center">Name</TableCell>
//             <TableCell align="center">Desciption</TableCell>
//             <TableCell align="center">Action</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {authors.map((row) => (
//             <TableRow
//               key={row.id}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell scope="row" align="center">
//                 {row.id}
//               </TableCell>
//               <TableCell align="center">{row.name}</TableCell>
//               <TableCell align="center">{row.description}</TableCell>
//               <TableCell align="center">
//                 <IconButton color="error">
//                   <Delete />
//                 </IconButton>

//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
