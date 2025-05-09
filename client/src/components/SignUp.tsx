import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface FormData {
  name: string;
  email: string;
  contactNo: string;
  sex: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  contactNo?: string;
  sex?: string;
  password?: string;
  confirmPassword?: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    contactNo: "",
    sex: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validate contact number
    const phoneRegex = /^\d{10}$/;
    if (!formData.contactNo.trim()) {
      newErrors.contactNo = "Contact number is required";
      isValid = false;
    } else if (!phoneRegex.test(formData.contactNo)) {
      newErrors.contactNo = "Please enter a valid 10-digit contact number";
      isValid = false;
    }

    // Validate sex
    if (!formData.sex) {
      newErrors.sex = "Please select an option";
      isValid = false;
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData({
      ...formData,
      sex: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Handle form submission here
      console.log("Form submitted:", formData);
      // You would typically make an API call here
      alert("Form submitted successfully!");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Create Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="contactNo"
            label="Contact Number"
            name="contactNo"
            autoComplete="tel"
            value={formData.contactNo}
            onChange={handleChange}
            error={!!errors.contactNo}
            helperText={errors.contactNo}
          />

          <FormControl fullWidth margin="normal" required error={!!errors.sex}>
            <InputLabel id="sex-label">Sex</InputLabel>
            <Select
              labelId="sex-label"
              id="sex"
              value={formData.sex}
              label="Sex"
              onChange={handleSelectChange}
            >
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
              <MenuItem value="O">Other</MenuItem>
            </Select>
            {errors.sex && <FormHelperText>{errors.sex}</FormHelperText>}
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUp;
