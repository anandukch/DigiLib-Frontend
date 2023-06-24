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


const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const ManageLib: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fineRate, setFineRate] = useState<string>('0');
  const [days, setDays] = useState<string>('0');
  const [showComment, setShowComment] = useState<boolean>(false); // New state for showing the comment
  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleUpdate = () => {
    add_lib_config({ fine_rate: parseInt(fineRate), days_of_return: parseInt(days) })
      .then(() => {
        setFineRate(fineRate);
        setDays(days);
        setShowComment(true); // Show the comment
        setTimeout(() => {
          setShowComment(false); // Hide the comment after 3 seconds (adjust the delay as needed)
        }, 3000);
      })
      .catch(error => {
        alert(error.response.data.detail);
      });
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
      {
        loading && <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <Loader />
        </Backdrop>
      }
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
              label="Days"
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
            {showComment && (
              <Typography variant="body2" style={{ marginLeft: '16px', color: 'green' }}>
                Fine has been updated!
              </Typography>
            )}
          </Stack>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default ManageLib;
