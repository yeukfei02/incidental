import React, { useState } from 'react';
import CustomAppBar from '../customAppBar/CustomAppBar';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Settings() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleChangePasswordClick = () => {
    console.log('change password api');
  };

  const renderSettingsView = () => {
    const settingsView = (
      <Container className="mx-10 my-8" component="main" maxWidth="md">
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
      {renderSettingsView()}
    </>
  );
}

export default Settings;
