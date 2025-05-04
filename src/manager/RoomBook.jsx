import {
    Modal,
    Box,
    TextField,
    Button,
    MenuItem,
    Typography
  } from "@mui/material";
  import { useState } from "react";
  
  const BookingModal = ({ open, handleClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      companyName: "",
      companyPhone: "",
      companyEmail: "",
      address: "",
      fromDate: "",
      toDate: "",
      paymentType: "monthly"
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
      handleClose();
    };
  
    return (
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: 400,
            p: 4,
            backgroundColor: "white",
            margin: "100px auto",
            borderRadius: 2
          }}
        >
          <Typography variant="h6" mb={2}>
            Book This Room
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Company Name"
              name="companyName"
              fullWidth
              margin="dense"
              value={formData.companyName}
              onChange={handleChange}
            />
            <TextField
              label="Company Phone"
              name="companyPhone"
              fullWidth
              margin="dense"
              value={formData.companyPhone}
              onChange={handleChange}
            />
            <TextField
              label="Company Email"
              name="companyEmail"
              type="email"
              fullWidth
              margin="dense"
              value={formData.companyEmail}
              onChange={handleChange}
            />
            <TextField
              label="Address"
              name="address"
              fullWidth
              margin="dense"
              value={formData.address}
              onChange={handleChange}
            />
            <TextField
              label="From Date"
              name="fromDate"
              type="date"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              value={formData.fromDate}
              onChange={handleChange}
            />
            <TextField
              label="To Date"
              name="toDate"
              type="date"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              value={formData.toDate}
              onChange={handleChange}
            />
            <TextField
              select
              label="Payment Type"
              name="paymentType"
              fullWidth
              margin="dense"
              value={formData.paymentType}
              onChange={handleChange}
            >
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="quarterly">Quarterly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </TextField>
  
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Confirm Booking
            </Button>
          </form>
        </Box>
      </Modal>
    );
  };
  