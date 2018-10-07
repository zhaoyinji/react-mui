import * as React from 'react';
import { Typography } from '@material-ui/core';
import DialogWithSelect from './containers/DialogWithSelect';
import withRoot from './withRoot';

class App extends React.Component {
  public render() {
    return (
      <div
        style={{
          padding: '50px',
          maxWidth: '600px',
          margin: 'auto',
        }}
      >
        <Typography
          align="center"
          variant="display1"
          component="h1"
        >
          Examples of Material UI
        </Typography>
        <DialogWithSelect />
      </div>
    );
  }
}

export default withRoot(App);
