import React from 'react'
import { connect } from 'react-redux';
import { getQuotes, clearQuote } from '../../actions/quotes';
import { Button, Grid, CircularProgress } from '@material-ui/core';
import { playStopButtonClickHandler } from '../../shared/funs';
import { Fade } from '@material-ui/core';
import classes from '../../assets/css/track.module.scss';

class Quote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trackIndex: null,
      size: 5,
      page: 0,
      content: 'quote'
    }
    this.playStopButtonClickHandler = playStopButtonClickHandler.bind(this);
  }

  render() {
    const { quotes, isLoading, error, totalPages } = this.props
    const { page } = this.state
    var items = [];
    quotes.map((quote, index) =>
      items.push(
        <Fade in={true} key={index}>
          <Grid item xs={12}>
            <h1>{quote.quote}</h1>
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
        <Grid container spacing={3} className={classes.container}>
          {items}
          <Grid item xs={12} style={{ textAlign: "center" }}>
            {!isLoading && !error && (page < totalPages) && <Button color={"primary"} variant={"contained"} onClick={() => this.loadData()}>Load more</Button>}
            {isLoading && !error && <CircularProgress />}
            {error && "Something went wrong"}
          </Grid>
        </Grid>

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

