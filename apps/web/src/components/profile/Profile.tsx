import React, { useEffect, useState } from 'react';
import CustomAppBar from '../customAppBar/CustomAppBar';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { User, UserRole } from '@prisma/client';
import * as userService from '../../services/userService';

function Profile() {
  const [user, setUser] = useState<User>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userRoles, setUserRoles] = useState<UserRole>(UserRole.NORMAL_USER);

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      const response = await userService.getUserById(token, userId);
      console.log('response = ', response);

      if (response) {
        const responseData = response.data;
        if (responseData) {
          setUser(responseData.user);
          setName(responseData.user.name);
          setEmail(responseData.user.email);
          setUserRoles(responseData.user.userRoles);
        }
      }
    }
  };

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(e.target.value);
  };

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value);
  };

  const handleUserRolesChange = (event: SelectChangeEvent) => {
    setUserRoles(event.target.value as UserRole);
  };

  const handleUpdateUserClick = () => {
    console.log('update user api');
  };

  const renderProfileView = () => {
    let profileView;

    if (user) {
      profileView = (
        <Container className="mx-10 my-8" component="main" maxWidth="md">
          <Card className="p-5">
            <div className="my-3">
              <Typography variant="h5" component="div">
                Profile
              </Typography>
            </div>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e)}
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
              value={email}
              onChange={(e) => handleEmailChange(e)}
            />
            <div className="my-5">
              <FormControl className="w-full">
                <InputLabel id="demo-simple-select-helper-label">
                  User Roles
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={userRoles}
                  label="User Roles"
                  onChange={handleUserRolesChange}
                >
                  <MenuItem value={UserRole.NORMAL_USER}>Normal User</MenuItem>
                  <MenuItem value={UserRole.ADMIN}>Admin</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleUpdateUserClick()}
            >
              Update User
            </Button>
          </Card>
        </Container>
      );
    }

    return profileView;
  };

  return (
    <>
      <CustomAppBar />
      {renderProfileView()}
    </>
  );
}

export default Profile;
