import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Card,
  CardContent,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  GridLegacy as Grid,
  Tooltip,
  MenuItem,
  TableContainer,
  TablePagination,
  Badge
} from "@mui/material";
import {
  CalendarToday,
  Search,
  FilterList,
  AccessTime,
  MoreVert,
  Refresh,
  Check,
  Close,
  Info
} from "@mui/icons-material";
import Sidebar from "./Dashboard/Sidebar";
import Topbar from "./Dashboard/Topbar";

type LeaveStatus = "Approved" | "Pending" | "Rejected";

interface LeaveEntry {
  id: number;
  leaveType: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: LeaveStatus;
  appliedOn: string;
  approvedBy?: string;
  days: number;
}

const dummyLeaveHistory: LeaveEntry[] = [
  {
    id: 1,
    leaveType: "Casual Leave",
    fromDate: "2025-05-01",
    toDate: "2025-05-03",
    reason: "Family trip to Himachal",
    status: "Approved",
    appliedOn: "2025-04-20",
    approvedBy: "Rajesh Kumar",
    days: 3
  },
  {
    id: 2,
    leaveType: "Sick Leave",
    fromDate: "2025-04-25",
    toDate: "2025-04-26",
    reason: "Fever and cough",
    status: "Pending",
    appliedOn: "2025-04-24",
    days: 2
  },
  {
    id: 3,
    leaveType: "Personal Leave",
    fromDate: "2025-03-18",
    toDate: "2025-03-19",
    reason: "Friend's wedding ceremony",
    status: "Rejected",
    appliedOn: "2025-03-10",
    approvedBy: "Rajesh Kumar",
    days: 2
  },
  {
    id: 4,
    leaveType: "Work From Home",
    fromDate: "2025-04-10",
    toDate: "2025-04-10",
    reason: "Internet installation at home",
    status: "Approved",
    appliedOn: "2025-04-08",
    approvedBy: "Rajesh Kumar",
    days: 1
  },
  {
    id: 5,
    leaveType: "Casual Leave",
    fromDate: "2025-02-14",
    toDate: "2025-02-14",
    reason: "Personal appointment",
    status: "Approved",
    appliedOn: "2025-02-10",
    approvedBy: "Rajesh Kumar",
    days: 1
  },
  {
    id: 6,
    leaveType: "Sick Leave",
    fromDate: "2025-01-05",
    toDate: "2025-01-07",
    reason: "Hospitalization due to food poisoning",
    status: "Approved",
    appliedOn: "2025-01-05",
    approvedBy: "Rajesh Kumar",
    days: 3
  },
  {
    id: 7,
    leaveType: "Personal Leave",
    fromDate: "2025-04-30",
    toDate: "2025-05-02",
    reason: "Sister's marriage ceremony",
    status: "Pending",
    appliedOn: "2025-04-15",
    days: 3
  }
];

const statusColor = {
  Approved: "success",
  Pending: "warning",
  Rejected: "error",
} as const;

const statusIcon = {
  Approved: <Check fontSize="small" />,
  Pending: <AccessTime fontSize="small" />,
  Rejected: <Close fontSize="small" />,
};

const LeaveHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };
  
  const handleStatusFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusFilter(event.target.value);
    setPage(0);
  };
  
  const filteredLeaves = dummyLeaveHistory.filter(leave => {
    const matchesSearch = 
      leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.fromDate.includes(searchTerm) ||
      leave.toDate.includes(searchTerm);
      
    const matchesStatus = statusFilter === "All" || leave.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };
  
  const getLeaveStatusCounts = () => {
    const counts = {
      Approved: 0,
      Pending: 0,
      Rejected: 0,
      Total: dummyLeaveHistory.length
    };
    
    dummyLeaveHistory.forEach(leave => {
      counts[leave.status]++;
    });
    
    return counts;
  };
  
  const statusCounts = getLeaveStatusCounts();

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
          {/* Header Section */}
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
                Leave History
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Track and manage all your leave applications
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<CalendarToday />}
              href="/apply-leave"
              sx={{ borderRadius: 2, px: 3 }}
            >
              Apply Leave
            </Button>
          </Box>

          {/* Statistics Cards */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Leaves
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold", my: 1 }}>
                    {statusCounts.Total}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    All time record
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="success.main">
                    Approved
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold", my: 1, color: "success.main" }}>
                    {statusCounts.Approved}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Successful applications
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="warning.main">
                    Pending
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold", my: 1, color: "warning.main" }}>
                    {statusCounts.Pending}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Awaiting approval
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="error.main">
                    Rejected
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold", my: 1, color: "error.main" }}>
                    {statusCounts.Rejected}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Declined requests
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Filters and Search */}
          <Card sx={{ borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", mb: 3 }}>
            <CardContent sx={{ p: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    placeholder="Search leave records..."
                    size="small"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FilterList fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  >
                    <MenuItem value="All">All Status</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </TextField>
                </Grid>
                
                <Grid item xs={12} md={5} sx={{ textAlign: "right" }}>
                  <Button
                    startIcon={<Refresh />}
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("All");
                    }}
                    sx={{ borderRadius: 2 }}
                  >
                    Reset Filters
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Leave History Table */}
          <Card sx={{ borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
            <CardContent sx={{ p: 0 }}>
              <Typography variant="h6" sx={{ p: 2, display: "flex", alignItems: "center" }}>
                <CalendarToday sx={{ mr: 1, fontSize: 20 }} />
                Leave Records
              </Typography>
              <Divider />
              
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Leave Type</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Duration</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Days</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Reason</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Applied On</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredLeaves
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((leave) => (
                        <TableRow key={leave.id} hover>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                              {leave.leaveType}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Tooltip title={`From ${formatDate(leave.fromDate)} to ${formatDate(leave.toDate)}`}>
                              <Box>
                                <Typography variant="body2">
                                  {formatDate(leave.fromDate)}
                                </Typography>
                                {leave.fromDate !== leave.toDate && (
                                  <Typography variant="body2" color="text.secondary">
                                    to {formatDate(leave.toDate)}
                                  </Typography>
                                )}
                              </Box>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={`${leave.days} day${leave.days > 1 ? "s" : ""}`} 
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Tooltip title={leave.reason}>
                              <Typography variant="body2" sx={{ 
                                maxWidth: 180,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap"
                              }}>
                                {leave.reason}
                              </Typography>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{formatDate(leave.appliedOn)}</Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={statusIcon[leave.status]}
                              label={leave.status}
                              color={statusColor[leave.status]}
                              size="small"
                              sx={{ fontWeight: "medium" }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    {filteredLeaves.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                          <Info sx={{ fontSize: 40, color: "text.secondary", opacity: 0.5, mb: 1 }} />
                          <Typography variant="body1" color="text.secondary">
                            No leave records found
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Try adjusting your search or filter criteria
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredLeaves.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default LeaveHistory;