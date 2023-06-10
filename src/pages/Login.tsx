import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

// const Login = () => {
//   const { setToken } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     setToken("this is a test token");
//     navigate("/", { replace: true });
//   };

//   setTimeout(() => {
//     handleLogin();
//   }, 3 * 1000);

//   return <>Login Page</>;
// };

// export default Login;

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
          <Paper sx={{ p: 4 }}>
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
                  <Box sx={{ mt: 3 }}>
                    <Box sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom>
                      </Typography>
                      <LoginForm />
                    </Box>
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

  const { setToken } = useAuth();
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
      navigate("/", { replace: true });
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    }
    );
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

        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </>
  );
}