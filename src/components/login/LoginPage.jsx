import { Email, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Card, Container, IconButton, InputAdornment, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { validateLogin } from './validateLogin';
import axios from 'axios';
import { useLoginSuperAdminMutation } from '../../app/adminApi';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loginSuperAdmin] = useLoginSuperAdminMutation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [formData, setFormData] = useState({
        email: 'superadmin@watsoo.com',
        password: 'Watsoo@123'
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleTogglePassword = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateLogin(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        console.log("Form Data:", formData);


        // try {
        //     const response = await axios.post('http://192.168.12.51:9000/login', {
        //         email: formData.email,
        //         password: formData.password
        //     });

        //     // Log the full response to check its structure
        //     console.log('Full response:', response);


        //     if (response.data && response.data.data && response.data.data.token) {
        //         localStorage.setItem('token', response.data.data.token);
        //         console.log('Token saved to localStorage:', response.data.data.token);
        //     } else {
        //         console.log('Token not found in response:', response);
        //     }

        // } catch (error) {
        //     console.error('Error during login:', error);
        // }

        try {
            const response = await loginSuperAdmin(formData).unwrap(); // formData has email & password
            console.log("Full response:", response);
            // if(response.responseCode){
            //     console.log("response code :",typeof(response.responseCode));
            // }

            if (response.responseCode == 200) {
                if (response.data && response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    console.log('Token saved to localStorage:', response.data.token);
                    if(response.data.roleType === "SUPER_ADMIN"){
                        console.log('Navigating to super-admin...');
                        navigate('/super-admin')
                    }
                } else {
                    console.log('Token not found in response:', response);
                }
            }

        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please try again.");
        }


    };

    return (
        <Container maxWidth="sm">
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                py: 2
            }}>
                <Card elevation={3} sx={{
                    width: '100%',
                    p: isMobile ? 3 : 4,
                    borderRadius: 2
                }}>
                    <Box component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3
                        }}>
                        <Box textAlign="center" mb={2}>
                            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                                Welcome Back
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Sign in to access your account
                            </Typography>
                        </Box>

                        {/* Email Field */}
                        <TextField
                            fullWidth
                            label="Email Address"
                            variant="outlined"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email} // Show error if exists
                            helperText={errors.email} // Display error message
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Email />
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />

                        {/* Password Field */}
                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password} // Show error if exists
                            helperText={errors.password} // Display error message
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleTogglePassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{
                                py: 1.5,
                                mt: 1,
                                fontWeight: 'bold',
                                borderRadius: 2,
                                textTransform: 'none',
                                fontSize: '1rem'
                            }}

                        >
                            Login
                        </Button>
                    </Box>
                </Card>
            </Box>
        </Container>
    );
}

export default LoginPage;
