import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import Topbar from "./Dashboard/Topbar";
import Sidebar from "./Dashboard/Sidebar";
import { clockIn, clockOut, fetchAttendance } from "../../api/attendance";
import { format } from "date-fns";

interface AttendanceRecord {
  date: string;
  clockIn: string;
  clockOut: string;
}

const AttendancePage: React.FC = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>([]);

  const getUserInfo = (): { name: string; role: string; userId: string } => {
    const name = localStorage.getItem("name") ?? "User";
    const role = localStorage.getItem("role") ?? "employee";
    const userId = localStorage.getItem("userId") ?? "abin";
    return { name, role, userId };
  };

  const handleClockIn = async () => {
    const currentTime = new Date();
    const restrictedTime = new Date(currentTime);
    restrictedTime.setHours(8, 30, 0, 0); 
  

    if (currentTime > restrictedTime) {
      alert("You cannot clock in after 8:30 AM.");
      return; 
    }
  
    const { userId } = getUserInfo();
    const response = await clockIn(userId);
    setIsClockedIn(true);
    setClockInTime(response?.checkInTime);
  };
  

  const handleClockOut = async () => {
    const { userId } = getUserInfo();
    const response = await clockOut(userId);
    const now = response.checkOutTime;
    const date = response.date;

    const newRecord: AttendanceRecord = {
      date: format(new Date(date), "dd/MM/yyyy"),
      clockIn: clockInTime || "-",
      clockOut: new Date(now).toLocaleTimeString(),
    };

    setAttendanceList([newRecord, ...attendanceList]);
    setIsClockedIn(false);
    setClockInTime(null);
  };

  useEffect(() => {
    const loadAttendance = async () => {
      const { userId } = getUserInfo();

      const to = new Date();
      const from = new Date();
      from.setDate(to.getDate() - 4); // last 5 days including today

      const fromStr = format(from, "yyyy-MM-dd");
      const toStr = format(to, "yyyy-MM-dd");

      try {
        const records = await fetchAttendance(userId, fromStr, toStr);

        const formatted: AttendanceRecord[] = records.map((r: any) => ({
          date: format(new Date(r.date), "dd/MM/yyyy"),
          clockIn: r.checkInTime ? new Date(r.checkInTime).toLocaleTimeString() : "-",
          clockOut: r.checkOutTime ? new Date(r.checkOutTime).toLocaleTimeString() : "-",
        }));

        setAttendanceList(formatted.reverse()); // newest at top
      } catch (err) {
        console.error("Failed to fetch attendance", err);
      }
    };

    loadAttendance();
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar
        username={getUserInfo().name}
        userRole={getUserInfo().role}
        userAvatar="/api/placeholder/48/48"
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: "auto" }}>
        <Topbar username="Anu Sharma" userAvatar="/api/placeholder/48/48" />

        <Typography variant="h4" gutterBottom>
          Attendance Tracker
        </Typography>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Current Status:{" "}
              <strong style={{ color: isClockedIn ? "green" : "red" }}>
                {isClockedIn ? "Clocked In" : "Clocked Out"}
              </strong>
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="success"
                onClick={handleClockIn}
                disabled={isClockedIn}
              >
                Clock In
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleClockOut}
                disabled={!isClockedIn}
              >
                Clock Out
              </Button>
            </Stack>
            {clockInTime && (
              <Typography variant="body1" sx={{ mt: 2 }}>
                Clocked In At: {new Date(clockInTime).toLocaleTimeString()}
              </Typography>
            )}
          </CardContent>
        </Card>

        <Typography variant="h6" gutterBottom>
          Recent Attendance
        </Typography>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Clock In</TableCell>
                <TableCell>Clock Out</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No records yet 💤
                  </TableCell>
                </TableRow>
              ) : (
                attendanceList.map((record, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.clockIn}</TableCell>
                    <TableCell>{record.clockOut}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
};

export default AttendancePage;
