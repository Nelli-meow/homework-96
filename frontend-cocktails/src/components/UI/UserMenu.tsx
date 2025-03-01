import { Button, Menu, MenuItem } from '@mui/material';
import { IUser } from '../../types';
import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks.ts';
import { unsetUser } from '../../features/users/UsersSlice.ts';
import { logout } from '../../features/users/usersThunk.ts';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../globalConstants.ts';
import  './userMenu.css';
import NoPic from '../../assets/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const imageSrc = user.image ? `${apiURL}/${user.image}` : NoPic;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(unsetUser());
    navigate('/');
  };


  const handleAlbums = () => {
    navigate('/cocktails/new');
    handleClose();
  };

  const handleUnpublished = () => {
    navigate('/unpublished');
    handleClose();
  };

  const handleUsersCocktails = () => {
    navigate('/my-cocktails');
    handleClose();
  };



  return user && (
    <>
      <Button
        onClick={handleClick}
        color="inherit">
        Hello, {user.displayName}!
        <img src={imageSrc} className="avatar ms-3" alt={user.email}/>
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user && user.role === 'admin' && (
          <MenuItem onClick={handleUnpublished}>Unpublished</MenuItem>
        )}
        {user && user.role === 'user' && (
          <MenuItem onClick={handleUsersCocktails}>My cocktails</MenuItem>
        )}
        <MenuItem onClick={handleAlbums}>Add new cocktail</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;