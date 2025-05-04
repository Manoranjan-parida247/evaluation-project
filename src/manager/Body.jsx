import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HotelIcon from "@mui/icons-material/Hotel";
import BedIcon from "@mui/icons-material/Bed";

const roomTypes = ["normal", "delux", "super delux"];
const paymentTypes = ["MONTHLY", "QUARTERLY", "YEARLY"];

const sampleFloors = [
  {
    floorNumber: 1,
    rooms: [
      { roomNumber: 101, roomType: "normal", status: "booked" },
      { roomNumber: 102, roomType: "delux", status: "vacant" },
      { roomNumber: 103, roomType: "super delux", status: "booked" },
      { roomNumber: 104, roomType: "normal", status: "booked" },
    ],
  },
  {
    floorNumber: 2,
    rooms: [
      { roomNumber: 201, roomType: "normal", status: "booked" },
      { roomNumber: 202, roomType: "normal", status: "booked" },
      { roomNumber: 203, roomType: "normal", status: "booked" },
      { roomNumber: 204, roomType: "delux", status: "vacant" },
      { roomNumber: 205, roomType: "super delux", status: "booked" },
      { roomNumber: 206, roomType: "normal", status: "vacant" },
    ],
  },
  {
    floorNumber: 3,
    rooms: [
      { roomNumber: 301, roomType: "normal", status: "booked" },
      { roomNumber: 302, roomType: "normal", status: "booked" },
      { roomNumber: 303, roomType: "normal", status: "booked" },
      { roomNumber: 304, roomType: "delux", status: "vacant" },
      { roomNumber: 305, roomType: "super delux", status: "booked" },
      { roomNumber: 306, roomType: "normal", status: "vacant" },
    ],
  },
  {
    floorNumber: 4,
    rooms: [
      { roomNumber: 401, roomType: "normal", status: "booked" },
      { roomNumber: 402, roomType: "normal", status: "booked" },
      { roomNumber: 403, roomType: "normal", status: "booked" },
      { roomNumber: 404, roomType: "delux", status: "vacant" },
      { roomNumber: 405, roomType: "super delux", status: "booked" },
      { roomNumber: 406, roomType: "normal", status: "vacant" },
    ],
  },
  {
    floorNumber: 5,
    rooms: [
      { roomNumber: 501, roomType: "normal", status: "booked" },
      { roomNumber: 502, roomType: "normal", status: "booked" },
      { roomNumber: 503, roomType: "normal", status: "booked" },
      { roomNumber: 504, roomType: "delux", status: "vacant" },
      { roomNumber: 505, roomType: "super delux", status: "booked" },
      { roomNumber: 506, roomType: "normal", status: "vacant" },
    ],
  },
];

const calculateTotals = (floors) => {
  return floors.reduce(
    (acc, floor) => {
      floor.rooms.forEach((room) => {
        acc.total += 1;
        if (room.status === "vacant") acc.available += 1;
        else acc.occupied += 1;
      });
      return acc;
    },
    { total: 0, available: 0, occupied: 0 }
  );
};

const Body = () => {
  const [selectedFloor, setSelectedFloor] = useState("all");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedRoomDetails, setSelectedRoomDetails] = useState(null);
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    companyName: "",
    phoneNo: "",
    email: "",
    fromDate: "",
    toDate: "",
    paymentType: "MONTHLY",
  });

  const totals = calculateTotals(sampleFloors);

  const filteredFloors = sampleFloors
    .filter((floor) =>
      selectedFloor === "all" ? true : floor.floorNumber === Number(selectedFloor)
    )
    .map((floor) => ({
      ...floor,
      rooms: floor.rooms.filter((room) => {
        const matchType = selectedType ? room.roomType === selectedType : true;
        const matchStatus =
          selectedStatus !== "all" ? room.status === selectedStatus : true;
        return matchType && matchStatus;
      }),
    }))
    .filter((floor) => floor.rooms.length > 0); // Skip empty floors

  const handleStatusClick = (status) => {
    setSelectedStatus((prevStatus) => (prevStatus === status ? "all" : status));
  };

  const handleOpenBookingModal = () => {
    setOpenBookingModal(true);
  };

  const handleCloseBookingModal = () => {
    setOpenBookingModal(false);
  };

  const handleBookingFormChange = (e) => {
    const { name, value } = e.target;
    setBookingFormData({
      ...bookingFormData,
      [name]: value,
    });
  };

  const handleBookRoom = () => {
    // Here you would implement the logic to book the room
    console.log("Booking data:", {
      room: selectedRoomDetails,
      bookingDetails: bookingFormData,
    });
    
    // Close modal and reset form
    setOpenBookingModal(false);
    setBookingFormData({
      companyName: "",
      phoneNo: "",
      email: "",
      fromDate: "",
      toDate: "",
      paymentType: "MONTHLY",
    });
    
    // You might want to update the room status here as well
  };

  return (
    <>
      {/* Filters */}
      <Stack direction="row" gap={8} ml={10} zIndex={1}>
        <FormControl sx={{ width: "200px", mt: 3 }}>
          <InputLabel>Floor</InputLabel>
          <Select
            label="Floor"
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
          >
            <MenuItem value="all">All Floors</MenuItem>
            {sampleFloors.map((floor) => (
              <MenuItem key={floor.floorNumber} value={floor.floorNumber}>
                Floor {floor.floorNumber}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: "200px", mt: 3 }}>
          <InputLabel>Room Type</InputLabel>
          <Select
            label="Room Type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <MenuItem value="">All Types</MenuItem>
            {roomTypes.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Main Content */}
      <Box display="flex">
        <Box ml={10} mt={5} mr={2} width="65%" height="75vh" overflow="auto" pr={2}>
          {filteredFloors.map((floor) => (
            <Accordion key={floor.floorNumber} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box display="flex" alignItems="center">
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "30%",
                      backgroundColor: "purple",
                      mr: 1,
                      boxShadow:
                        "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
                    }}
                  />
                  <Typography fontWeight="bold">
                    Floor {floor.floorNumber}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {floor.rooms.map((room, index) => (
                    <Grid item key={index}>
                      <Card
                        sx={{
                          backgroundColor:
                            room.status === "vacant" ? "#b2f5ca" : "#f7a6a6",
                          boxShadow: 2,
                          borderRadius: 2,
                          textAlign: "center",
                          width: "190px",
                          height: "90px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          const isSameRoom =
                            selectedRoomDetails &&
                            selectedRoomDetails.roomNumber === room.roomNumber &&
                            selectedRoomDetails.floorNumber === floor.floorNumber;

                          if (isSameRoom) {
                            setSelectedRoomDetails(null); // hide if same room is clicked again
                          } else {
                            setSelectedRoomDetails({
                              ...room,
                              floorNumber: floor.floorNumber,
                              user: room.status === "booked"
                                ? {
                                  name: "John Doe",
                                  phone: "9876543210",
                                  email: "john@example.com"
                                }
                                : null
                            });
                          }
                        }}
                      >
                        <CardContent>
                          <Typography variant="h6" fontWeight="bold">
                            {room.roomNumber}
                          </Typography>
                          <Typography variant="body2">{room.roomType}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        <Stack>
          {/* Status Filter Panel */}
          <Box display="flex" alignItems="flex-start" gap={1} mt={5} height={'80px'}>
            <Divider orientation="vertical" flexItem sx={{ height: "60px", borderColor: "black" }} />

            {/* All */}
            <Box
              onClick={() => handleStatusClick("all")}
              sx={{
                cursor: "pointer",
                p: 1,
                borderRadius: 2,
                // backgroundColor: selectedStatus === "all" ? "#e0e0e0" : "transparent",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <Typography fontWeight="bold">All</Typography>
              <Box display="flex" alignItems="center" gap={0.5}>
                <ApartmentIcon sx={{ color: "black" }} />
                <Typography fontWeight="bold" color="black">{totals.total}</Typography>
              </Box>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ height: "60px", borderColor: "black" }} />

            {/* Available */}
            <Box
              onClick={() => handleStatusClick("vacant")}
              sx={{
                cursor: "pointer",
                p: 1,
                borderRadius: 2,
                backgroundColor: selectedStatus === "vacant" ? "#e0e0e0" : "transparent",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <Typography fontWeight="bold">Available</Typography>
              <Box display="flex" alignItems="center" gap={0.5}>
                <HotelIcon sx={{ color: "green" }} />
                <Typography fontWeight="bold" color="green">{totals.available}</Typography>
              </Box>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ height: "60px", borderColor: "black" }} />

            {/* Occupied */}
            <Box
              onClick={() => handleStatusClick("booked")}
              sx={{
                cursor: "pointer",
                p: 1,
                borderRadius: 2,
                backgroundColor: selectedStatus === "booked" ? "#e0e0e0" : "transparent",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <Typography fontWeight="bold">Occupied</Typography>
              <Box display="flex" alignItems="center" gap={0.5}>
                <BedIcon sx={{ color: "red" }} />
                <Typography fontWeight="bold" color="red">{totals.occupied}</Typography>
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ height: "60px", borderColor: "black" }} />
          </Box>
          {selectedRoomDetails && (
            <Box
              mt={4}
              width={'520px'}
              borderRadius={2}
            >
              <Typography variant="h6" fontWeight="bold" mb={2} bgcolor='blueviolet' color="white" textAlign={'center'}>
                {selectedRoomDetails.status === "vacant"
                  ? "Room Details"
                  : "Booked By"}
              </Typography>

              {selectedRoomDetails.status === "booked" ? (
                <Box sx={{pl:'20px'}} >
                  <Typography><strong>Name:</strong> {selectedRoomDetails.user.name}</Typography>
                  <Typography><strong>Phone:</strong> {selectedRoomDetails.user.phone}</Typography>
                  <Typography><strong>Email:</strong> {selectedRoomDetails.user.email}</Typography>
                </Box>
              ) : (
                <Box sx={{pl:'20px'}} display={'flex'} flexDirection={'column'} gap={1}>
                  <Typography><strong>Room No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</strong> {selectedRoomDetails.roomNumber}</Typography>
                  <Typography><strong>Floor&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</strong> {selectedRoomDetails.floorNumber}</Typography>
                  <Typography><strong>Room Type&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</strong> {selectedRoomDetails.roomType}</Typography>
                  <Typography><strong>Status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</strong> {selectedRoomDetails.status}</Typography>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    sx={{
                      bgcolor: 'radial-gradient(circle,rgba(160, 185, 229, 1) 87%, rgba(156, 186, 230, 1) 91%, rgba(148, 187, 233, 1) 100%);'
                    }}
                    onClick={handleOpenBookingModal}
                  >
                    book now
                  </Button>
                </Box>
              )}
            </Box>
          )}

        </Stack>
      </Box>

      {/* Booking Modal */}
      <Dialog 
        open={openBookingModal} 
        onClose={handleCloseBookingModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle 
          sx={{ 
            bgcolor: 'blueviolet', 
            color: 'white', 
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Book Room {selectedRoomDetails?.roomNumber}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Company Name"
                name="companyName"
                value={bookingFormData.companyName}
                onChange={handleBookingFormChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone Number"
                name="phoneNo"
                value={bookingFormData.phoneNo}
                onChange={handleBookingFormChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={bookingFormData.email}
                onChange={handleBookingFormChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="From Date"
                name="fromDate"
                type="date"
                value={bookingFormData.fromDate}
                onChange={handleBookingFormChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="To Date"
                name="toDate"
                type="date"
                value={bookingFormData.toDate}
                onChange={handleBookingFormChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Payment Type</InputLabel>
                <Select
                  name="paymentType"
                  value={bookingFormData.paymentType}
                  onChange={handleBookingFormChange}
                  label="Payment Type"
                >
                  {paymentTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: 'space-between' }}>
          <Button 
            onClick={handleCloseBookingModal} 
            variant="outlined" 
            color="error"
            sx={{ width: '120px' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleBookRoom} 
            variant="contained" 
            color="primary"
            sx={{ 
              width: '120px',
              bgcolor: 'blueviolet',
              '&:hover': {
                bgcolor: '#6a0dad'
              }
            }}
          >
            Book
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Body;