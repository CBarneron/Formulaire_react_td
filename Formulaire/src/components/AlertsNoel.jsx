import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, IconButton, Switch, FormControlLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AlertsNoel = () => {
  const [open, setOpen] = useState(true); // Modal ouvert par défaut
  const [isComing, setIsComing] = useState(false); // État du switch

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = (event) => {
    setIsComing(event.target.checked);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>🎄 Bienvenue !</span>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ fontSize: '1rem', lineHeight: '1.5' }}>
            Hello ! Cette page a pour but de commencer à réfléchir à la répartition des lits pour Noël ! Si tu as la moindre question, n'hésite pas à nous écrire sur Messenger ou par <a href="mailto:example@example.com" style={{ color: '#1976d2', textDecoration: 'none' }}>email</a> ! 😊
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertsNoel;