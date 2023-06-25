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
  TextField,
  InputAdornment,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { add_lib_config, get_lib_config } from '../../apis/library';
import Loader from '../Loader/Loader';
import Popup from '../Popup';


const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const ManageLib: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fineRate, setFineRate] = useState<string>('0');
  const [days, setDays] = useState<string>('0');
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [showSnackbar, setShowSnackbar] = useState(false);


  const handleUpdate = () => {
    add_lib_config({ fine_rate: parseInt(fineRate), days_of_return: parseInt(days) })
      .then(() => {
        setFineRate(fineRate);
        setDays(days);
        setShowSnackbar(true);
      })
      .catch(error => {
        alert(error.response.data.detail);
      });
  };

  const closeSnackbar = () => {
    setShowSnackbar(false);
  };

  useEffect(() => {
    setLoading(true);
    get_lib_config()
      .then(response => {
        setFineRate(response.data.fine_rate);
        setDays(response.data.days_of_return);
        setLoading(false);
      })
      .catch(error => {
        alert(error.response.data.detail);
      });
  }, []);


  return (
    <ThemeProvider theme={theme}>
      {loading && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <Loader />
        </Backdrop>
      )}
      <Box>
        <Typography variant="h4" align="left" gutterBottom>
          Fine details
        </Typography>
        <Paper style={{ marginBottom: '16px', backgroundColor: 'transparent' }}>
          <Typography variant="h6" align="left" style={{ padding: '16px' }}>
            Enter the fine details
          </Typography>
          <Stack spacing={2} direction={!isMobile ? 'row' : 'column'} alignItems="center" style={{ padding: '16px' }}>
            <TextField
              label="Fine Rate (in Rupees)"
              variant="outlined"
              type="number"
              value={fineRate}
              onChange={(e) => {
                const input = e.target.value;
                if (input === '' || parseInt(input) >= 0) {
                  setFineRate(input);
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    ₹
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Days of Return"
              variant="outlined"
              type="number"
              value={days}
              onChange={(e) => {
                const input = e.target.value;
                if (input === '' || parseInt(input) >= 0) {
                  setDays(input);
                }
              }}
            />
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update
            </Button>
          </Stack>
        </Paper>
      </Box>
      {showSnackbar && (
        <Popup onClose={closeSnackbar} message="Updated the Fine Successfully" icon="✅" />
      )}
    </ThemeProvider>
  );
};

export default ManageLib;
