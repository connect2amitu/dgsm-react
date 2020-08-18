import React from 'react'
import { Grid } from '@material-ui/core'
import classes from '../../assets/css/contact.module.scss';
import Meta from '../../components/SEO';


export default function index() {
  return (
    <div className={classes.contact}>
      <Meta title={`Contact | DGSM`} description={`Contact us for more detail and inquiry`} />

      <Grid container className={classes.heading}>
        <Grid item>
          <h1>Contact</h1>
        </Grid>
      </Grid>
      <Grid container spacing={1} direction={"column"} >
        <Grid item>
          <b>Managed By :</b>
          <p>Meera Shyam Satsang Surat. </p>
        </Grid>
        <Grid item>
          <b> For more details, </b>
          <p>Contact : (+91) 963-825-0013 </p>
        </Grid>
      </Grid>
    </div>
  )
}
