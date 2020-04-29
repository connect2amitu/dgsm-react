import React from 'react'
import { DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Dialog } from '@material-ui/core';

export default function DialogBox(props) {
  const { handleClose, open = false, heading = "heading", description = "", children } = props;
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{heading}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {description}
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} color="primary"> Cancel </Button>
          <Button onClick={() => handleClose()} color="primary"> Create </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

