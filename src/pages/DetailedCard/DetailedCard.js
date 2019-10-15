import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useParams } from 'react-router-dom';
import cardData from '../../components/CardList/listData';

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

function DetailedCard() {
  const classes = useStyles();
  const { id } = useParams();
  const obj = cardData[id - 1];

  return (
    <div className={classes.root}>
      <div className={classes.mediaContainer}>
        <img src={obj.img} alt="movie cover" className={classes.media} />
      </div>
      <div className={classes.textContainer}>

        <div className={classes.infoText}>
          <h1 className={classes.title}>{obj.title}</h1>
          <div className={classes.infoElements}>
            <h4 className={classes.infoElement}>{obj.age}</h4>
            <h4 className={classes.infoElement}>{obj.author}</h4>
            <h4 className={classes.infoElement}>{obj.year}</h4>
            <h4 className={classes.infoElement}>{obj.duration}</h4>
          </div>
        </div>

        <div className={classes.descText}>
          <p>{obj.desc}</p>
        </div>
      </div>

    </div>
  );
}

export default DetailedCard;
