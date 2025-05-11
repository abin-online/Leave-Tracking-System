import React, { useState } from "react";
import {
  Box,
  Typography,
  GridLegacy as Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Divider,
  TextField,
  Tab,
  Tabs,
  Chip,
  Alert
} from "@mui/material";
import {
  Edit,
  Save,
  Person,
  Email,
  Phone,
  CalendarToday,
  Work,
  BadgeOutlined
} from "@mui/icons-material";
import Sidebar from "./Dashboard/Sidebar";
import Topbar from "./Dashboard/Topbar";

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

interface LeaveBalance {
  casual: number;
  sick: number;
  earned: number;
}

interface UserInfo {
  name: string;
  role: string;
  email: string;
  phone: string;
  department: string;
  employeeId: string;
  joinDate: string;
  reportingManager: string;
  leaveBalance: LeaveBalance;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

const ProfilePage: React.FC = () => {
  // User data state
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "Anu Sharma",
    role: "Senior Developer",
    email: "anu.sharma@example.com",
    phone: "+91 98765 43210",
    department: "Engineering",
    employeeId: "EMP-2023-0145",
    joinDate: "2023-02-10",
    reportingManager: "Priya Mehta",
    leaveBalance: {
      casual: 8,
      sick: 7,
      earned: 15
    }
  });

  // UI state
  const [tabValue, setTabValue] = useState<number>(0);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedInfo, setEditedInfo] = useState<UserInfo>({ ...userInfo });
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
    if (editMode) {
      // Save changes
      setUserInfo(editedInfo);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedInfo({
      ...editedInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Format date to display in a readable format
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        bgcolor: "#f5f7fa",
      }}
    >
      <Sidebar
        username={userInfo.name}
        userRole={userInfo.role}
        userAvatar="/api/placeholder/48/48"
      />

      <Box component="main" sx={{ flexGrow: 1, overflow: "auto" }}>
        <Topbar username={userInfo.name} userAvatar="/api/placeholder/48/48" />
        <Box sx={{ p: 3 }}>
          {showAlert && (
            <Alert 
              severity="success" 
              sx={{ mb: 3 }}
              onClose={() => setShowAlert(false)}
            >
              Profile updated successfully!
            </Alert>
          )}

          {/* Profile Header */}
          <Card 
            sx={{ 
              borderRadius: 2, 
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              mb: 3
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src="/api/placeholder/60/60"
                  sx={{
                    width: 60,
                    height: 60,
                    mr: 2
                  }}
                />
                
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {userInfo.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {userInfo.role} • {userInfo.department}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID: {userInfo.employeeId}
                  </Typography>
                </Box>
              </Box>
              
              <Button
                variant={editMode ? "contained" : "outlined"}
                color={editMode ? "success" : "primary"}
                startIcon={editMode ? <Save /> : <Edit />}
                onClick={handleEditToggle}
                size="small"
              >
                {editMode ? "Save" : "Edit"}
              </Button>
            </CardContent>
          </Card>

          {/* Tabs Section */}
          <Card sx={{ borderRadius: 2, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Tab icon={<Person />} label="Personal Info" iconPosition="start" />
              <Tab icon={<Work />} label="Leave Balance" iconPosition="start" />
            </Tabs>
            
            <CardContent>
              {/* Personal Info Tab */}
              <TabPanel value={tabValue} index={0}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                          Contact Information
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            {editMode ? (
                              <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={editedInfo.email}
                                onChange={handleInfoChange}
                                variant="outlined"
                                size="small"
                              />
                            ) : (
                              <Box sx={{ display: "flex", mb: 2 }}>
                                <Email color="action" sx={{ mr: 2 }} />
                                <Box>
                                  <Typography variant="body2" color="text.secondary">Email</Typography>
                                  <Typography variant="body1">{userInfo.email}</Typography>
                                </Box>
                              </Box>
                            )}
                          </Grid>
                          
                          <Grid item xs={12}>
                            {editMode ? (
                              <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={editedInfo.phone}
                                onChange={handleInfoChange}
                                variant="outlined"
                                size="small"
                              />
                            ) : (
                              <Box sx={{ display: "flex", mb: 2 }}>
                                <Phone color="action" sx={{ mr: 2 }} />
                                <Box>
                                  <Typography variant="body2" color="text.secondary">Phone</Typography>
                                  <Typography variant="body1">{userInfo.phone}</Typography>
                                </Box>
                              </Box>
                            )}
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                          Work Information
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Box sx={{ display: "flex", mb: 2 }}>
                              <Work color="action" sx={{ mr: 2 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Department</Typography>
                                <Typography variant="body1">{userInfo.department}</Typography>
                              </Box>
                            </Box>
                          </Grid>
                          
                          <Grid item xs={12}>
                            <Box sx={{ display: "flex", mb: 2 }}>
                              <Person color="action" sx={{ mr: 2 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Reporting Manager</Typography>
                                <Typography variant="body1">{userInfo.reportingManager}</Typography>
                              </Box>
                            </Box>
                          </Grid>
                          
                          <Grid item xs={12}>
                            <Box sx={{ display: "flex", mb: 2 }}>
                              <CalendarToday color="action" sx={{ mr: 2 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Join Date</Typography>
                                <Typography variant="body1">{formatDate(userInfo.joinDate)}</Typography>
                              </Box>
                            </Box>
                          </Grid>
                          
                          <Grid item xs={12}>
                            <Box sx={{ display: "flex", mb: 2 }}>
                              <BadgeOutlined color="action" sx={{ mr: 2 }} />
                              <Box>
                                <Typography variant="body2" color="text.secondary">Employee ID</Typography>
                                <Typography variant="body1">{userInfo.employeeId}</Typography>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
              
              {/* Leave Balance Tab */}
              <TabPanel value={tabValue} index={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: 2, bgcolor: "#e3f2fd", height: "100%" }}>
                      <CardContent sx={{ textAlign: "center", py: 3 }}>
                        <Typography variant="h6" color="primary">Casual Leave</Typography>
                        <Typography variant="h3" sx={{ my: 2, fontWeight: "bold" }}>
                          {userInfo.leaveBalance.casual}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Days Available</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: 2, bgcolor: "#e8f5e9", height: "100%" }}>
                      <CardContent sx={{ textAlign: "center", py: 3 }}>
                        <Typography variant="h6" color="success.main">Sick Leave</Typography>
                        <Typography variant="h3" sx={{ my: 2, fontWeight: "bold" }}>
                          {userInfo.leaveBalance.sick}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Days Available</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: 2, bgcolor: "#fff8e1", height: "100%" }}>
                      <CardContent sx={{ textAlign: "center", py: 3 }}>
                        <Typography variant="h6" color="warning.main">Earned Leave</Typography>
                        <Typography variant="h3" sx={{ my: 2, fontWeight: "bold" }}>
                          {userInfo.leaveBalance.earned}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Days Available</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Card variant="outlined" sx={{ borderRadius: 2, mt: 1 }}>
                      <CardContent>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                          Recent Leave Applications
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        
                        <Box sx={{ textAlign: "center", py: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            You have no recent leave applications.
                          </Typography>
                          <Button 
                            variant="contained" 
                            size="small" 
                            sx={{ mt: 2 }}
                          >
                            Apply for Leave
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;