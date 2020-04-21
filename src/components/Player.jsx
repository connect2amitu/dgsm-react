
import React from 'react';
import {styled } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const MyAppBar = styled(AppBar)({
    top: 'auto',
    bottom: 0,
    position:"fixed",
});

class Player extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MyAppBar  color="secondary">
          <Toolbar>
            <p>Music player</p>
          </Toolbar>
        </MyAppBar>
      </React.Fragment>
    );
  }
}

export default Player