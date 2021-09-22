import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PopupState from 'material-ui-popup-state';
import { Box } from '@material-ui/core';
import { Zoom } from 'react-awesome-reveal';
import PropTypes from 'prop-types';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  dspCard: {
    padding: theme.spacing(1),
  },
  dspCardImage: {},
  buttons: {
    margin: theme.spacing(1),
    display: 'flex',
  },
  content: {
    paddingBottom: theme.spacing(0),
  },
  modal: {
    width: '85%',
    margin: 'auto',
    marginTop: theme.spacing(10),
  },
  cardContents: {
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  fullCard: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardImg: {
    width: '25%',
  },
  cardRest: {
    width: '45%',
  },
  cardActionBox: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '30%',
  },
  quantityBox: {
    alignItems: 'center',
    height: '50%',
  },
  btnBox: {
    flexDirection: 'row',
    height: '50%',
  },
  incDecBtns: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    fontSize: 'large',
  },
}));

const DisplayItemCard = ({ displayItem }) => {
  const classes = useStyles();
  //   const { labId, categoryID } = useParams();
  const [quantity, setQuantity] = useState(0);

  return (
    <Zoom triggerOnce>
      <Card className={classes.dspCard}>
        <div className={classes.fullCard}>
          <div className={classes.cardImg}>
            <CardMedia
              className={classes.dspCardImage}
              component="img"
              alt="Display Item Photo"
              width="200"
              image={displayItem.image}
              title="Display Item Photo"
            />
          </div>
          <div className={classes.cardRest}>
            <CardContent className={classes.content}>
              <PopupState variant="popover" popupId="demo-popup-popover">
                {popupState => (
                  <div>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      align="center"
                    >
                      {displayItem.name}
                    </Typography>
                    <Box p={2}>
                      <Typography variant="h6" component="h6">
                        Description
                      </Typography>
                      <Typography>{displayItem.description}</Typography>
                    </Box>
                  </div>
                )}
              </PopupState>
            </CardContent>
          </div>
          <div className={classes.cardActionBox}>
            <CardActions className={classes.cardContents}>
              <div className={classes.quantityBox}>
                {quantity > 0 ? (
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h1"
                    align="center"
                  >
                    Quantity : {quantity}
                  </Typography>
                ) : (
                  <div />
                )}
              </div>
              <div className={classes.btnBox}>
                {quantity === 0 && (
                  <Button
                    onClick={() => setQuantity(1)}
                    variant="contained"
                    color="secondary"
                    className={classes.buttons}
                  >
                    Add to Bucket
                  </Button>
                )}
                {quantity > 0 && (
                  <div className={classes.incDecBtns}>
                    <Button
                      onClick={() => setQuantity(quantity - 1)}
                      variant="contained"
                      color="secondary"
                      className={classes.buttons}
                    >
                      -
                    </Button>
                    <Button
                      onClick={() => setQuantity(quantity + 1)}
                      variant="contained"
                      color="secondary"
                      className={classes.buttons}
                    >
                      +
                    </Button>
                  </div>
                )}
              </div>
            </CardActions>
          </div>
        </div>
      </Card>
    </Zoom>
  );
};

DisplayItemCard.propTypes = {
  displayItem: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DisplayItemCard;
