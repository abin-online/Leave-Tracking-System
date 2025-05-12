import { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  useTheme, 
  Card, 
  CardContent, 
  LinearProgress,
  Chip,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  IconButton,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { GridLegacy as Grid } from '@mui/material';

import { 
  AccessTime as AccessTimeIcon,
  CalendarToday as CalendarTodayIcon,
  EventBusy as EventBusyIcon,
  HourglassEmpty as HourglassEmptyIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  ArrowForward as ArrowForwardIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { type AttendanceData, type LeaveBalance } from "./types";

// Sample data
const leaveBalanceData: LeaveBalance = {
  casual: 8,
  sick: 5,
  personal: 3,
  total: 16
};

const attendanceData: AttendanceData = {
  checkIn: '09:15 AM',
  checkOut: null, // Still working
  status: 'present'
};

const recentLeaveRequests = [
  { id: 1, type: 'Casual Leave', from: '2025-05-20', to: '2025-05-21', status: 'pending', days: 2 },
  { id: 2, type: 'Sick Leave', from: '2025-04-15', to: '2025-04-15', status: 'approved', days: 1 },
  { id: 3, type: 'Personal Leave', from: '2025-03-10', to: '2025-03-12', status: 'rejected', days: 3 },
];


const upcomingHolidays = [
  { id: 1, name: 'Memorial Day', date: 'May 26, 2025', days: 3 },
  { id: 2, name: 'Independence Day', date: 'July 4, 2025', days: 14 },
  { id: 3, name: 'Labor Day', date: 'September 1, 2025', days: 32 },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
};

const AdminDashboardComponent: React.FC = () => {
  const theme = useTheme();
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState<number>(0);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
      case 'present':
        return 'success';
      case 'pending':
      case 'leave':
        return 'warning';
      case 'rejected':
      case 'sick':
      case 'absent':
        return 'error';
      default:
        return 'default';
    }
  };

  // Calculate leave utilization percentage
  const leaveUtilization = Math.round(((20 - leaveBalanceData.total) / 20) * 100);

  return (
    <Box sx={{ 
      display: "flex", 
      height: "100vh", 
      bgcolor: darkMode ? '#121212' : '#f5f7fa',
      color: darkMode ? '#fff' : 'inherit'
    }}>
      <Sidebar 
        username="Anu Sharma" 
        userRole="Senior Developer" 
        userAvatar="/api/placeholder/48/48" 
      />

      <Box component="main" sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Topbar 
          username="Anu Sharma" 
          userAvatar="/api/placeholder/48/48"
        />

        <Box sx={{ p: 3 }}>
          {/* Welcome Section */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                Welcome Back, Anu! ✨
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CalendarTodayIcon />}
              sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
            >
              Apply Leave
            </Button>
          </Box>

          {/* Main Stat Cards */}
          <Grid container spacing={3} mb={3}>
            {/* Today's Attendance Card */}
            <Grid item xs={12} md={4}>
              <Card 
                sx={{ 
                  borderRadius: 3, 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  height: '100%',
                  background: darkMode 
                    ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' 
                    : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'medium' }}>Today's Attendance</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {attendanceData.checkIn}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Check-in Time
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {attendanceData.checkOut || '-- : --'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Check-out Time
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip 
                      label={attendanceData.status} 
                      color={getStatusColor(attendanceData.status)}
                      size="small"
                      sx={{ borderRadius: 1, textTransform: 'capitalize' }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      {attendanceData.status === 'present' 
                        ? 'Working hours in progress' 
                        : attendanceData.status === 'late' 
                          ? 'Arrived 15 minutes late' 
                          : 'Not checked in'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Leave Balance Card */}
            <Grid item xs={12} md={4}>
              <Card 
                sx={{ 
                  borderRadius: 3, 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  height: '100%',
                  background: darkMode 
                    ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' 
                    : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CalendarTodayIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'medium' }}>Leave Balance</Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" color="text.secondary">Utilized</Typography>
                      <Typography variant="body2" color="text.secondary">{leaveUtilization}%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={leaveUtilization} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        bgcolor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                      }} 
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ flex: '1 0 30%' }}>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                        {leaveBalanceData.casual}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Casual
                      </Typography>
                    </Box>
                    <Box sx={{ flex: '1 0 30%' }}>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                        {leaveBalanceData.sick}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Sick
                      </Typography>
                    </Box>
                    <Box sx={{ flex: '1 0 30%' }}>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#9c27b0' }}>
                        {leaveBalanceData.personal}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Personal
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Pending Requests Card */}
            <Grid item xs={12} md={4}>
              <Card 
                sx={{ 
                  borderRadius: 3, 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  height: '100%',
                  background: darkMode 
                    ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' 
                    : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <HourglassEmptyIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'medium' }}>Pending Requests</Typography>
                  </Box>
                  
                  {recentLeaveRequests.filter(req => req.status === 'pending').length > 0 ? (
                    <List sx={{ p: 0 }}>
                      {recentLeaveRequests
                        .filter(req => req.status === 'pending')
                        .slice(0, 2)
                        .map((request) => (
                          <ListItem 
                            key={request.id} 
                            disablePadding 
                            sx={{ 
                              py: 1.5, 
                              borderBottom: '1px solid',
                              borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                              '&:last-child': { borderBottom: 'none' }
                            }}
                          >
                            <ListItemText
                              primary={request.type}
                              secondary={`${request.from} - ${request.to} (${request.days} ${request.days > 1 ? 'days' : 'day'})`}
                              primaryTypographyProps={{ fontWeight: 'medium' }}
                            />
                            <Chip 
                              label={request.status} 
                              color={getStatusColor(request.status)}
                              size="small"
                              sx={{ 
                                borderRadius: 1, 
                                textTransform: 'capitalize',
                                minWidth: 80,
                                justifyContent: 'center'
                              }}
                            />
                          </ListItem>
                        ))}
                    </List>
                  ) : (
                    <Box sx={{ py: 2, textAlign: 'center' }}>
                      <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        No pending leave requests
                      </Typography>
                    </Box>
                  )}
                  
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      endIcon={<ArrowForwardIcon />}
                      sx={{ 
                        borderRadius: 2, 
                        textTransform: 'none',
                        px: 2
                      }}
                    >
                      View All Requests
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          {/* Detailed Content */}
          <Grid container spacing={3}>
            {/* Leave History/Records Section */}
            <Grid item xs={12} md={8}>
              <Card 
                sx={{ 
                  borderRadius: 3, 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  background: darkMode 
                    ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' 
                    : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'medium' }}>Leave Records</Typography>
                    
                    <IconButton size="small">
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                  
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs 
                      value={tabValue} 
                      onChange={handleTabChange} 
                      aria-label="leave records tabs"
                      sx={{
                        '& .MuiTab-root': {
                          minWidth: 'auto',
                          px: 2,
                          py: 1,
                          textTransform: 'none',
                          fontWeight: 'medium'
                        }
                      }}
                    >
                      <Tab label="Recent" />
                      <Tab label="Upcoming" />
                      <Tab label="History" />
                    </Tabs>
                  </Box>
                  
                  {/* Recent Tab */}
                  <TabPanel value={tabValue} index={0}>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>Period</TableCell>
                            <TableCell>Days</TableCell>
                            <TableCell align="right">Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {recentLeaveRequests.map((request) => (
                            <TableRow 
                              key={request.id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {request.type}
                              </TableCell>
                              <TableCell>{request.from} - {request.to}</TableCell>
                              <TableCell>{request.days}</TableCell>
                              <TableCell align="right">
                                <Chip 
                                  label={request.status} 
                                  color={getStatusColor(request.status)}
                                  size="small"
                                  sx={{ 
                                    borderRadius: 1, 
                                    textTransform: 'capitalize',
                                    minWidth: 80,
                                    justifyContent: 'center'
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </TabPanel>
                  
                  {/* Upcoming Tab */}
                  <TabPanel value={tabValue} index={1}>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <CalendarTodayIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2, opacity: 0.7 }} />
                      <Typography variant="h6">No upcoming leave scheduled</Typography>
                      <Typography variant="body2" color="text.secondary">
                        You have no upcoming leave plans. Click "Apply Leave" to request time off.
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, borderRadius: 2, textTransform: 'none' }}
                      >
                        Apply Leave
                      </Button>
                    </Box>
                  </TabPanel>
                  
                  {/* History Tab */}
                  <TabPanel value={tabValue} index={2}>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>Period</TableCell>
                            <TableCell>Days</TableCell>
                            <TableCell align="right">Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/* Sample historical data */}
                          <TableRow>
                            <TableCell>Sick Leave</TableCell>
                            <TableCell>2025-02-15 - 2025-02-16</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell align="right">
                              <Chip 
                                label="approved" 
                                color="success"
                                size="small"
                                sx={{ 
                                  borderRadius: 1, 
                                  textTransform: 'capitalize',
                                  minWidth: 80,
                                  justifyContent: 'center'
                                }}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Casual Leave</TableCell>
                            <TableCell>2025-01-10 - 2025-01-10</TableCell>
                            <TableCell>1</TableCell>
                            <TableCell align="right">
                              <Chip 
                                label="approved" 
                                color="success"
                                size="small"
                                sx={{ 
                                  borderRadius: 1, 
                                  textTransform: 'capitalize',
                                  minWidth: 80,
                                  justifyContent: 'center'
                                }}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Personal Leave</TableCell>
                            <TableCell>2024-12-20 - 2024-12-24</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell align="right">
                              <Chip 
                                label="approved" 
                                color="success"
                                size="small"
                                sx={{ 
                                  borderRadius: 1, 
                                  textTransform: 'capitalize',
                                  minWidth: 80,
                                  justifyContent: 'center'
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </TabPanel>
                  
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Button 
                      variant="text" 
                      color="primary"
                      endIcon={<ArrowForwardIcon />}
                      sx={{ textTransform: 'none' }}
                    >
                      View All Records
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Right Sidebar Information */}
            <Grid item xs={12} md={4}>
              <Grid container spacing={3} direction="column">
                {/* Team Status */}
                <Grid item>
                  <Card 
                    sx={{ 
                      borderRadius: 3, 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      background: darkMode 
                        ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' 
                        : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
                    }}
                  >
                                    {/* Upcoming Holidays */}

                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2 }}>Upcoming Holidays</Typography>
                      
                      <List sx={{ p: 0 }}>
                        {upcomingHolidays.map((holiday) => (
                          <ListItem 
                            key={holiday.id} 
                            disablePadding 
                            secondaryAction={
                              <Chip 
                                label={`${holiday.days} days`} 
                                color="primary"
                                variant="outlined"
                                size="small"
                                sx={{ 
                                  borderRadius: 1,
                                  bgcolor: darkMode ? 'rgba(25, 118, 210, 0.1)' : 'rgba(25, 118, 210, 0.05)'
                                }}
                              />
                            }
                            sx={{ 
                              py: 1.5, 
                              borderBottom: '1px solid',
                              borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                              '&:last-child': { borderBottom: 'none' }
                            }}
                          >
                            <ListItemText
                              primary={holiday.name}
                              secondary={holiday.date}
                              primaryTypographyProps={{ fontWeight: 'medium' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                      
                      <Box sx={{ textAlign: 'center', mt: 1 }}>
                        <Button 
                          variant="text" 
                          color="primary"
                          size="small"
                          endIcon={<ArrowForwardIcon />}
                          sx={{ textTransform: 'none' }}
                        >
                          View All Holidays
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboardComponent;