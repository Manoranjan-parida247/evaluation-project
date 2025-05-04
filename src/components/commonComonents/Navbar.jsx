import { 
    AppBar, 
    Box, 
    Button, 
    IconButton, 
    Toolbar, 
    Typography, 
    useTheme, 
    useMediaQuery, 
    Menu, 
    MenuItem,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    ListItemButton
  } from '@mui/material';
  import React, { useState } from 'react';
  import LogoutIcon from '@mui/icons-material/Logout';
  import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
  import MenuIcon from '@mui/icons-material/Menu';
  import CloseIcon from '@mui/icons-material/Close';
  
  const Navbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    
    // For mobile drawer
    const [mobileOpen, setMobileOpen] = useState(false);
    
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
    
    const mobileDrawer = (
      <Box sx={{ width: 250, pt: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          <ListItem sx={{ pt: 2, pb: 2 }}>
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Super Admin" />
          </ListItem>
          <Divider />
          <ListItemButton sx={{ pt: 2, pb: 2 }}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Box>
    );
    
    return (
      <AppBar 
        position="static" 
        elevation={3}
        sx={{
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: { xs: 0.5, sm: 1 } }}>
          {/* Logo/Brand */}
          {/* <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="div"
            sx={{ 
              fontWeight: 700,
              letterSpacing: { xs: 0.5, sm: 1 },
              color: "#fff",
              display: "flex",
              alignItems: "center",
            }}
          >
            CSM
          </Typography> */}

          <img src='https://hms.watsoo.com/static/media/logo.f8104dbda33e39d1b214cff746c0cfb4.svg' alt='logo' height={'60px'} />
  
          {/* Mobile Menu Button */}
          {isMobile ? (
            <IconButton 
              color="inherit" 
              aria-label="open drawer" 
              edge="end" 
              onClick={handleDrawerToggle}
              sx={{ ml: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            /* Desktop/Tablet Right side elements */
            <Box sx={{ display: "flex", alignItems: "center", gap: { sm: 1, md: 3 } }}>
              <Box sx={{ 
                display: "flex", 
                alignItems: "center", 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                px: { sm: 1, md: 2 },
                py: 0.5,
                borderRadius: 2
              }}>
                <AdminPanelSettingsIcon sx={{ mr: { sm: 0.5, md: 1 }, display: { sm: isTablet ? 'none' : 'block', md: 'block' } }} />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 500,
                    fontSize: { sm: '0.8rem', md: '1rem' }
                  }}
                >
                  Manager
                </Typography>
              </Box>
              
              <Button 
                variant="contained" 
                disableElevation
                startIcon={!isTablet && <LogoutIcon />}
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.25)'
                  },
                  textTransform: 'none',
                  fontWeight: 500,
                  borderRadius: 2,
                  px: { sm: 1, md: 2 },
                  fontSize: { sm: '0.8rem', md: '0.9rem' }
                }}
              >
                {isTablet ? 'Exit' : 'Logout'}
              </Button>
            </Box>
          )}
        </Toolbar>
  
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
          }}
        >
          {mobileDrawer}
        </Drawer>
      </AppBar>
    );
  };
  
  export default Navbar;