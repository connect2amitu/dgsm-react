import React from 'react'
import { connect } from 'react-redux';
import { getQuotes, clearQuote, getTitle } from '../../actions/quotes';
import { Grid, CircularProgress } from '@material-ui/core';
import classes from '../../assets/css/track.module.scss';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NoResultFound from '../../components/NoResultFound';

class Quote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: 'quote'
    }
  }

  render() {
    const { quotes, isLoading, error } = this.props

    return (
      <div className={classes.track}>
        <Grid container className={classes.heading}>
          <Grid item>
            <h1>All Quotes</h1>
          </Grid>
        </Grid>
        {!isLoading && quotes && Object.keys(quotes).map((o, index) =>

          <Accordion onClick={() => console.info(o)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <b>{o}</b>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                {
                  quotes[o].quotes.map((quote, index) =>
                    <p key={index}><b>{index + 1} &nbsp;</b>{quote.quote}</p>
                  )
                }
              </div>
            </AccordionDetails>
          </Accordion>)}
        <Grid container spacing={3} className={classes.container}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            {isLoading && !error && <CircularProgress />}
            {!isLoading && !error && quotes === null && <NoResultFound />}
            {error && "Something went wrong"}
          </Grid>
        </Grid>

      </div>
    );
  }
  loadData = () => {
    const { page } = this.state
    this.setState({ page: page + 1 }, () => {
      var query = {
        order: 'ASC',
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
    this.props.dispatch(getTitle(query));
  }

  componentDidMount() {
    this.loadData()
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

