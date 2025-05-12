import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/user/userSlice";

interface LoginData {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

interface LoginPageProps {
  role: "admin" | "manager" | "employee";
  handleLogin: (data: {
    email: string;
    password: string;
    role: "admin" | "manager" | "employee";
  }) => Promise<any>;
}

const LoginPage: React.FC<LoginPageProps> = ({ role, handleLogin }) => {
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const validateLogin = (): boolean => {
    const newErrors: LoginErrors = {};
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!loginData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(loginData.email)) {
      newErrors.email = "Enter a valid email";
      isValid = false;
    }

    if (!loginData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateLogin()) {
      try {
        console.log("Logging in with:", loginData);
        const response = await handleLogin({
          email: loginData.email,
          password: loginData.password,
          role: role,
        });
        console.log("Login success", response);

        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("role", response.role);
        localStorage.setItem("email", response.email);
        localStorage.setItem("name", response.user.name);
        localStorage.setItem("userId", response.user?._id)
        dispatch(
          setUser({
            name: response.user.name,
            email: response.user.email,
            role: response.user.role,
          })
        );

        if (role == "employee") {
          navigate("/");
        } else if (role == "admin") {
          navigate("/admin");
        } else if (role == "manager") {
          navigate("/manager");
        } else {
          console.log("Error occured in routing");
        }

        // You can show success toast, redirect, etc.
      } catch (err) {
        // Show error toast or message here
        console.error("Login failed", err);
      }
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
      <Container maxWidth="xs">
        <Paper elevation={5} sx={{ p: 4 }}>
          <Typography variant="h5" align="center">
            {role.toUpperCase()} LOG IN
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 2 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={loginData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={loginData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          </Box>
          <Box>
            {["employee", "manager"].includes(role) && (
              <Box mt={2} textAlign="center">
                <Typography variant="body2">
                  New here?{" "}
                  <MuiLink
                    component={RouterLink}
                    to={
                      role === "employee" ? "/user-signup" : "/manager-signup"
                    }
                    underline="hover"
                  >
                    Sign up
                  </MuiLink>
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
