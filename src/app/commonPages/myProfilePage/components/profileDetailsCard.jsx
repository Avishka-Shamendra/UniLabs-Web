import {
  Button,
  makeStyles,
  Container,
  Typography,
  Box,
} from '@material-ui/core';
import { useState } from 'react';
import { Zoom } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import ChangePasswordForm from './changePasswordForm';
import UpdateProfileDetailsForm from './updateProfileDetailsForm';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    marginTop: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profilePicContainer: {
    marginTop: theme.spacing(2),
    alignItems: 'center',
  },
  profilePic: {
    width: 250,
    borderRadius: 150,
    marginBottom: theme.spacing(1),
    alignItems: 'center',
  },
  biggerCont: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileDetailBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  profileDetailContainer: {
    margin: theme.spacing(1),
  },
  profileDetailValContainer: {
    margin: theme.spacing(1),
  },
  btn: {
    padding: theme.spacing(1),
    width: '50%',
    align: 'center',
  },
}));

const ProfileDetailsCard = () => {
  const classes = useStyles();

  const firstName = useSelector(state => state.auth.user.firstName);
  const lastName = useSelector(state => state.auth.user.lastName);
  const email = useSelector(state => state.auth.user.email);
  const contactNumber = useSelector(state => state.auth.user.contactNumber);
  const image = useSelector(state => state.auth.user.image);

  const [editable, setEditable] = useState(false);
  const [changePwdClicked, setChangePwdClicked] = useState(false);

  const handleSaveDetails = e => {
    e.preventDefault();
  };

  let childComponent = null;
  if (editable && !changePwdClicked) {
    childComponent = (
      <UpdateProfileDetailsForm
        onSave={handleSaveDetails}
        onCancel={() => setEditable(false)}
      />
    );
  } else if (changePwdClicked && !editable) {
    childComponent = (
      <ChangePasswordForm
        onSave={handleSaveDetails}
        onCancel={() => setChangePwdClicked(false)}
      />
    );
  } else {
    childComponent = (
      <Box>
        <Zoom triggerOnce>
          <div className={classes.biggerCont}>
            <div className={classes.profileDetailBox}>
              <div className={classes.profileDetailContainer}>
                <Typography variant="h6" className={classes.profileDetail}>
                  Email
                </Typography>
                <Typography variant="h6" className={classes.profileDetail}>
                  Name
                </Typography>
                <Typography variant="h6" className={classes.profileDetail}>
                  Contact Number
                </Typography>
              </div>
              <div className={classes.profileDetailContainer}>
                <Typography variant="h6" className={classes.profileDetail}>
                  {' '}
                  :
                </Typography>
                <Typography variant="h6" className={classes.profileDetail}>
                  {' '}
                  :
                </Typography>
                <Typography variant="h6" className={classes.profileDetail}>
                  {' '}
                  :{' '}
                </Typography>
              </div>
              <div className={classes.profileDetailValContainer}>
                <Typography variant="h6" className={classes.profileDetailVal}>
                  {email}
                </Typography>
                <Typography variant="h6" className={classes.profileDetailVal}>
                  {firstName.concat(lastName).trim().length > 0
                    ? `${firstName} ${lastName}`
                    : 'Not Set'}
                </Typography>
                <Typography variant="h6" className={classes.profileDetailVal}>
                  {contactNumber.length > 0 ? contactNumber : 'Not Set'}
                </Typography>
              </div>
            </div>
          </div>
          <Box m={1} />
          <Box align="center">
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={() => setEditable(true)}
            >
              Change Profile Details
            </Button>
            <Box m={1} />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.btn}
              onClick={() => setChangePwdClicked(true)}
            >
              Change Password
            </Button>
          </Box>
        </Zoom>
      </Box>
    );
  }
  return (
    <Container className={classes.container}>
      <Zoom triggerOnce>
        <Box align="center">
          <img
            src={image != null ? image : '/images/default-avatar.svg'}
            alt="Profile Pic"
            className={classes.profilePic}
          />
        </Box>
      </Zoom>
      <Zoom triggerOnce>{childComponent}</Zoom>
    </Container>
  );
};

// CategoryCard.propTypes = {
//   category: PropTypes.objectOf(PropTypes.elements).isRequired,
// };

export default ProfileDetailsCard;
