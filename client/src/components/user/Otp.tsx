import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { verifyOtp } from "../../api/auth";

const OtpComponent: React.FC = () => {
  const OTPSIZE = 6;
  const [otp, setOtp] = useState<string[]>(new Array(OTPSIZE).fill(""));
  const [error, setError] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(OTPSIZE).fill(null));

  // Focus the first input when component mounts
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow numeric input
    if (value && !/^\d+$/.test(value)) {
      return;
    }

    // Update OTP array with the new value
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Only take the first character
    setOtp(newOtp);

    // Clear any previous error
    setError("");

    // Auto-focus to next input if current input is filled
    if (value && index < 3) {
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    // Handle backspace - move to previous input if current is empty
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        if (inputRefs.current[index - 1]) {
          inputRefs.current[index - 1]?.focus();
        }
      }
    }
    // Handle left arrow - move to previous input
    else if (e.key === "ArrowLeft" && index > 0) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
    // Handle right arrow - move to next input
    else if (e.key === "ArrowRight" && index < 3) {
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Check if pasted content is numeric and has appropriate length
    if (!/^\d+$/.test(pastedData)) {
      setError("Only numeric values are allowed");
      return;
    }

    const pastedOtp = pastedData.split("").slice(0, OTPSIZE);
    const newOtp = [...otp];

    pastedOtp.forEach((digit, index) => {
      if (index < OTPSIZE) {
        newOtp[index] = digit;
      }
    });

    setOtp(newOtp);

    // Focus the appropriate input after paste
    const focusIndex = Math.min(pastedOtp.length, OTPSIZE-1);
    if (inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex].focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (otp.some((digit) => !digit)) {
      setError("Please enter all 6 digits of the OTP");
      return;
    }
  
    const otpString = otp.join("");
    const email = localStorage.getItem("signupEmail"); // 🔑 Get email from localStorage
  
    if (!email) {
      setError("Email not found. Please sign up again.");
      return;
    }
  
    try {
      const response = await verifyOtp(email, otpString);
      console.log("OTP verified:", response);
  
      // Clear localStorage after success
      localStorage.removeItem("signupEmail");
  
      alert("OTP verified successfully!");
      // You can redirect the user to dashboard or login page here
      // navigate("/dashboard");
    } catch (error: any) {
      console.error("OTP verification failed:", error);
      setError("Invalid OTP or something went wrong");
    }
  };
  

  return (
    <Box
      sx={{
        height: "100vh", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
    <Container maxWidth="sm" sx={{ mt: 8 }
    }>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          OTP Verification
        </Typography>

        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          Enter the 4-digit code sent to your email;
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
            {otp.map((digit, index) => (
              <Grid component="section" key={index}>
                <TextField
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  variant="outlined"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: "center",
                      fontSize: "1.5rem",
                      padding: "12px",
                      width: "40px",
                      height: "40px",
                    },
                    "aria-label": `OTP digit ${index + 1}`,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: "8px",
                      },
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>

          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Verify
          </Button>
        </Box>
      </Paper>
    </Container>
    </Box>
  );
};

export default OtpComponent;
