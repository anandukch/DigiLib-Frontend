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
  TextField,
  Snackbar
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { createUser, getAllUsers, verifyUser } from '../../apis/userApi';
import { UserData } from '../../types';
import { Alert } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import Popup from '../Popup';

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
  const [showSnackbar, setShowSnackbar] = useState(false);

  const closeSnackbar = () => {
    setShowSnackbar(false);
  };

  const verifyHandler = (id: string) => {
    setLoading(true)
    verifyUser(id)
      .then(_ => {
        getAllUsers()
          .then((response) => {
            setUserData(response.data);
            setLoading(false);
          })
          .catch((error) => {
            alert(error.response.data.detail);
            setLoading(false);
          });
        setLoading(false)
      }
      ).catch(error => {
        alert(error.response.data.detail);
        setLoading(false)
      }
      );
  }
  

  const handleAddUser = () => {
    setLoading(true);
    createUser({ name, email, password, role })
      .then(_ => {
        getAllUsers()
          .then((response) => {
            setUserData(response.data);
            setLoading(false);
          })
          .catch((error) => {
            alert(error.response.data.detail);
            setLoading(false);
          });
        setName('');
        setEmail('');
        setPassword('');
        setRole('');
        setLoading(false);
        setShowSnackbar(true);
      }
      ).catch(error => {
        alert(error.response.data.detail);
      }
      );
  };


  useEffect(() => {
    setLoading(true);
    getAllUsers()
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.response.data.detail);
        setLoading(false);
      });
  }, []);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 200 },
    {
      field: 'verified',
      width: 200,
      headerName: 'Status',
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
      renderCell: (params) => (
        params.row.verified ? (<Button
          variant="contained"
          color="primary"
          disabled
        >
          Verified
        </Button>) :
          (<Button
            variant="contained"
            color="primary"
            onClick={() => verifyHandler(params.row.id)}
          >
            Verify
          </Button>)
      ), width: 200

    },
    
  {
    field: 'delete',
    headerName: '',
    renderCell: (params) => (
      <Button
        color="error"
        onClick={() => handleDeleteUser(params.row.id)}
        startIcon={<DeleteIcon />}
      >
      </Button>
    ),
    width: 150,
    sortable: false,
    filterable: false,
  },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Typography variant="h4" align="left" gutterBottom>
          Verify User
        </Typography>
        <Paper style={{ marginBottom: '16px', backgroundColor: 'transparent' }}>
          <Typography variant="h6" align="left" style={{ padding: '16px' }}>
            Add User
          </Typography>
          <Stack spacing={2} direction={!isMobile ? "row" : "column"} alignItems="center" style={{ padding: '16px' }}>
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
        <div>
          <DataGrid
            rows={userData}
            columns={columns}
            disableRowSelectionOnClick
            loading={loading}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 6,
                },
              },
            }}
            pageSizeOptions={[6]}

          />
        </div>
      </Box>
      {showSnackbar && (
        <Popup onClose={closeSnackbar} message="User Added Successfully" icon="✅" />
      )}
    </ThemeProvider>
  );
};

export default VerifyUserTable;
