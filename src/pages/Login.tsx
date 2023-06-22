import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

import React, { ChangeEvent, FormEvent, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  createTheme,
  ThemeProvider,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import { FaBookOpen } from 'react-icons/fa'; // Importing React Icons
import { login } from '../apis/authApi';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Login: React.FC = () => {

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
          <Paper sx={{ p: 4, height: "50vh" }}>
            {/* <Stack spacing={2} direction={'row'} alignItems="center" style={{ padding: '16px' }}>
              <Box sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <FaBookOpen size={150} />
              </Box>
              <LoginForm />
            </Stack> */}
            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ backgroundColor: '#c4d8e2' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>


                  <FaBookOpen size={150} />

                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h4" align="center" gutterBottom>
                    User Login
                  </Typography>

                  <Box sx={{ mt: 3, p: 3 }}>

                    <LoginForm />
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

export default Login;


type FormData = {
  email: string;
  password: string;
};
const LoginForm: React.FC = () => {

  const { setToken, setRole } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    login(formData.email, formData.password).then((res) => {
      const token = res.data.access_token;
      setToken(token);
      setRole(res.data.role)
      navigate("/dashboard", { replace: true });
    }).catch((err) => {
      alert(err.response.data.detail);
    }).finally(() => {
      setLoading(false);
    }
    );
  }

  const handleRegister = () => {
    navigate("/register", { replace: true });
  }
  return (
    <>
      {
        loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        ) : null

      }
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button variant="contained" color="primary" type="submit" sx={{m:"20px"}}>
          Login
        </Button>
        <Button variant="outlined" color="primary" onClick={handleRegister}>
          Register
        </Button>
      </form>
    </>
  );
}