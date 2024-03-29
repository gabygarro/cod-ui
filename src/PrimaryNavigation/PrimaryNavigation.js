import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';

const PrimaryNavigation = ({ user, mainNav, onLogout }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState();

  return (
    <React.Fragment>
      {user ? (
        <React.Fragment>
          {mainNav.map(nav => (
            <Button
              key={nav.href}
              component="a"
              href={nav.href}
              className={classes.button}
              data-testid="partner-button"
              target={nav.target || '_self'}
            >
              {nav.label}
            </Button>
          ))}

          <IconButton
            aria-owns={open ? 'menu-appbar' : undefined}
            aria-haspopup="true"
            onClick={() => setOpen(true)}
            color="inherit"
            buttonRef={setMenuAnchor}
            data-testid="user-button"
          >
            <AccountCircle />

            <Typography variant="body1" color="inherit" className={classes.userName}>
              {user.name}
            </Typography>
          </IconButton>

          <Menu
            anchorEl={menuAnchor}
            id="menu-appbar"
            open={open}
            onClick={() => setOpen(false)}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <MenuItem disabled>My Organization</MenuItem>
            <MenuItem onClick={onLogout}>Log Out</MenuItem>
          </Menu>
        </React.Fragment>
      ) : (
        <Button component={Link} to="/login" className={classes.button}>
          Login
        </Button>
      )}
    </React.Fragment>
  );
};

PrimaryNavigation.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  mainNav: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  onLogout: PropTypes.func.isRequired,
};

PrimaryNavigation.defaultProps = {
  user: null,
  mainNav: [],
};

export default PrimaryNavigation;
