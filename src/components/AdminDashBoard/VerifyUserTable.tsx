import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  createTheme,
  ThemeProvider,
  useMediaQuery,
  Stack,
  Chip,
  Backdrop,
  CircularProgress,
  TextField,
} from '@mui/material';
import { DataGrid, GridColDef, GridRowData } from '@mui/x-data-grid';
import { getAllUsers, verifyUser } from '../../apis/userApi';
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
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const isMobile = useMediaQuery('(max-width: 600px)')
  const [password, setPassword] = useState<string>('');
;

  const verifyHandler = (id: string) => {
    setLoading(true);
    verifyUser(id)
      .then((_) => {
        setUserData((prevState) =>
          prevState.map((user) =>
            user.id === id ? { ...user, is_verified: true } : user
          )
        );
        setLoading(false);
      })
      .catch((error) => {
        alert(error.response.data.detail);
        setLoading(false);
      });
  };

  const handleAddUser = () => {
    const newUser: UserData = {
      id: v4(),
      name,
      email,
      password,
      role,
      is_verified: false,
      slNo: userData.length + 1,
    };
    setUserData((prevData) => [...prevData, newUser]);
    setName('');
    setEmail('');
    setPassword('');
    setRole('');
  };
  

  useEffect(() => {
    setLoading(true);
    getAllUsers()
      .then((response) => {
        // Reverse the order of user data array and add Sl No
        const reversedUsers = response.data.reverse().map((user, index) => ({
          ...user,
          slNo: response.data.length - index,
        }));
        setUserData(reversedUsers);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.response.data.detail);
        setLoading(false);
      });
  }, []);

  const columns: GridColDef[] = [
    { field: 'slNo', headerName: 'Sl No', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
    {
      field: 'is_verified',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          {params.value ? (
            <Chip label="Verified" color="primary" />
          ) : (
            <Chip label="Not Verified" color="secondary" />
          )}
        </Stack>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          disabled={params.row.is_verified}
          onClick={() => verifyHandler(params.row.id)}
        >
          {params.row.is_verified ? 'Verified' : 'Verify'}
        </Button>
      ),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Backdrop
        sx={{ color: '#f5f5f5', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box>
        <Container
          maxWidth="xl"
          style={{
            width: !isMobile ? '80%' : 'auto',
            marginLeft: !isMobile ? '300px' : 'auto',
          }}
        >
          <Typography variant="h3" align="left" gutterBottom>
            Verify User
          </Typography>
          <Paper style={{ marginBottom: '16px', backgroundColor: 'transparent' }}>
            <Typography variant="h6" align="left" style={{ padding: '16px' }}>
              Add User
            </Typography>
            <Stack spacing={2} direction="row" alignItems="center" style={{ padding: '16px' }}>
  <TextField
    label="Name"
    variant="outlined"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
  <TextField
    label="Email"
    variant="outlined"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  <TextField
    label="Password"
    variant="outlined"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    type="password"
  />
  <TextField
    label="Role"
    variant="outlined"
    value={role}
    onChange={(e) => setRole(e.target.value)}
  />
  <Button variant="contained" color="primary" onClick={handleAddUser}>
    Add
  </Button>
</Stack>
          </Paper>
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={userData}
              columns={columns}
              disableSelectionOnClick
              loading={loading}
              autoPageSize
              components={{
                Header: () => (
                  <div className="custom-header">
                    <div className="custom-header-label">My Custom Header</div>
                  </div>
                ),
              }}
            />
          </div>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default VerifyUserTable;
