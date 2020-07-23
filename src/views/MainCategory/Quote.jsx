import React from 'react'
import { connect } from 'react-redux';
import { getQuotes, clearQuote, getTitle } from '../../actions/quotes';
import { Button, Grid, CircularProgress } from '@material-ui/core';
import { Fade } from '@material-ui/core';
import classes from '../../assets/css/track.module.scss';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Quote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trackIndex: null,
      size: 10,
      page: 0,
      content: 'quote'
    }
  }

  render() {
    const { quotes, quotes_title, isLoading, error, totalPages } = this.props
    console.log('this.props =>', this.props);
    console.log('quotes_title =>', quotes_title);

    const { page } = this.state
    var items = [];
    quotes.map((quote, index) =>
      items.push(
        <Fade in={true} key={index}>
          <Grid item xs={12}>
            <p><b>{index + 1} &nbsp;</b>{quote.quote}</p>
          </Grid>
        </Fade>
      )
    )

    return (
      <div className={classes.track}>
        <Grid container className={classes.heading}>
          <Grid item>
            <h1>All Quotes</h1>
          </Grid>
        </Grid>
        {quotes_title.map((o, index) =>

          <Accordion onClick={() => console.info(o.title)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>{o.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3} className={classes.container}>
                {items}
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  {!isLoading && !error && (page < totalPages) && <Button color={"primary"} variant={"contained"} onClick={() => this.loadData()}>Load more</Button>}
                  {isLoading && !error && <CircularProgress />}
                  {error && "Something went wrong"}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>)}
        {/* <Grid container spacing={3} className={classes.container}>
          {items}

          <Grid item xs={12} style={{ textAlign: "center" }}>
            {!isLoading && !error && (page < totalPages) && <Button color={"primary"} variant={"contained"} onClick={() => this.loadData()}>Load more</Button>}
            {isLoading && !error && <CircularProgress />}
            {error && "Something went wrong"}
          </Grid>
        </Grid> */}

      </div>
    );
  }
  loadData = () => {
    const { page, size, content } = this.state
    this.setState({ page: page + 1 }, () => {
      var query = {
        size,
        order: 'desc',
        page: page * size,
        content,
        slug: this.props.match.params[0]
      }
      this.props.dispatch(getQuotes(query));
    })
  }

  loadTitleData = () => {
    var query = {
      order: 'ASC',
      slug: this.props.match.params[0]
    }
    console.log('query =>', query);

    this.props.dispatch(getTitle(query));
  }

  componentDidMount() {
    // this.loadData()
    this.loadTitleData()
  }
  componentWillUnmount() {
    this.props.dispatch(clearQuote());

  }
}


const mapStateToProps = state => {
  return {
    ...state.quote,
  }
}


var _Quote = connect(mapStateToProps)(Quote)
export default _Quote

