import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  useMediaQuery
} from '@mui/material';
import NotiCard from './NotificationCard';
import { getNotifications } from '../apis/notifications';


const Notifications: React.FC = () => {
  // const [loading, setLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any[]>()

  const isMobile = useMediaQuery('(max-width: 600px)');
  useEffect(() => {
    getNotifications()
      .then(response => {
        setNotifications(response.data);
      }
      ).catch(error => {
        alert(error.response.data.detail);
      }
      );
  }, [])


  return (
    <>
      {/* {loading && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )} */}
      <Box>
        <Container
          maxWidth="xl"
          style={{
            width: !isMobile ? '80%' : 'auto',
            marginLeft: !isMobile ? '300px' : 'auto',
          }}
        >
          <Typography variant="h6" align="left" gutterBottom>
            Recent Notifications
          </Typography>
          {notifications?.map((n, index) => (
            <Box key={index} sx={{ marginBottom: '16px' }}>
              <NotiCard text={n.notice} recipient={n.recipient} dateTime={n.dateTime} />
            </Box>
          ))}
        </Container>
      </Box>
    </>
  );
};

export default Notifications;
