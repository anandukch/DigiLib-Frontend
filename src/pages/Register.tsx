import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { FaBookOpen, FaUserGraduate, FaUserTie } from 'react-icons/fa'; // Importing React Icons
import RegisterPage from './RegisterPage';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const MainPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setSelectedTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Paper sx={{ p: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ backgroundColor: '#c4d8e2' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  {/* React Icons */}
                  {selectedTab === 0 ? (
                    <FaBookOpen size={150} />
                  ) : selectedTab === 1 ? (
                    <FaUserGraduate size={150} />
                  ) : (
                    <FaUserTie size={150} />
                  )}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h4" align="center" gutterBottom>
                    User Registration
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <Tabs
                      value={selectedTab}
                      onChange={handleTabChange}
                      variant="fullWidth"
                      indicatorColor="primary"
                      textColor="primary"
                    >
                      <Tab label="Student" />
                      <Tab label="Teacher" />
                    </Tabs>
                    {selectedTab === 0 && (
                      <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                          Student Registration Form
                        </Typography>
                        <RegisterPage userType="student" />
                      </Box>
                    )}
                    {selectedTab === 1 && (
                      <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                          Teacher Registration Form
                        </Typography>
                        <RegisterPage userType="teacher" />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default MainPage;
