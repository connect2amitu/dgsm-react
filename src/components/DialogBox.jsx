import React from 'react'
import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Dialog } from '@material-ui/core';

export default function DialogBox(props) {
  const { handleClose, open = false, heading = "heading", size = "sm", fullWidth = true, description = "", children, hideActionBtn = false, onSubmit } = props;
  return (
    <div>
      <Dialog fullWidth={fullWidth} maxWidth={size} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{heading}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {description}
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          {
            !hideActionBtn &&
            <>
              <Button onClick={handleClose} color="primary"> Cancel </Button>
              <Button onClick={onSubmit} color="primary"> Create </Button>
            </>
          }
        </DialogActions>
      </Dialog>
    </div>
  )
}

