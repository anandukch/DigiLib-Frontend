import React from 'react';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/lab';


interface PopupProps {
  onClose: () => void;
  message: string;
  icon: string;
}

const Popup: React.FC<PopupProps> = ({ onClose, message, icon }) => {
  return (
    <Snackbar
      open={true}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
        {message} <span role="img" aria-label="tick">{icon}</span>
      </Alert>
    </Snackbar>
  );
};

export default Popup;
