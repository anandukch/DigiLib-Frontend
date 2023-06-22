import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';

const NotiCard = ({ notice, recipient, dateTime }) => {
  return (
    <Card sx={{ backgroundColor: '#162534' }}>
      <CardContent sx={{ textAlign: 'left' }}>
        <Grid container justifyContent="space-between" alignItems="flex-start" marginBottom={1}>
          <Typography variant="body2" color="primary">
            Send To: {recipient}
          </Typography>
        </Grid>
        <Box sx={{ width: '100%' }}>
          <Typography variant="body1" gutterBottom sx={{ wordWrap: 'break-word' }}>
            {notice}
          </Typography>
        </Box>
        <Grid container justifyContent="flex-end" alignItems="flex-end">
          <Typography variant="body2" color="primary">
            {dateTime}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default NotiCard;
