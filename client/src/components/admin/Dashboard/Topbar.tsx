import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  InputBase,
  useTheme
} from '@mui/material';
import { 
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Mail as MailIcon,
  MoreVert as MoreIcon
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

interface TopbarProps {
  username: string;
  userAvatar: string;
}

const Topbar: React.FC<TopbarProps> = ({ username, userAvatar }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsEl, setNotificationsEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isNotificationsOpen = Boolean(notificationsEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        sx: {
          mt: 1.5,
          width: 200,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <Avatar
          src={userAvatar || "/api/placeholder/32/32"}
          sx={{ width: 32, height: 32, mr: 1.5 }}
        />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {username}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            View Profile
          </Typography>
        </Box>
      </Box>
      <Divider />
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>Sign out</MenuItem>
    </Menu>
  );

  const notificationsId = 'notifications-menu';
  const renderNotifications = (
    <Menu
      anchorEl={notificationsEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={notificationsId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isNotificationsOpen}
      onClose={handleNotificationsClose}
      PaperProps={{
        sx: {
          mt: 1.5,
          width: 360,
          maxHeight: 480,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Notifications</Typography>
        <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
          Mark all as read
        </Typography>
      </Box>
      <Divider />
      <MenuItem onClick={handleNotificationsClose}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Typography variant="subtitle2">Your leave request was approved</Typography>
          <Typography variant="body2" color="textSecondary">2 hours ago</Typography>
        </Box>
      </MenuItem>
      <MenuItem onClick={handleNotificationsClose}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Typography variant="subtitle2">Meeting reminder: Team sync at 3PM</Typography>
          <Typography variant="body2" color="textSecondary">4 hours ago</Typography>
        </Box>
      </MenuItem>
      <MenuItem onClick={handleNotificationsClose}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Typography variant="subtitle2">Attendance report for April is available</Typography>
          <Typography variant="body2" color="textSecondary">Yesterday</Typography>
        </Box>
      </MenuItem>
      <Divider />
      <Box sx={{ p: 1, textAlign: 'center' }}>
        <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
          View all notifications
        </Typography>
      </Box>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleNotificationsOpen}>
        <IconButton
          size="large"
          color="inherit"
        >
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar src={userAvatar || "/api/placeholder/24/24"} sx={{ width: 24, height: 24 }} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static" 
        elevation={0} 
        sx={{ 
          bgcolor: theme.palette.mode === 'dark' ? '#1e1e2d' : '#fff', 
          color: theme.palette.mode === 'dark' ? '#fff' : '#333',
          borderBottom: `1px solid ${theme.palette.mode === 'dark' ? '#2e2e3d' : '#eee'}`
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ 
              display: { xs: 'none', sm: 'block' },
              fontWeight: 'bold',
              color: theme.palette.primary.main
            }}
          >
            Leave Tracker ✈️
          </Typography>
          
          <Search sx={{ 
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
            borderRadius: '12px',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
            }
          }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <IconButton size="large" color="inherit" onClick={handleNotificationsOpen}>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar alt="User" src={userAvatar || "/api/placeholder/32/32"} />
            </IconButton>
          </Box>
          
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderMobileMenu}
      {renderNotifications}
    </Box>
  );
};

export default Topbar;
