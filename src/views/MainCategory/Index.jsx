import React, { Component } from 'react'
import { Grid, Fade, Button, Paper, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { find } from 'lodash';
import { MAIN_CATEGORY } from '../../shared/constants';
import { NavLink } from 'react-router-dom';
import FolderIcon from '@material-ui/icons/Folder';

var trackStyle = {
  borderRadius: "10px",
  height: "180px",
  width: "180px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}

export default class MainCategoryDetail extends Component {
  render() {
    return (
      <>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item xs={12}>
            <Fade in={true}>
              <div><Button style={{ ...trackStyle, backgroundImage: `url('https://gogreen-nursery.com/dgsm/uploads/dgsm/${this.props.match.params[0]}.jpg')` }}></Button></div>
            </Fade>
            <h1 style={{ margin: 0, fontSize: 18 }}>{find(MAIN_CATEGORY, { 'slug': this.props.match.params[0] }).name}</h1>
          </Grid>
          <Grid item xs={12}>
          </Grid>
          <Grid item xs={12}>
            <List dense={true} style={{ width: "100%" }} component={"div"} >
              <ListItem component={NavLink} to={`/browse/${this.props.match.params[0]}/vani`} button>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Vani"
                  secondary={false ? 'Secondary text' : null}
                />
              </ListItem>
              <ListItem component={NavLink} to={`/browse/${this.props.match.params[0]}/bhajan`} button>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Bhajan"
                  secondary={false ? 'Secondary text' : null}
                />
              </ListItem>
              <ListItem component={NavLink} to={`/browse/${this.props.match.params[0]}/image`} button>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Image"
                  secondary={false ? 'Secondary text' : null}
                />
              </ListItem>
              <ListItem component={NavLink} to={`/browse/${this.props.match.params[0]}/e-book`} button>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText
                  primary="E-book"
                  secondary={false ? 'Secondary text' : null}
                />
              </ListItem>
              <ListItem component={NavLink} to={`/browse/${this.props.match.params[0]}/video`} button>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Video"
                  secondary={false ? 'Secondary text' : null}
                />
              </ListItem>
            </List>
          </Grid>
          {/* <Grid item>
            <Grid container spacing={1}>
              <Grid item>
                <Paper variant="outlined" square >
                  <Button component={NavLink} to={`/browse/${this.props.match.params[0]}/vani`} disabled={false} variant="contained" color="primary">Vani</Button>
                </Paper>

              </Grid>
              <Grid item>
                <Button component={NavLink} to={`/browse/${this.props.match.params[0]}/bhajan`} disabled={false} variant="contained" color="primary">Bhajan</Button>
              </Grid>
              <Grid item>
                <Button component={NavLink} to={`/browse/${this.props.match.params[0]}/image`} disabled={true} variant="contained" color="primary">Image</Button>
              </Grid>
              <Grid item>
                <Button component={NavLink} to={`/browse/${this.props.match.params[0]}/e-book`} disabled={true} variant="contained" color="primary">E-Book</Button>
              </Grid>
              <Grid item>
                <Button component={NavLink} to={`/browse/${this.props.match.params[0]}/video`} disabled={true} variant="contained" color="primary">Video</Button>
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </>
    )
  }
}
