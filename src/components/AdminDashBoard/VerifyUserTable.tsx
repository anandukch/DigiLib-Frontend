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
import { getAllUsers, getNonVerifiedUsers, verifyUser } from '../../apis/userApi';
import { UserData } from '../../types';
import { v4 } from 'uuid';


const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const VerifyUserTable: React.FC = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 600px)');

  // const handleOpenDialog = (index: number) => {
  //     setTransIndx(index);
  //     setOpenDialog(true);
  // };

  // const handleCloseDialog = () => {
  //     setOpenDialog(false);
  // };


  const verifyHandler = (id: string) => {
    setLoading(true)
    verifyUser(id)
      .then(_ => {
        setUserData(userData.map((user) => {
          if (user.id === id) {
            return {
              ...user,
              is_verified: true
            }
          }
          return user;
        }))
        setLoading(false)
      }
      ).catch(error => {
        alert(error.response.data.detail);
        setLoading(false)
      }
      );
  }
  useEffect(() => {
    setLoading(true)
    getAllUsers()
      .then(response => {
        setUserData(response.data);
        setLoading(false)
      }).catch(error => {
        alert(error.response.data.detail);
        setLoading(false)
      }
      );
    // getNonVerifiedUsers()
    //   .then(response => {
    //     setUserData(response.data);
    //     setLoading(false)
    //   }).catch(error => {
    //     alert(error.response.data.detail);
    //     setLoading(false)
    //   }
    //   );
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
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>

                  <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {userData.map((user, index) => (
                  <TableRow key={v4()} sx={{ backgroundColor: index % 2 === 0 ? '#515151' : '#3b3b3b' }}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>

                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        {
                          user.verified ?
                            (<Chip label="Verified" color="primary" />) :
                            (<Chip label="Not Verified" color="secondary" />)
                        }

                      </Stack>
                    </TableCell>

                    <TableCell>
                      {
                        user.verified ?
                          (<Button variant="contained" disabled>Verify</Button>) :
                          (<Button variant="contained" color="primary" onClick={() => verifyHandler(user.id)}>Verify</Button>)
                      }

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

export default VerifyUserTable;
