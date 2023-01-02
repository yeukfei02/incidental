import React, { useState } from 'react';
import CustomAppBar from '../customAppBar/CustomAppBar';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CustomBreadcrumbs from '../customBreadcrumbs/CustomBreadcrumbs';
import CustomSnackBar from '../customSnackBar/CustomSnackBar';
import * as userService from '../../services/userService';

function Settings() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [snackbarText, setSnackbarText] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleChangePasswordClick = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId && password && confirmPassword) {
      if (password === confirmPassword) {
        const response = await userService.changePassword(
          token,
          userId,
          password
        );
        console.log('response = ', response);

        if (response) {
          const responseData = response.data;
          if (responseData) {
            setSnackbarOpen(true);
            setSnackbarText('Change password');

            setPassword('');
            setConfirmPassword('');
          }
        }
      }
    }
  };

  const renderSettingsView = () => {
    const settingsView = (
      <Container className="mx-10" component="main" maxWidth="md">
        <Card className="p-5">
          <div className="my-3">
            <Typography variant="h5" component="div">
              Settings
            </Typography>
          </div>
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoComplete="password"
            type="password"
            value={password}
            onChange={(e) => handlePasswordChange(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            autoComplete="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e)}
          />
          <Button
            fullWidth
            color="primary"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleChangePasswordClick()}
          >
            Change Password
          </Button>
        </Card>
      </Container>
    );

    return settingsView;
  };

  return (
    <>
      <CustomAppBar />

      <div className="px-10 py-6">
        <CustomBreadcrumbs page="Settings" />
      </div>

      {renderSettingsView()}

      <CustomSnackBar
        type={snackbarText}
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
      />
    </>
  );
}

export default Settings;
