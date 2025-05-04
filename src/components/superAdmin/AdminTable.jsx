import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { useGetCompaniesQuery } from '../../app/adminApi';
import { useNavigate } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AdminTableShimmer from './AdminTableShimmer';

const AdminTable = () => {
  // const { data: admins = [], isLoading, isError } = useGetCompaniesQuery();
  const { data: response = {}, isLoading, isError } = useGetCompaniesQuery();
  const admins = response.data || [];

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleViewDetails = (id) => {
    navigate(`/super-admin/${id}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const handleAddClick = () => {
    navigate('/super-admin/add-company');
  };

  const filteredAdmins = admins.filter((adminItem) => {
    const name = adminItem.admin?.userName?.toLowerCase() || '';
    const email = adminItem.admin?.email?.toLowerCase() || '';
    const phone = adminItem.admin?.phoneNumber?.toLowerCase() || '';
    const companyName = adminItem.name?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();

    return (
      name.includes(query) ||
      email.includes(query) ||
      phone.includes(query) ||
      companyName.includes(query)
    );
  });

  const paginatedAdmins = filteredAdmins.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (isLoading) {
    return <AdminTableShimmer />;
  }

  if (isError) {
    return (
      <Box p={3} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          Failed to load admins!
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={3} sx={{ maxWidth: 1200, margin: '0 auto' }}>
      <Card elevation={2} sx={{ mb: 3, p: 2, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Admin Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View and Manage all company administrator details
        </Typography>
      </Card>

      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          sx={{ width: '400px', ml: '30px' }}
          label="Search Admins"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by Company, name, phone, email"
        />
        <Button
          variant="contained"
          startIcon={<AddBoxIcon />}
          sx={{ mr: '30px' }}
          onClick={handleAddClick}
        >
          Add
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.04)' }}>
              <TableCell align="center"><strong>#</strong></TableCell>
              <TableCell align="center"><strong>Company Name</strong></TableCell>
              <TableCell align="center"><strong>Admin Name</strong></TableCell>
              <TableCell align="center"><strong>Email</strong></TableCell>
              <TableCell align="center"><strong>Phone</strong></TableCell>
              <TableCell align="center"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedAdmins.length > 0 ? (
              paginatedAdmins.map((adminItem, index) => (
                <TableRow key={adminItem.id}>
                  <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell align="center">{adminItem.name}</TableCell>
                  <TableCell align="center">{adminItem.admin?.userName}</TableCell>
                  <TableCell align="center">{adminItem.admin?.email}</TableCell>
                  <TableCell align="center">{adminItem.admin?.phoneNumber}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleViewDetails(adminItem.id)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" color="text.secondary" py={3}>
                    No Admin Found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[3, 10, 25]}
          component="div"
          count={filteredAdmins.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default AdminTable;
