import React, { useState } from 'react';
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
  InputAdornment,
} from '@mui/material';
import { AttachMoney } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const ManageLib: React.FC = () => {
  const [fineRate, setFineRate] = useState<string>('0');
  const [days, setDays] = useState<string>('0');
  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleUpdate = () => {
    // Perform the update logic here
    console.log('Fine Rate:', fineRate);
    console.log('Days:', days);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Container
          maxWidth="xl"
          style={{
            width: !isMobile ? '80%' : 'auto',
            marginLeft: !isMobile ? '300px' : 'auto',
          }}
        >
          <Typography variant="h3" align="left" gutterBottom>
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
                onChange={(e) => setFineRate(e.target.value)}
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
                onChange={(e) => setDays(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Update
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ManageLib;
