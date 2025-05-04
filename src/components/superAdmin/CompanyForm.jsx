import { Business, Email, Person, Phone, Visibility, VisibilityOff, LocationCity, HomeSharp, OtherHouses, PinSharp, ArrowCircleLeft, Password } from '@mui/icons-material';
import { Box, Button, Card, Divider, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateForm } from './validate';
import {  useAddAdminMutation, useGetCompaniesQuery } from '../../app/adminApi';

const CompanyForm = () => {
  const { data: admins = [] } = useGetCompaniesQuery();
  const [addAdmin] = useAddAdminMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    companyName: 'infinia',
    companyEmail: 'infinia@gmail.com',
    companyPhone: '4534342345',
    companyGstNo: '27AAAPA1234A1Z5',
    companyAddressStreet: 'trident lane',
    companyAddressCity: 'bbsr',
    companyAddressState: 'odisha',
    companyAddressZipCode: '343534',
    fullName: 'abhishek',
    phone: '3434353345',
    email: 'abhi@gmail.com',
    password: 'Abhi@1234',
    panCardNumber: 'AFZPK7190K',
    presentAddressStreet: 'abc',
    presentAddressCity: 'bbsr',
    presentAddressState: 'odisha',
    presentAddressZipCode: '343534',
    permanentAddressStreet: 'kani',
    permanentAddressCity: 'bbsr',
    permanentAddressState: 'odisha',
    permanentAddressZipCode: '456547'
  });

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleBackButton = () => {
    navigate('/super-admin');
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      console.log(errors);
      setFormErrors(errors);
      return;
    }
    console.log('Form Data:', formData);

    // Check for duplicates
    // const existingAdmins = admins || [];
    // const isDuplicate = existingAdmins.some((admin) =>
    //   admin.companyName === formData.companyName ||
    //   admin.companyEmail === formData.companyEmail ||
    //   admin.companyPhone === formData.companyPhone ||
    //   admin.admin.email === formData.email ||
    //   admin.admin.phone === formData.phone ||
    //   admin.admin.panCardNumber === formData.panCardNumber
    // );

    // if (isDuplicate) {
    //   alert('Company Name, Email, Phone, or PanCard Number already exists! Cannot create admin.');
    //   return;
    // }

    // const payload = {
    //   companyName: formData.companyName,
    //   companyEmail: formData.companyEmail,
    //   companyPhone: formData.companyPhone,
    //   companyGstNo: formData.companyGstNo,
    //   companyAddress: {
    //     street: formData.companyAddressStreet,
    //     city: formData.companyAddressCity,
    //     state: formData.companyAddressState,
    //     zipCode: formData.companyAddressZipCode,
    //   },
    //   admin: {
    //     fullName: formData.fullName,
    //     email: formData.email,
    //     phone: formData.phone,
    //     password: formData.password,
    //     panCardNumber: formData.panCardNumber,
    //     presentAddress: {
    //       street: formData.presentAddressStreet,
    //       city: formData.presentAddressCity,
    //       state: formData.presentAddressState,
    //       zipCode: formData.presentAddressZipCode,
    //     },
    //     permanentAddress: {
    //       street: formData.permanentAddressStreet,
    //       city: formData.permanentAddressCity,
    //       state: formData.permanentAddressState,
    //       zipCode: formData.permanentAddressZipCode,
    //     }
    //   }
    // };

    const payload = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phone,
      panNumber: formData.panCardNumber,
      presentAddress: {
        street: formData.presentAddressStreet,
        city: formData.presentAddressCity,
        state: formData.permanentAddressState,
        zipCode: formData.presentAddressZipCode
      },
      permanentAddress: {
        street: formData.permanentAddressStreet,
        city: formData.permanentAddressCity,
        state: formData.permanentAddressState,
        zipCode: formData.permanentAddressZipCode
      },
      companyName: formData.companyName,
      companyEmail: formData.companyEmail,
      companyPhoneNo: formData.companyPhone,
      gstNumber: formData.companyGstNo,
      companyAddress: {
        street: formData.companyAddressStreet,
        city: formData.companyAddressCity,
        state: formData.companyAddressState,
        zipCode: formData.companyAddressZipCode,
      }
    }

    try {
      const response = await addAdmin(payload).unwrap();
      console.log('Admin created successfully:', response);
      alert('Admin created successfully!');
      // Reset form or navigate
      navigate('/super-admin');
    } catch (error) {
      console.error('Error creating admin:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <>
      <Button variant="contained" startIcon={<ArrowCircleLeft />} onClick={handleBackButton}>Back</Button>
      <Box p={3} sx={{ maxWidth: 900, margin: '0 auto' }}>
        <Card elevation={2} sx={{ mb: 3, p: 2, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">Add Company</Typography>
          <Typography variant="body2" color="text.secondary">Add company and administrator details</Typography>
        </Card>

        <Paper component="form" sx={{ width: '100%', p: 3 }} onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>

            {/* Company details */}
            <Typography component="h4" variant="h6">Company Details</Typography>
            <Divider />

            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              error={!!formErrors.companyName}
              helperText={formErrors.companyName}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Business />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="Company Email"
              name="companyEmail"
              type="email"
              value={formData.companyEmail}
              onChange={handleChange}
              required
              error={!!formErrors.companyEmail}
              helperText={formErrors.companyEmail}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Email />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="Company Phone no"
              name="companyPhone"
              type="number"
              value={formData.companyPhone}
              onChange={handleChange}
              required
              error={!!formErrors.companyPhone}
              helperText={formErrors.companyPhone}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Phone />
                    </InputAdornment>
                  ),
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                },
              }}
            />

            <TextField
              fullWidth
              label="Company GST number"
              name="companyGstNo"
              value={formData.companyGstNo}
              onChange={handleChange}
              required
              error={!!formErrors.companyGstNo}
              helperText={formErrors.companyGstNo}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Business />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Company Address */}
            <Typography component="h4" variant="h6">Company Address</Typography>
            <Divider />

            <TextField
              fullWidth
              label="Address line 1"
              placeholder='Building no, street name'
              name="companyAddressStreet"
              value={formData.companyAddressStreet}
              onChange={handleChange}
              required
              error={!!formErrors.companyAddressStreet}
              helperText={formErrors.companyAddressStreet}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <HomeSharp />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="City"
              name="companyAddressCity"
              value={formData.companyAddressCity}
              onChange={handleChange}
              required
              error={!!formErrors.companyAddressCity}
              helperText={formErrors.companyAddressCity}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <LocationCity />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="State"
              name="companyAddressState"
              value={formData.companyAddressState}
              onChange={handleChange}
              required
              error={!!formErrors.companyAddressState}
              helperText={formErrors.companyAddressState}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <OtherHouses />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="Zip Code"
              name="companyAddressZipCode"
              type="number"
              value={formData.companyAddressZipCode}
              onChange={handleChange}
              required
              error={!!formErrors.companyAddressZipCode}
              helperText={formErrors.companyAddressZipCode}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <PinSharp />
                    </InputAdornment>
                  ),
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                },
              }}
            />

            {/* Admin details */}
            <Typography component="h4" variant="h6">Administrator Details</Typography>
            <Divider />

            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              error={!!formErrors.fullName}
              helperText={formErrors.fullName}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Person />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Stack direction="row" gap={2}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                error={!!formErrors.email}
                helperText={formErrors.email}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                fullWidth
                label="Phone"
                name="phone"
                type="number"
                value={formData.phone}
                onChange={handleChange}
                required
                error={!!formErrors.phone}
                helperText={formErrors.phone}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <Phone />
                      </InputAdornment>
                    ),
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  },
                }}
              />
            </Stack>

            <Stack direction="row" gap={2}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                error={!!formErrors.password}
                helperText={formErrors.password}
                slotProps={{
                  input: {
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
                  },
                }}
              />

              <TextField
                fullWidth
                label="PAN Card Number"
                name="panCardNumber"
                value={formData.panCardNumber}
                onChange={handleChange}
                required
                error={!!formErrors.panCardNumber}
                helperText={formErrors.panCardNumber}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <Business />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Stack>

            {/* Present Address */}
            <Typography component="h4" variant="h6">Present Address</Typography>
            <Divider />

            <TextField
              fullWidth
              label="Street"
              name="presentAddressStreet"
              value={formData.presentAddressStreet}
              onChange={handleChange}
              required
              error={!!formErrors.presentAddressStreet}
              helperText={formErrors.presentAddressStreet}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <HomeSharp />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="City"
              name="presentAddressCity"
              value={formData.presentAddressCity}
              onChange={handleChange}
              required
              error={!!formErrors.presentAddressCity}
              helperText={formErrors.presentAddressCity}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <LocationCity />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="State"
              name="presentAddressState"
              value={formData.presentAddressState}
              onChange={handleChange}
              required
              error={!!formErrors.presentAddressState}
              helperText={formErrors.presentAddressState}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <OtherHouses />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="Zip Code"
              name="presentAddressZipCode"
              type="number"
              value={formData.presentAddressZipCode}
              onChange={handleChange}
              required
              error={!!formErrors.presentAddressZipCode}
              helperText={formErrors.presentAddressZipCode}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <PinSharp />
                    </InputAdornment>
                  ),
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                },
              }}
            />

            {/* Permanent Address */}
            <Typography component="h4" variant="h6">Permanent Address</Typography>
            <Divider />

            <TextField
              fullWidth
              label="Street"
              name="permanentAddressStreet"
              value={formData.permanentAddressStreet}
              onChange={handleChange}
              required
              error={!!formErrors.permanentAddressStreet}
              helperText={formErrors.permanentAddressStreet}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <HomeSharp />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="City"
              name="permanentAddressCity"
              value={formData.permanentAddressCity}
              onChange={handleChange}
              required
              error={!!formErrors.permanentAddressCity}
              helperText={formErrors.permanentAddressCity}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <LocationCity />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="State"
              name="permanentAddressState"
              value={formData.permanentAddressState}
              onChange={handleChange}
              required
              error={!!formErrors.permanentAddressState}
              helperText={formErrors.permanentAddressState}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <OtherHouses />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="Zip Code"
              name="permanentAddressZipCode"
              type="number"
              value={formData.permanentAddressZipCode}
              onChange={handleChange}
              required
              error={!!formErrors.permanentAddressZipCode}
              helperText={formErrors.permanentAddressZipCode}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <PinSharp />
                    </InputAdornment>
                  ),
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                },
              }}
            />

            {/* Buttons */}
            <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
              <Button variant="contained" onClick={handleBackButton}>Back</Button>
              <Button variant="contained" type="submit">Submit</Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default CompanyForm;