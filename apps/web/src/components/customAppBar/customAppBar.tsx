import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Url } from '../../helper/url';

function CustomAppBar() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGoToPath = (url: Url) => {
    setAnchorEl(null);

    if (url !== Url.LOGOUT) {
      navigate(url);
    } else {
      localStorage.clear();
      navigate(Url.HOME);
      window.location.reload();
    }
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Incidental
        </Typography>
        <nav>
          <span
            color="text.primary"
            className="mx-3 cursor-pointer"
            onClick={() => handleGoToPath(Url.INCIDENTS)}
          >
            Incidents
          </span>
          <span
            color="text.primary"
            className="mx-3 cursor-pointer"
            onClick={() => handleGoToPath(Url.SETTINGS)}
          >
            Settings
          </span>
        </nav>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleGoToPath(Url.PROFILE)}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => handleGoToPath(Url.SETTINGS)}>
              Settings
            </MenuItem>
            <MenuItem onClick={() => handleGoToPath(Url.LOGOUT)}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default CustomAppBar;
