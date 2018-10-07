import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

type OwnProps = {
  title: string;
  open: boolean;
  onClose: (event: React.MouseEvent<HTMLElement>) => void
};

class SimpleDialog extends React.Component<OwnProps> {
  render() {
    const { title, open, onClose } = this.props;

    return (
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
        <DialogContent style={{ minWidth: 500 }}>{this.props.children}</DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={onClose}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default SimpleDialog;