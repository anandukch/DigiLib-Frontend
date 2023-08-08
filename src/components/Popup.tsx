import React from 'react';
import { Alert, Snackbar } from '@mui/material';


interface PopupProps {
  onClose: () => void;
  message: string;
  icon: string | undefined;
  severity?: "success" | "info" | "warning" | "error" | undefined;
}

const Popup: React.FC<PopupProps> = ({ onClose, message, icon, severity = "success" }) => {
  return (
    <Snackbar
      open={true}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message} <span role="img" aria-label="tick">{icon}</span>
      </Alert>
    </Snackbar>
  );
};

export default Popup;
