import { useState, useEffect } from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Toolbar,
  Box,
  Typography,
  Divider,
  Tooltip
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  EventNote as AttendanceIcon,
  FlightTakeoff as LeaveIcon,
  History as HistoryIcon,
  Person as ProfileIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { type NavItem } from './types';
import { useNavigate } from 'react-router-dom';

// Sets the width of the drawer when expanded
const drawerWidth = 240;

interface SidebarProps {
  username: string;
  userRole: string;
  userAvatar: string;
}

const Sidebar: React.FC<SidebarProps> = ({ username, userRole, userAvatar }) => {
  const [open, setOpen] = useState<boolean>(true);
  const [activePath, setActivePath] = useState<string>('/dashboard');
  const navigate = useNavigate()
  // Navigation items with icons
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'DashboardIcon', path: '/' },
    { id: 'attendance', label: 'Attendance', icon: 'AttendanceIcon', path: '/attendance' },
    { id: 'leave', label: 'Apply Leave', icon: 'LeaveIcon', path: '/apply-leave' },
    { id: 'history', label: 'Leave History', icon: 'HistoryIcon', path: '/leave-history' },
    { id: 'profile', label: 'Profile', icon: 'ProfileIcon', path: '/profile' },
  ];

  // Map of icon components
  const iconMap = {
    DashboardIcon: <DashboardIcon />,
    AttendanceIcon: <AttendanceIcon />,
    LeaveIcon: <LeaveIcon />,
    HistoryIcon: <HistoryIcon />,
    ProfileIcon: <ProfileIcon />,
  };

  const handleNavigation = (path: string) => {

    setActivePath(path);
    navigate(path)
    // In a real app, this would use a router navigation
    console.log(`Navigating to: ${path}`);
  };

  // Toggle drawer open/closed
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : 72,
        flexShrink: 0,
        transition: 'width 0.2s ease-in-out',
        [`& .MuiDrawer-paper`]: { 
          width: open ? drawerWidth : 72, 
          boxSizing: 'border-box',
          transition: 'width 0.2s ease-in-out',
          bgcolor: '#1e293b',
          color: '#f8fafc',
          overflowX: 'hidden'
        },
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
        {open ? (
          <Typography variant="h6" component="div" sx={{ color: '#f8fafc', fontWeight: 'bold' }}>
            Leave Tracker
          </Typography>
        ) : (
          <Typography variant="h6" component="div" sx={{ color: '#f8fafc', fontWeight: 'bold' }}>
            LT
          </Typography>
        )}
      </Toolbar>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 1, mt: -2, mb: 1 }}>
        <Box 
          onClick={toggleDrawer}
          sx={{ 
            color: '#94a3b8',
            cursor: 'pointer',
            p: 1,
            '&:hover': { color: '#f8fafc' }
          }}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </Box>
      </Box>
      
      <Divider sx={{ bgcolor: '#334155' }} />
      
      {open && (
        <Box sx={{ px: 2, py: 2, display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src={userAvatar || "/api/placeholder/40/40"}
            alt={username}
            sx={{ 
              width: 40, 
              height: 40, 
              borderRadius: '50%',
              border: '2px solid #60a5fa'
            }}
          />
          <Box sx={{ ml: 1.5 }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
              {username}
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              {userRole}
            </Typography>
          </Box>
        </Box>
      )}
      
      {!open && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <Box
            component="img"
            src={userAvatar || "/api/placeholder/40/40"}
            alt={username}
            sx={{ 
              width: 40, 
              height: 40, 
              borderRadius: '50%',
              border: '2px solid #60a5fa'
            }}
          />
        </Box>
      )}
      
      <Divider sx={{ bgcolor: '#334155' }} />
      
      <List sx={{ mt: 1 }}>
        {navItems.map((item) => {
          const isActive = activePath === item.path;
          return (
            <Tooltip title={open ? '' : item.label} placement="right" arrow key={item.id}>
              <ListItem disablePadding sx={{ display: 'block', mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    justifyContent: open ? 'initial' : 'center',
                    bgcolor: isActive ? 'rgba(96, 165, 250, 0.2)' : 'transparent',
                    borderRadius: '8px',
                    mx: 1,
                    '&:hover': {
                      bgcolor: isActive ? 'rgba(96, 165, 250, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : 'auto',
                      justifyContent: 'center',
                      color: isActive ? '#60a5fa' : '#94a3b8',
                    }}
                  >
                    {iconMap[item.icon as keyof typeof iconMap]}
                  </ListItemIcon>
                  {open && (
                    <ListItemText 
                      primary={item.label} 
                      sx={{ 
                        opacity: open ? 1 : 0,
                        '& .MuiTypography-root': {
                          fontWeight: isActive ? 'bold' : 'normal',
                          color: isActive ? '#f8fafc' : '#94a3b8',
                        }
                      }} 
                    />
                  )}
                </ListItemButton>
              </ListItem>
            </Tooltip>
          );
        })}
      </List>
      
      <Box sx={{ flexGrow: 1 }} />
      
      <List>
        <Divider sx={{ bgcolor: '#334155', mx: 2, my: 1 }} />
        <Tooltip title={open ? '' : 'Settings'} placement="right" arrow>
          <ListItem disablePadding sx={{ display: 'block', mb: 0.5 }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 2.5,
                justifyContent: open ? 'initial' : 'center',
                borderRadius: '8px',
                mx: 1,
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: '#94a3b8',
                }}
              >
                <SettingsIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Settings" sx={{ color: '#94a3b8' }} />}
            </ListItemButton>
          </ListItem>
        </Tooltip>
        <Tooltip title={open ? '' : 'Logout'} placement="right" arrow>
          <ListItem disablePadding sx={{ display: 'block', mb: 0.5 }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 2.5,
                justifyContent: open ? 'initial' : 'center',
                borderRadius: '8px',
                mx: 1,
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: '#94a3b8',
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Logout" sx={{ color: '#94a3b8' }} />}
            </ListItemButton>
          </ListItem>
        </Tooltip>
      </List>
    </Drawer>
  );
};

export default Sidebar;
