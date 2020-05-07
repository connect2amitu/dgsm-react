import React from 'react'
import { Snackbar as SnackbarToast, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default function Snackbar({ open, message, onClose }) {
  return (
    <SnackbarToast
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={open}
      message={message}
      autoHideDuration={2000}
      action={
        <React.Fragment>
          <IconButton size="small" aria-label="close" color="inherit" >
            <CloseIcon fontSize="small" onClick={onClose} />
          </IconButton>
        </React.Fragment>
      }
    />
  )
}
