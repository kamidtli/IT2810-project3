import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import MovieChart from '../../components/MovieChart';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    marginTop: theme.spacing(12),
    maxWidth: 1000,
    overflow: 'hidden',
    color: theme.palette.text.primary,
  },
  mediaContainer: {
    width: '100%',
    maxHeight: '500px',
    overflow: 'hidden',
    borderRadius: '5px',
  },
  media: {
    width: '100%',
  },
  textContainer: {
    width: '100%',
    padding: theme.spacing(2),
  },
  infoText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: theme.spacing(2),
  },
  infoElements: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: theme.spacing(4),
    opacity: 0.6,
  },
  infoElement: {
    margin: 0,
    whiteSpace: 'nowrap',
    textAlign: 'right',
  },
  descText: {
    padding: theme.spacing(2),
  },
  title: {
    margin: 0,
  },
}));

function DetailedCard(props) {
  const classes = useStyles();
  const { id } = useParams();
  const currentId = props.selectedItem; // useSelector((state) => state.clickCard[state.clickCard.length - 1].id);
  const defaultPoster = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1340&q=80';

  const SEARCH_QUERY = gql`
  {
    movie (_id: "${id}") {
      _id
      title
      fullplot
      poster
      year
      directors
      imdb {
        rating
      }
    }
  }
  `;

  const { data, loading, error } = useQuery(SEARCH_QUERY);
  if (loading) return <p>LOADING</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className={classes.root}>
      <div className={classes.mediaContainer}>
        <img
          src={data.movie.poster || defaultPoster}
          alt="movie cover"
          className={classes.media}
        />
      </div>
      <MovieChart
        id={data.movie._id}
        imdbRating={parseFloat(data.movie.imdb.rating)}
        year={data.movie.year}
      />
      <div className={classes.textContainer}>
        <div className={classes.infoText}>
          <h1 className={classes.title}>{data.movie.title}</h1>
          <div className={classes.infoElements}>
            <h4 className={classes.infoElement}>{data.movie.year}</h4>
            {data.movie.directors.map((director, index) => (
              <h4
                key={data.movie._id.concat(`:${index}`)}
                className={classes.infoElement}
              >
                {director}
              </h4>
            ))}
            <h4 className={classes.infoElement}>{data.movie.runtime}</h4>
          </div>
        </div>

        <div className={classes.descText}>
          <p>{data.movie.fullplot}</p>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  selectedItem: state.currentCard,
});

const mapDispatchToProps = (dispatch) => ({
  addPage: (page) => dispatch({ type: 'NEW_PAGE', page }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailedCard);
