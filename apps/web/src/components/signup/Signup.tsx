import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '@prisma/client';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';
import * as userService from '../../services/userService';
import { Url } from '../../helper/url';

import BackgroundImage from '../../images/background-image.jpg';

interface CopyrightProps {
  sx: {
    mt: number;
  };
}

function Copyright(props: CopyrightProps) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Created By Donald Wu
    </Typography>
  );
}

function Signup() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [userRole, setUserRole] = useState<UserRole>(UserRole.NORMAL_USER);

  const handleUserRolesChange = (event: SelectChangeEvent) => {
    setUserRole(event.target.value as UserRole);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    if (data) {
      const name = data.get('name');
      const email = data.get('email');
      const password = data.get('password');
      if (name && email && password && userRole) {
        const nameStr = name as string;
        const emailStr = email as string;
        const passwordStr = password as string;
        const response = await userService.signup(
          nameStr,
          emailStr,
          passwordStr,
          [userRole]
        );
        console.log('response = ', response);

        if (response) {
          const responseData = response.data;
          if (responseData) {
            setOpen(true);
            setTimeout(() => {
              navigate(Url.LOGIN);
            }, 1500);
          }
        }
      }
    }
  };

  return (
    <>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${BackgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                type="text"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <div className="my-5">
                <FormControl className="w-full">
                  <InputLabel id="demo-simple-select-helper-label">
                    User Roles
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={userRole}
                    label="User Roles"
                    onChange={handleUserRolesChange}
                  >
                    <MenuItem value={UserRole.NORMAL_USER}>
                      Normal User
                    </MenuItem>
                    <MenuItem value={UserRole.ADMIN}>Admin</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <Button
                type="submit"
                fullWidth
                color="primary"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign up
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    component="button"
                    onClick={() => navigate(Url.LOGIN)}
                    variant="body2"
                  >
                    {'Have an account? Login'}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <CustomSnackBar type="Signup" open={open} setOpen={setOpen} />
    </>
  );
}

export default Signup;
