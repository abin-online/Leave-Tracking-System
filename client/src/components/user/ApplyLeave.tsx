import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  GridLegacy as Grid,
  Paper,
  Card,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  Alert,
} from "@mui/material";
import { CalendarToday, Info, Send } from "@mui/icons-material";
import Sidebar from "./Dashboard/Sidebar";
import Topbar from "./Dashboard/Topbar";

interface LeaveFormData {
  leaveType: string;
  fromDate: string;
  toDate: string;
  reason: string;
}

const leaveTypes = ["Casual Leave", "Sick Leave", "Personal Leave", "Work From Home"];

const ApplyLeave: React.FC = () => {
  const [formData, setFormData] = useState<LeaveFormData>({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });
  
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Leave Request Submitted:", formData);
    // TODO: Connect to backend API
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        leaveType: "",
        fromDate: "",
        toDate: "",
        reason: "",
      });
    }, 3000);
  };

  // Calculate number of days
  const calculateDays = (): number => {
    if (!formData.fromDate || !formData.toDate) return 0;
    
    const start = new Date(formData.fromDate);
    const end = new Date(formData.toDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    return diffDays;
  };

  const leaveBalance = {
    "Casual Leave": 10,
    "Sick Leave": 12,
    "Personal Leave": 5,
    "Work From Home": 8
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        bgcolor: "#f5f7fa",
        color: "inherit",
      }}
    >
      <Sidebar
        username="Anu Sharma"
        userRole="Senior Developer"
        userAvatar="/api/placeholder/48/48"
      />

      <Box component="main" sx={{ flexGrow: 1, overflow: "auto" }}>
        <Topbar username="Anu Sharma" userAvatar="/api/placeholder/48/48" />
        <Box sx={{ p: 3 }}>
          {/* Welcome & Action Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 0.5 }}>
                Leave Apply
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Submit your leave request for approval
              </Typography>
            </Box>
          </Box>

          {submitted && (
            <Alert 
              severity="success" 
              sx={{ mb: 3 }}
              onClose={() => setSubmitted(false)}
            >
              Your leave request has been submitted successfully!
            </Alert>
          )}

          {/* Main Content */}
          <Grid container spacing={3}>
            {/* Leave Application Form */}
            <Grid item xs={12} md={8}>
              <Card sx={{ borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                    <CalendarToday sx={{ mr: 1, fontSize: 20 }} />
                    Apply for Leave
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          select
                          fullWidth
                          label="Leave Type"
                          name="leaveType"
                          value={formData.leaveType}
                          onChange={handleChange}
                          required
                          variant="outlined"
                        >
                          {leaveTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                              {type}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="body2" color="text.secondary">
                            {formData.leaveType && (
                              <>Balance: <strong>{leaveBalance[formData.leaveType as keyof typeof leaveBalance]} days</strong></>
                            )}
                          </Typography>
                          <Tooltip title="Your current leave balance">
                            <IconButton size="small" sx={{ ml: 1 }}>
                              <Info fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type="date"
                          label="From Date"
                          name="fromDate"
                          value={formData.fromDate}
                          onChange={handleChange}
                          InputLabelProps={{ shrink: true }}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type="date"
                          label="To Date"
                          name="toDate"
                          value={formData.toDate}
                          onChange={handleChange}
                          InputLabelProps={{ shrink: true }}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      
                      {formData.fromDate && formData.toDate && (
                        <Grid item xs={12}>
                          <Paper 
                            sx={{ 
                              p: 2, 
                              bgcolor: "primary.light", 
                              color: "primary.contrastText",
                              borderRadius: 1
                            }}
                          >
                            <Typography variant="body2">
                              Duration: <strong>{calculateDays()} day(s)</strong>
                            </Typography>
                          </Paper>
                        </Grid>
                      )}
                      
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Reason for Leave"
                          name="reason"
                          value={formData.reason}
                          onChange={handleChange}
                          multiline
                          rows={4}
                          required
                          variant="outlined"
                          placeholder="Please provide details about your leave request"
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                          <Button 
                            variant="contained" 
                            color="primary" 
                            type="submit"
                            startIcon={<Send />}
                            sx={{ px: 4, py: 1.2, borderRadius: 2 }}
                          >
                            Submit Request
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Leave Summary */}
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Leave Balances
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  {Object.entries(leaveBalance).map(([type, balance]) => (
                    <Box 
                      key={type} 
                      sx={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center",
                        mb: 2,
                        pb: 1,
                        borderBottom: "1px dashed #e0e0e0"
                      }}
                    >
                      <Typography variant="body1">{type}</Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontWeight: "bold",
                          color: balance > 5 ? "success.main" : balance > 2 ? "warning.main" : "error.main"
                        }}
                      >
                        {balance} days
                      </Typography>
                    </Box>
                  ))}
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                    Note: Leave requests are subject to manager approval. Please submit your requests at least 3 days in advance.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ApplyLeave;