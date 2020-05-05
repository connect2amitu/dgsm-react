import React from 'react';
import Button from '@material-ui/core/Button';
import { Snackbar as SnackbarToast, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default function Snackbar({ openSnack, msg = "Hari Om" }) {
  const [open, setOpen] = React.useState(openSnack);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <SnackbarToast
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              {msg}
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}