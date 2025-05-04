import { useState, useEffect } from 'react';
import { Box, Button, Card, IconButton, Paper, TextField, Typography, InputAdornment, Stack, Divider } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCompanyQuery, useUpdateAdminMutation } from '../../app/adminApi';
import { Visibility, VisibilityOff, ArrowCircleLeft, Email, Person, Phone, Business, HomeSharp, LocationCity, OtherHouses, PinSharp } from '@mui/icons-material';
import { validateForm } from './validate';

const AdminDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: companyData, isLoading, isError } = useGetCompanyQuery(id);
  // console.log(companyData);
  const [updateAdmin, { isLoading: isUpdating }] = useUpdateAdminMutation();

  const [adminData, setAdminData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (companyData && companyData.data) {
      const company = companyData.data;
      const admin = company.admin;
      
      // Extract company address from JSON response
      const addressParts = {
        street: company.street || '',
        city: company.city || '',
        state: company.state || '',
        zipCode: company.zipCode || ''
      };

      const formattedData = {
        companyName: company.name || '',
        companyEmail: company.email || '',
        companyPhone: company.phoneNumber || '',
        companyGstNo: company.gstNumber || '',
        companyAddress: addressParts,
        fullName: admin.userName || '',
        email: admin.email || '',
        phone: admin.phoneNumber || '',
        password: admin.password || '',
        panCardNumber: admin.panNumber || '',
        presentAddress: {
          street:admin.presentAddress.street || '', // These aren't in the JSON response, using empty defaults
          city:admin.presentAddress.city || '',
          state: admin.presentAddress.state || '',
          zipCode: admin.presentAddress.zipCode || ''
        },
        permanentAddress: {
          street: admin.permanentAddress.street || '', // These aren't in the JSON response, using empty defaults
          city: admin.permanentAddress.city || '',
          state: admin.permanentAddress.state || '',
          zipCode: admin.permanentAddress.zipCode || ''
        }
      };
      
      setAdminData(formattedData);
      setOriginalData(formattedData);
    }
  }, [companyData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, field] = name.split('.');
      setAdminData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [field]: value,
        },
      }));

      // Clear error for address fields when typing
      if (parent === 'presentAddress') {
        const errorKey = `presentAddress${field.charAt(0).toUpperCase() + field.slice(1)}`;
        if (errors[errorKey]) {
          setErrors(prev => ({ ...prev, [errorKey]: undefined }));
        }
      } else if (parent === 'permanentAddress') {
        const errorKey = `permanentAddress${field.charAt(0).toUpperCase() + field.slice(1)}`;
        if (errors[errorKey]) {
          setErrors(prev => ({ ...prev, [errorKey]: undefined }));
        }
      } else if (parent === 'companyAddress') {
        const errorKey = `companyAddress${field.charAt(0).toUpperCase() + field.slice(1)}`;
        if (errors[errorKey]) {
          setErrors(prev => ({ ...prev, [errorKey]: undefined }));
        }
      }
    } else {
      setAdminData((prev) => ({ ...prev, [name]: value }));
      
      // Clear error for this field when user starts typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }
    }
  };

  const handleSave = async () => {
    // Prepare data structure expected by validateForm function
    const adminDataForValidation = {
      companyName: adminData.companyName,
      companyEmail: adminData.companyEmail,
      companyPhone: adminData.companyPhone,
      companyGstNo: adminData.companyGstNo,
      companyAddressStreet: adminData.companyAddress.street,
      companyAddressCity: adminData.companyAddress.city,
      companyAddressState: adminData.companyAddress.state,
      companyAddressZipCode: adminData.companyAddress.zipCode,
      fullName: adminData.fullName,
      email: adminData.email,
      phone: adminData.phone,
      panCardNumber: adminData.panCardNumber,
      password: adminData.password,
      presentAddressStreet: adminData.presentAddress.street,
      presentAddressCity: adminData.presentAddress.city,
      presentAddressState: adminData.presentAddress.state,
      presentAddressZipCode: adminData.presentAddress.zipCode,
      permanentAddressStreet: adminData.permanentAddress.street,
      permanentAddressCity: adminData.permanentAddress.city,
      permanentAddressState: adminData.permanentAddress.state,
      permanentAddressZipCode: adminData.permanentAddress.zipCode,
    };
    
    const validationErrors = validateForm(adminDataForValidation);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Structure the update payload based on the API response structure
      await updateAdmin({ 
        companyId: id,
        companyName: adminData.companyName,
        companyEmail: adminData.companyEmail,
        companyPhoneNo: adminData.companyPhone,
        gstNumber: adminData.companyGstNo,
        companyAddress: {
          street: adminData.companyAddress.street,
          city: adminData.companyAddress.city,
          state: adminData.companyAddress.state,
          zipCode: adminData.companyAddress.zipCode,
        },
      }).unwrap();
      
      
      setIsEditing(false);
      setOriginalData(adminData);
      alert('Admin updated successfully!');
    } catch (error) {
      console.error('Update failed:', error);
      alert("Failed to update admin.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAdminData(originalData);
    setErrors({});
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  if (isLoading) return <Box p={3} textAlign="center"><Typography>Loading...</Typography></Box>;
  if (isError) return (
    <Box p={3} textAlign="center">
      <Typography color="error">Error loading company details</Typography>
      <Button startIcon={<ArrowCircleLeft />} onClick={handleBackButton} sx={{ mt: 2 }}>Go Back</Button>
    </Box>
  );
  if (!adminData) return null;

  // Function to map validation error keys to form field error keys
  const getFieldError = (fieldName) => {
    // Map validation error keys to form field names
    const errorMappings = {
      'companyName': errors.companyName,
      'companyEmail': errors.companyEmail,
      'companyPhone': errors.companyPhone,
      'companyGstNo': errors.companyGstNo,
      'companyAddress.street': errors.companyAddressStreet,
      'companyAddress.city': errors.companyAddressCity,
      'companyAddress.state': errors.companyAddressState,
      'companyAddress.zipCode': errors.companyAddressZipCode,
      'fullName': errors.fullName,
      'email': errors.email,
      'phone': errors.phone,
      'password': errors.password,
      'panCardNumber': errors.panCardNumber,
      'presentAddress.street': errors.presentAddressStreet,
      'presentAddress.city': errors.presentAddressCity,
      'presentAddress.state': errors.presentAddressState,
      'presentAddress.zipCode': errors.presentAddressZipCode,
      'permanentAddress.street': errors.permanentAddressStreet,
      'permanentAddress.city': errors.permanentAddressCity,
      'permanentAddress.state': errors.permanentAddressState,
      'permanentAddress.zipCode': errors.permanentAddressZipCode,
    };
    
    return errorMappings[fieldName];
  };

  return (
    <>
      <Button 
        variant="contained" 
        startIcon={<ArrowCircleLeft />} 
        onClick={handleBackButton}
        sx={{ ml: 3, mt: 2 }}
      >
        Back
      </Button>
      
      <Box p={3} sx={{ maxWidth: 900, margin: '0 auto' }}>
        <Card elevation={2} sx={{ mb: 3, p: 2, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">Admin Details</Typography>
          <Typography variant="body2" color="text.secondary">View and update admin information</Typography>
        </Card>

        <Paper component="form" sx={{ width: '100%', p: 3 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            {/* Company details */}
            <Typography component="h4" variant="h6">Company Details</Typography>
            <Divider />

            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              value={adminData.companyName}
              onChange={handleChange}
              disabled={!isEditing}
              error={Boolean(getFieldError('companyName'))}
              helperText={getFieldError('companyName')}
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
              value={adminData.companyEmail}
              onChange={handleChange}
              disabled={!isEditing}
              error={Boolean(getFieldError('companyEmail'))}
              helperText={getFieldError('companyEmail')}
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

            <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
              <TextField
                fullWidth
                label="Company Phone no"
                name="companyPhone"
                type="number"
                value={adminData.companyPhone}
                onChange={handleChange}
                disabled={!isEditing}
                error={Boolean(getFieldError('companyPhone'))}
                helperText={getFieldError('companyPhone')}
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
                value={adminData.companyGstNo}
                onChange={handleChange}
                disabled={!isEditing}
                error={Boolean(getFieldError('companyGstNo'))}
                helperText={getFieldError('companyGstNo')}
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
            
            {/* Company Address */}
            <Typography component="h4" variant="h6">Company Address</Typography>
            <Divider />

            <TextField
              fullWidth
              label="Address line 1"
              placeholder='Building no, street name'
              name="companyAddress.street"
              value={adminData.companyAddress.street}
              onChange={handleChange}
              disabled={!isEditing}
              error={Boolean(getFieldError('companyAddress.street'))}
              helperText={getFieldError('companyAddress.street')}
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
            
            <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
              <TextField
                fullWidth
                label="City"
                name="companyAddress.city"
                value={adminData.companyAddress.city}
                onChange={handleChange}
                disabled={!isEditing}
                error={Boolean(getFieldError('companyAddress.city'))}
                helperText={getFieldError('companyAddress.city')}
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
                name="companyAddress.state"
                value={adminData.companyAddress.state}
                onChange={handleChange}
                disabled={!isEditing}
                error={Boolean(getFieldError('companyAddress.state'))}
                helperText={getFieldError('companyAddress.state')}
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
            </Stack>
            
            <TextField
              fullWidth
              label="Zip Code"
              name="companyAddress.zipCode"
              type="number"
              value={adminData.companyAddress.zipCode}
              onChange={handleChange}
              disabled={!isEditing}
              error={Boolean(getFieldError('companyAddress.zipCode'))}
              helperText={getFieldError('companyAddress.zipCode')}
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
            <Typography component="h4" variant="h6" mt={2}>Administrator Details</Typography>
            <Divider />

            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={adminData.fullName}
              onChange={handleChange}
              // disabled={!isEditing}
              disabled
              error={Boolean(getFieldError('fullName'))}
              helperText={getFieldError('fullName')}
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

            <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={adminData.email}
                onChange={handleChange}
                // disabled={!isEditing}
                disabled
                error={Boolean(getFieldError('email'))}
                helperText={getFieldError('email')}
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
                value={adminData.phone}
                onChange={handleChange}
                // disabled={!isEditing}
                disabled
                error={Boolean(getFieldError('phone'))}
                helperText={getFieldError('phone')}
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

            <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
              {isEditing && (
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  disabled
                  type={showPassword ? "text" : "password"}
                  value={adminData.password}
                  onChange={handleChange}
                  error={Boolean(getFieldError('password'))}
                  helperText={getFieldError('password')}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )}
              
              <TextField
                fullWidth
                label="PAN Card Number"
                name="panCardNumber"
                value={adminData.panCardNumber}
                onChange={handleChange}
                // disabled={!isEditing}
                disabled
                error={Boolean(getFieldError('panCardNumber'))}
                helperText={getFieldError('panCardNumber')}
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
            <Typography component="h4" variant="h6" mt={2}>Present Address</Typography>
            <Divider />

            <TextField
              fullWidth
              label="Street"
              name="presentAddress.street"
              value={adminData.presentAddress.street}
              onChange={handleChange}
              // disabled={!isEditing}
              disabled
              error={Boolean(getFieldError('presentAddress.street'))}
              helperText={getFieldError('presentAddress.street')}
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
            
            <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
              <TextField
                fullWidth
                label="City"
                name="presentAddress.city"
                value={adminData.presentAddress.city}
                onChange={handleChange}
                // disabled={!isEditing}
                disabled
                error={Boolean(getFieldError('presentAddress.city'))}
                helperText={getFieldError('presentAddress.city')}
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
                name="presentAddress.state"
                value={adminData.presentAddress.state}
                onChange={handleChange}
                // disabled={!isEditing}
                disabled
                error={Boolean(getFieldError('presentAddress.state'))}
                helperText={getFieldError('presentAddress.state')}
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
            </Stack>
            
            <TextField
              fullWidth
              label="Zip Code"
              name="presentAddress.zipCode"
              type="number"
              value={adminData.presentAddress.zipCode}
              onChange={handleChange}
              // disabled={!isEditing}
              disabled
              error={Boolean(getFieldError('presentAddress.zipCode'))}
              helperText={getFieldError('presentAddress.zipCode')}
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
            <Typography component="h4" variant="h6" mt={2}>Permanent Address</Typography>
            <Divider />

            <TextField
              fullWidth
              label="Street"
              name="permanentAddress.street"
              value={adminData.permanentAddress.street}
              onChange={handleChange}
              // disabled={!isEditing}
              disabled
              error={Boolean(getFieldError('permanentAddress.street'))}
              helperText={getFieldError('permanentAddress.street')}
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
            
            <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
              <TextField
                fullWidth
                label="City"
                name="permanentAddress.city"
                value={adminData.permanentAddress.city}
                onChange={handleChange}
                // disabled={!isEditing}
                disabled
                error={Boolean(getFieldError('permanentAddress.city'))}
                helperText={getFieldError('permanentAddress.city')}
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
                name="permanentAddress.state"
                value={adminData.permanentAddress.state}
                onChange={handleChange}
                // disabled={!isEditing}
                disabled
                error={Boolean(getFieldError('permanentAddress.state'))}
                helperText={getFieldError('permanentAddress.state')}
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
            </Stack>
            
            <TextField
              fullWidth
              label="Zip Code"
              name="permanentAddress.zipCode"
              type="number"
              value={adminData.permanentAddress.zipCode}
              onChange={handleChange}
              // disabled={!isEditing}
              disabled
              error={Boolean(getFieldError('permanentAddress.zipCode'))}
              helperText={getFieldError('permanentAddress.zipCode')}
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
            <Box mt={3} textAlign="center">
              {!isEditing ? (
                <Button variant="contained" onClick={() => setIsEditing(true)}>Edit</Button>
              ) : (
                <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
                  <Button variant="outlined" color="error" onClick={handleCancel} disabled={isUpdating}>
                    Cancel
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSave} 
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Saving...' : 'Save'}
                  </Button>
                </Stack>
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default AdminDetails;