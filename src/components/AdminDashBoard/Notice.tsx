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
  Grid,
  Select,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material';
import NotiCard from '../NotificationCard';
import { getNotifications, sendNotification } from '../../apis/notifications';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Notice: React.FC = () => {
  // const [loading, setLoading] = useState<boolean>(false);
  const [notice, setNotice] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('all');
  const [notices, setNotices] = useState<any[]>([]);
  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleSendNotice = () => {
    const currentDate = new Date();
    const dateTimeString = currentDate.toLocaleString();

    sendNotification({ text: notice, recipient_type: recipient, time: dateTimeString }).then((_) => {
      const newNotice = {
        text:notice,
        recipient_type:recipient,
        time: dateTimeString,
      };

      setNotices((prevNotices) => [...prevNotices, newNotice]);
      setNotice('');
    }
    ).catch(error => {
      alert(error.response.data.detail);
    }
    );

  };

  const handleRecipientChange = (event: SelectChangeEvent) => {
    setRecipient(event.target.value as string);
  };

  useEffect(() => {
    getNotifications().then((response) => {
      console.log(response.data);
      
      setNotices(response.data);
    }
    ).catch(error => {
      alert(error.response.data.detail);
    }
    );
  }
    , []);

  return (
    <ThemeProvider theme={theme}>
      {/* {loading && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )} */}
      <Box>
        {/* <Container
          maxWidth="xl"
          style={{
            width: !isMobile ? '80%' : 'auto',
            marginLeft: !isMobile ? '300px' : 'auto',
          }}
        > */}
          <Typography variant="h4" align="left" gutterBottom>
            Notification Form
          </Typography>
          <Paper style={{ marginBottom: '16px', backgroundColor: 'transparent' }}>
            <Typography variant="h6" align="left" style={{ padding: '16px' }}>
              Enter the notification details
            </Typography>
            <Grid container direction={!isMobile ? 'row' : 'column'} alignItems="center" style={{ padding: '16px' }}>
              <Grid item xs={12} sx={{ marginBottom: '16px' }}>
                <TextField
                  label="Notice Text"
                  variant="outlined"
                  name='text'
                  multiline
                  rows={4}
                  fullWidth
                  value={notice}
                  onChange={(e) => setNotice(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack
                  spacing={2}
                  direction={!isMobile ? 'row' : 'column'}
                  justifyContent={!isMobile ? 'space-between' : 'flex-start'}
                  alignItems={!isMobile ? 'center' : 'flex-start'}
                >
                  <Select
                    variant="outlined"
                    value={recipient}
                    onChange={handleRecipientChange}
                    label="Send To"
                    name='recipient_type'
                    sx={{ minWidth: '200px' }}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="issuer">Issuer</MenuItem>
                    <MenuItem value="faculty">Faculty</MenuItem>
                    <MenuItem value="student">User</MenuItem>
                  </Select>
                  <Button variant="contained" color="primary" onClick={handleSendNotice}>
                    Send
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
          <Typography variant="h6" align="left" gutterBottom>
            Recent Notifications
          </Typography>
          {notices.map((n, index) => (
            <Box key={index} sx={{ marginBottom: '16px' }}>
              <NotiCard text={n.text} recipient={n.recipient_type} dateTime={n.time} />
            </Box>
          ))}
      </Box>
    </ThemeProvider>
  );
};

export default Notice;
