// @flow
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

const MaterialLoader = () => (
  <div>
    <MuiThemeProvider>
      <CircularProgress />
    </MuiThemeProvider>
  </div>
);

export default MaterialLoader;
