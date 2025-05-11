import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Alert,
  Snackbar,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  Stack,
  Chip,
  GridLegacy as Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TodayIcon from "@mui/icons-material/Today";
import TimerIcon from "@mui/icons-material/Timer";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import Topbar from "./Dashboard/Topbar";
import Sidebar from "./Dashboard/Sidebar";

interface AttendanceRecord {
  id: number;
  date: string;
  clockInTime: string;
  clockOutTime: string | null;
  totalHours: number | null;
}

const AttendancePage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [attendanceHistory, setAttendanceHistory] = useState<
    AttendanceRecord[]
  >([]);

  // Mock data for demonstration
  const mockAttendanceHistory: AttendanceRecord[] = [
    {
      id: 1,
      date: "2025-05-10",
      clockInTime: "09:00:00",
      clockOutTime: "17:30:00",
      totalHours: 8.5,
    },
    {
      id: 2,
      date: "2025-05-09",
      clockInTime: "08:45:00",
      clockOutTime: "17:15:00",
      totalHours: 8.5,
    },
    {
      id: 3,
      date: "2025-05-08",
      clockInTime: "09:15:00",
      clockOutTime: "18:00:00",
      totalHours: 8.75,
    },
  ];

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Check if user is already clocked in (could be from localStorage or API)
    const storedClockInTime = localStorage.getItem("clockInTime");
    if (storedClockInTime) {
      setIsClockedIn(true);
      setClockInTime(new Date(storedClockInTime));
    }

    // Simulate API call to get attendance history
    setTimeout(() => {
      setAttendanceHistory(mockAttendanceHistory);
      setLoading(false);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleClockIn = () => {
    const now = new Date();
    setIsClockedIn(true);
    setClockInTime(now);
    localStorage.setItem("clockInTime", now.toString());
    setSnackbarMessage(`Successfully clocked in at ${formatTime(now)}`);
    setOpenSnackbar(true);

    // Here you would make an API call to log the clock-in time
    // Example: api.post('/attendance/clock-in', { time: now.toISOString() });
  };

  const handleClockOut = () => {
    const now = new Date();
    if (clockInTime) {
      const hoursWorked = (
        (now.getTime() - clockInTime.getTime()) /
        (1000 * 60 * 60)
      ).toFixed(2);

      // Update attendance history with the new record
      const newRecord: AttendanceRecord = {
        id: attendanceHistory.length + 1,
        date: formatDate(new Date()),
        clockInTime: formatTime(clockInTime),
        clockOutTime: formatTime(now),
        totalHours: parseFloat(hoursWorked),
      };

      setAttendanceHistory([newRecord, ...attendanceHistory]);
      setSnackbarMessage(
        `Successfully clocked out at ${formatTime(
          now
        )}. You worked ${hoursWorked} hours.`
      );
      setOpenSnackbar(true);

      // Reset clock-in state
      setIsClockedIn(false);
      setClockInTime(null);
      localStorage.removeItem("clockInTime");

      // Here you would make an API call to log the clock-out time
      // Example: api.post('/attendance/clock-out', { time: now.toISOString(), hoursWorked });
    }
  };

  const handleEditRecord = (id: number) => {
    // Implement edit functionality or open dialog
    console.log(`Edit record ${id}`);
    setSnackbarMessage(
      `Edit request for record #${id} has been sent for approval`
    );
    setOpenSnackbar(true);
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const calculateTimeSinceClockIn = (): string => {
    if (!clockInTime) return "00:00";

    const diffMs = currentTime.getTime() - clockInTime.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${diffHrs.toString().padStart(2, "0")}:${diffMins
      .toString()
      .padStart(2, "0")}`;
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
                Attendance Tracker
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Box>

            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<LoginIcon />}
                onClick={handleClockIn}
                disabled={isClockedIn}
                sx={{ borderRadius: 2, textTransform: "none", px: 3 }}
              >
                Clock In
              </Button>

              <Button
                variant="contained"
                color="secondary"
                startIcon={<LogoutIcon />}
                onClick={handleClockOut}
                disabled={!isClockedIn}
                sx={{ borderRadius: 2, textTransform: "none", px: 3 }}
              >
                Clock Out
              </Button>
            </Stack>
          </Box>

          {/* Status Cards */}
          <Grid container spacing={3} mb={3}>
            {/* Current Time Card */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                      Current Time
                    </Typography>
                  </Box>

                  <Typography
                    variant="h3"
                    sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
                  >
                    {currentTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </Typography>

                  {isClockedIn && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TimerIcon color="secondary" sx={{ mr: 1 }} />
                      <Typography variant="h6">
                        Working: {calculateTimeSinceClockIn()}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Today's Status Card */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <HourglassEmptyIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                      Today's Status
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        {clockInTime ? formatTime(clockInTime) : "-- : --"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Clock-in Time
                      </Typography>
                    </Box>

                    <Box sx={{ mx: 2, textAlign: "center" }}>
                      <Divider orientation="vertical" />
                    </Box>

                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        {isClockedIn
                          ? "-- : --"
                          : clockInTime
                          ? formatTime(new Date())
                          : "-- : --"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Clock-out Time
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Chip
                      label={isClockedIn ? "Active" : "Not Clocked In"}
                      color={isClockedIn ? "success" : "default"}
                      size="small"
                      sx={{ borderRadius: 1, textTransform: "capitalize" }}
                    />
                    {isClockedIn && clockInTime && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ ml: 1 }}
                      >
                        Working hours in progress
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Week Summary Card */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <TodayIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                      Weekly Summary
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: "center", mb: 2 }}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bold", color: "primary.main" }}
                    >
                      {attendanceHistory
                        .reduce(
                          (total, record) => total + (record.totalHours || 0),
                          0
                        )
                        .toFixed(1)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Hours This Week
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 2,
                      justifyContent: "center",
                    }}
                  >
                    <Box sx={{ textAlign: "center" }}>
                      <Chip
                        label={`${attendanceHistory.length} days`}
                        color="primary"
                        variant="outlined"
                        size="small"
                        sx={{
                          borderRadius: 1,
                          bgcolor: "rgba(25, 118, 210, 0.05)",
                        }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Main Content - Attendance History */}
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                  Attendance History
                </Typography>

                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </Box>

              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Clock-In Time</TableCell>
                        <TableCell>Clock-Out Time</TableCell>
                        <TableCell>Total Hours</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {attendanceHistory.map((record) => (
                        <TableRow
                          key={record.id}
                          hover
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{record.date}</TableCell>
                          <TableCell>{record.clockInTime}</TableCell>
                          <TableCell>{record.clockOutTime || "-"}</TableCell>
                          <TableCell>
                            {record.totalHours?.toFixed(2) || "-"}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={
                                record.clockOutTime
                                  ? "Completed"
                                  : "In Progress"
                              }
                              color={
                                record.clockOutTime ? "success" : "warning"
                              }
                              size="small"
                              sx={{
                                borderRadius: 1,
                                textTransform: "capitalize",
                                minWidth: 80,
                                justifyContent: "center",
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleEditRecord(record.id)}
                              aria-label="edit"
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Button
                  variant="text"
                  color="primary"
                  sx={{ textTransform: "none" }}
                >
                  View Full History
                </Button>
              </Box>
            </CardContent>
          </Card>

          {isClockedIn && clockInTime && (
            <Alert severity="info" sx={{ mt: 3, borderRadius: 2 }}>
              You clocked in at {formatTime(clockInTime)}. Don't forget to clock
              out before leaving!
            </Alert>
          )}

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AttendancePage;
