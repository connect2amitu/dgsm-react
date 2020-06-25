import React, { Component } from 'react'
import { Grid, Fade, Button, Paper, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { find } from 'lodash';
import { MAIN_CATEGORY } from '../../shared/constants';
import { NavLink } from 'react-router-dom';
import FolderIcon from '@material-ui/icons/Folder';
import classes from '../../assets/css/maincategory.module.scss';

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
    var data = find(MAIN_CATEGORY, { 'slug': this.props.match.params[0] });
    return (
      <div className={classes.mainCategory}>
        <Grid container spacing={2} direction={"column"} className={classes.container}>
          <Grid item className={classes.albumCard}>
            <Fade in={true}>
              <div><Button className={classes.cover} style={{ ...trackStyle, backgroundImage: `url(${data.image})` }}></Button></div>
            </Fade>
          </Grid>
          <Grid item className={classes.name}>
            <h1>{data.name}</h1>
          </Grid>
          <Grid item >
            <Grid className={classes.options} container spacing={2} justify={"center"}>
              <Grid item>
                <Button component={NavLink} to={`/browse/${this.props.match.params[0]}/bhajan`} disabled={false} variant="contained" color="primary">Bhajan</Button>
              </Grid>
              <Grid item>
                <Button component={NavLink} to={`/browse/${this.props.match.params[0]}/vani`} disabled={false} variant="contained" color="primary">Vani</Button>
              </Grid>
              {/* <Grid item>
                <Button component={NavLink} to={`/browse/${this.props.match.params[0]}/vani`} disabled={false} variant="contained" color="primary">Vani</Button>
              </Grid>
              <Grid item>
                <Button component={NavLink} to={`/browse/${this.props.match.params[0]}/bhajan`} disabled={false} variant="contained" color="primary">Bhajan</Button>
              </Grid>
              <Grid item>
                <Button component={NavLink} to={`/browse/${this.props.match.params[0]}/bhajan`} disabled={false} variant="contained" color="primary">Bhajan</Button>
              </Grid> */}
              {/* <List dense={true} style={{ width: "100%" }} component={"div"} >
                <ListItem component={NavLink} to={`/browse/${this.props.match.params[0]}/bhajan`} button>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Bhajan"
                    secondary={false ? 'Secondary text' : null}
                  />
                </ListItem>
                <ListItem component={NavLink} to={`/browse/${this.props.match.params[0]}/vani`} button>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Vani"
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
             */}
            </Grid>
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
          </Grid>
         */}
        </Grid>
      </div>
    )
  }
}
