// ✅ Final Body.jsx - 100% Manual Redux (No thunk)

import React, { useEffect, useState } from "react";
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

import { useDispatch, useSelector } from "react-redux";
import { roomAllocationAction } from "../services/roomAllocationAction";
import { setRoomData, setRoomLoading, setRoomError } from "../actions/roomAllocationAction";
import apiService from "../services/Service";
import { buildingAction } from "../actions/BuildingAction";
const paymentTypes = ["MONTHLY", "QUARTERLY", "YEARLY"];

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

const Body2 = () => {
    const dispatch = useDispatch();
    const { floors, loading, error } = useSelector((state) => state.floorRooms);

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

    useEffect(() => {
        const fetchData = async () => {
            dispatch(setRoomLoading());
            try {
                const data = await roomAllocationAction.getAllFloorRoomData();
                dispatch(setRoomData(data));
            } catch (err) {
                dispatch(setRoomError(err.message));
            }
        };
        fetchData();
    }, [dispatch]);

    // for rent 
    const [roomRentData, setRoomRentData] = useState([])
    const [expandedGroup, setExpandedGroup] = useState(null); // for toggling details
    useEffect(() => {
        const fetchRoomRents = async () => {
            const data = await buildingAction.getAllRentData();
            console.log(data)
            setRoomRentData(data);
        };
        fetchRoomRents();
    }, [])
    const handleToggleDetails = (groupKey) => {
        console.log("clicked")
        setSelectedRoomDetails(null)
        setExpandedGroup((prev) => (prev === groupKey ? null : groupKey));
    };








    const mappedFloors = floors.map((floor) => ({
        floorNumber: floor.floorNo,
        rooms: floor.roomDto.map((room) => ({
            roomNumber: room.roomNumber,
            roomType: room.roomTypeDto?.name || "N/A",
            status: room.isAvailable ? "vacant" : "booked",
            fullData: room,
        })),
    }));

    const filteredFloors = mappedFloors
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
        .filter((floor) => floor.rooms.length > 0);

    const totals = calculateTotals(mappedFloors);

    const handleStatusClick = (status) => {
        setSelectedStatus((prevStatus) => (prevStatus === status ? "all" : status));
    };

    const handleOpenBookingModal = () => setOpenBookingModal(true);
    const handleCloseBookingModal = () => setOpenBookingModal(false);

    const handleBookingFormChange = (e) => {
        const { name, value } = e.target;
        setBookingFormData({ ...bookingFormData, [name]: value });
    };

    const handleBookRoom = async () => {
        const payload = {
            roomId: selectedRoomDetails.fullData.id,
            floorNo: selectedRoomDetails.floorNumber,
            clientName: bookingFormData.companyName,
            phone: bookingFormData.phoneNo,
            email: bookingFormData.email,
            fromDate: bookingFormData.fromDate,
            toDate: bookingFormData.toDate,
            paymentType: bookingFormData.paymentType,
        };

        try {
            const url = "http://localhost:4000/bookings"; // json-server endpoint
            const response = await apiService.post(url, payload);

            if (response) {
                alert("Room booked successfully!");
            } else {
                alert("Booking failed!");
            }
        } catch (error) {
            console.error("Booking error:", error);
            alert("Something went wrong!");
        }

        setOpenBookingModal(false);
        setBookingFormData({
            companyName: "",
            phoneNo: "",
            email: "",
            fromDate: "",
            toDate: "",
            paymentType: "MONTHLY",
        });
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading floors: {error}</div>;

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
                        {mappedFloors.map((floor) => (
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
                        {[...new Set(mappedFloors.flatMap(f => f.rooms.map(r => r.roomType)))].map((type, index) => (
                            <MenuItem key={index} value={type}>{type}</MenuItem>
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
                                    <Box sx={{ width: 20, height: 20, borderRadius: "30%", backgroundColor: "purple", mr: 1 }} />
                                    <Typography fontWeight="bold">Floor {floor.floorNumber}</Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    {floor.rooms.map((room, index) => (
                                        <Grid item key={index}>
                                            <Card
                                                sx={{
                                                    backgroundColor: room.status === "vacant" ? "#b2f5ca" : "#f7a6a6",
                                                    boxShadow: 2,
                                                    borderRadius: 2,
                                                    textAlign: "center",
                                                    width: "190px",
                                                    height: "90px",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                    const isSame =
                                                        selectedRoomDetails?.roomNumber === room.roomNumber &&
                                                        selectedRoomDetails?.floorNumber === floor.floorNumber;
                                                        handleToggleDetails(null)
                                                    setSelectedRoomDetails(isSame ? null : { ...room, floorNumber: floor.floorNumber });
                                                }}
                                            >
                                                <CardContent>
                                                    <Typography variant="h6" fontWeight="bold">{room.roomNumber}</Typography>
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
                    <Box display="flex" gap={1} mt={5} height={'80px'}>
                        <Divider orientation="vertical" flexItem sx={{ height: "60px", borderColor: "black" }} />
                        <Box onClick={() => handleStatusClick("all")} sx={{ cursor: "pointer", p: 1, borderRadius: 2 }}>
                            <Typography fontWeight="bold">All</Typography>
                            <Box display="flex" alignItems="center" gap={0.5}>
                                <ApartmentIcon sx={{ color: "black" }} />
                                <Typography fontWeight="bold" color="black">{totals.total}</Typography>
                            </Box>
                        </Box>
                        <Divider orientation="vertical" flexItem sx={{ height: "60px", borderColor: "black" }} />
                        <Box onClick={() => handleStatusClick("vacant")} sx={{ cursor: "pointer", p: 1, borderRadius: 2 }}>
                            <Typography fontWeight="bold">Available</Typography>
                            <Box display="flex" alignItems="center" gap={0.5}>
                                <HotelIcon sx={{ color: "green" }} />
                                <Typography fontWeight="bold" color="green">{totals.available}</Typography>
                            </Box>
                        </Box>
                        <Divider orientation="vertical" flexItem sx={{ height: "60px", borderColor: "black" }} />
                        <Box onClick={() => handleStatusClick("booked")} sx={{ cursor: "pointer", p: 1, borderRadius: 2 }}>
                            <Typography fontWeight="bold">Occupied</Typography>
                            <Box display="flex" alignItems="center" gap={0.5}>
                                <BedIcon sx={{ color: "red" }} />
                                <Typography fontWeight="bold" color="red">{totals.occupied}</Typography>
                            </Box>
                        </Box>
                        <Divider orientation="vertical" flexItem sx={{ height: "60px", borderColor: "black" }} />
                    </Box>
                    <Box>
                        {/* <h1>hello world</h1> */}
                        <Typography variant="h5" bgcolor={'violet'} textAlign={'center'} mb={1} borderRadius={2} p={1} color="white" fontWeight={'bold'} width={'500px'}>Due and OverDue</Typography>
                        <Grid container spacing={1} mb={1}>
                            {
                                roomRentData.map((item, index) => {
                                    const groupKey = item.roomGroup.join("-");
                                    return (
                                        <Grid item key={index} >
                                            <Button variant="contained" color={item.dueAmount ? "warning" : "error"} onClick={() => handleToggleDetails(groupKey)}>{groupKey}</Button>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Box>

                    {expandedGroup &&
                        roomRentData
                            .filter((item) => item.roomGroup.join("-") === expandedGroup)
                            .map((item, index) => (
                                <Box key={index}  width="520px" borderRadius={2} mt={1}   >
                                    <Typography width={'500px'} variant="h6" textAlign={'center'} mb={1} borderRadius={2} p={1} color="white" fontWeight={'bold'} gutterBottom bgcolor={'purple'}>
                                        ROOM DETAILS
                                    </Typography>
                                    <Typography pl={'20px'}><strong>Rooms:</strong> {item.roomGroup.join(", ")}</Typography>
                                    <Typography pl={'20px'}><strong>Company Name:</strong> {item.companyName}</Typography>
                                    <Typography pl={'20px'}><strong>Email:</strong> {item.email || "NA"} </Typography>
                                    <Typography pl={'20px'}><strong>Phone:</strong> {item.phone}</Typography>
                                    

                                    {item.dueAmount > 0 && (
                                        <Typography sx={{ color: "orange", pl:'20px' }}>
                                            <strong>Due Amount:</strong> ₹{item.dueAmount}
                                        </Typography>
                                    )}

                                    {item.overdueAmount > 0 && (
                                        <Typography sx={{ color: "red" ,pl:'20px'}}>
                                            <strong>Overdue Amount:</strong> ₹{item.overdueAmount}
                                        </Typography>
                                    )}
                                </Box>
                            ))}


                    {selectedRoomDetails && (
                        <Box mt={4} width={'520px'} borderRadius={2}>
                            <Typography variant="h6" fontWeight="bold" mb={2} bgcolor='blueviolet' color="white" textAlign={'center'} width={'500px'} p={1} borderRadius={2}>
                                {selectedRoomDetails.status === "vacant" ? "Room Details" : "Booked By"}
                            </Typography>
                            {selectedRoomDetails.status === "booked" ? (
                                <Box pl={'20px'} display="flex" flexDirection="column" gap={1}>
                                    <Typography>
                                        <strong>Name:</strong> {selectedRoomDetails.fullData.assignment?.companyName || "N/A"}
                                    </Typography>
                                    <Typography>
                                        <strong>Phone:</strong> {selectedRoomDetails.fullData.assignment?.companyPhone || "N/A"}
                                    </Typography>
                                    <Typography>
                                        <strong>Email:</strong> {selectedRoomDetails.fullData.assignment?.companyEmail || "N/A"}
                                    </Typography>
                                    <Typography>
                                        <strong>From:</strong> {selectedRoomDetails.fullData.assignment?.fromDate || "N/A"}
                                    </Typography>
                                    <Typography>
                                        <strong>To:</strong> {selectedRoomDetails.fullData.assignment?.toDate || "N/A"}
                                    </Typography>
                                </Box>
                            ) : (

                                <Box pl={'20px'} display='flex' flexDirection='column' gap={1}>
                                    <Typography><strong>Room No:</strong> {selectedRoomDetails.roomNumber}</Typography>
                                    <Typography><strong>Floor:</strong> {selectedRoomDetails.floorNumber}</Typography>
                                    <Typography><strong>Room Type:</strong> {selectedRoomDetails.roomType}</Typography>
                                    <Typography><strong>Status:</strong> {selectedRoomDetails.status}</Typography>
                                    <Button variant="contained" fullWidth onClick={handleOpenBookingModal}>Book Now</Button>
                                </Box>
                            )}
                        </Box>
                    )}
                </Stack>
            </Box>

            <Dialog open={openBookingModal} onClose={handleCloseBookingModal} maxWidth="md" fullWidth>
                <DialogTitle sx={{ bgcolor: 'blueviolet', color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                    Book Room {selectedRoomDetails?.roomNumber}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={6}>
                            <TextField label="Company Name" name="companyName" value={bookingFormData.companyName} onChange={handleBookingFormChange} fullWidth required />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="Phone Number" name="phoneNo" value={bookingFormData.phoneNo} onChange={handleBookingFormChange} fullWidth required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Email" name="email" type="email" value={bookingFormData.email} onChange={handleBookingFormChange} fullWidth required />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="From Date" name="fromDate" type="date" value={bookingFormData.fromDate} onChange={handleBookingFormChange} fullWidth required InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="To Date" name="toDate" type="date" value={bookingFormData.toDate} onChange={handleBookingFormChange} fullWidth required InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Payment Type</InputLabel>
                                <Select name="paymentType" value={bookingFormData.paymentType} onChange={handleBookingFormChange} label="Payment Type">
                                    {paymentTypes.map((type) => (
                                        <MenuItem key={type} value={type}>{type}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 3, justifyContent: 'space-between' }}>
                    <Button onClick={handleCloseBookingModal} variant="outlined" color="error">Cancel</Button>
                    <Button onClick={handleBookRoom} variant="contained" color="primary">Book</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Body2;
