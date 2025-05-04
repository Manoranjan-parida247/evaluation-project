import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";



const Sidebar = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Box
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      sx={{
        width: open ? 200 : 60,
        transition: "width 0.3s",
        height: "100vh",
        backgroundColor: "#1976d2",
        color: "white",
        overflowX: "hidden",
        position: "fixed",
        cursor: "pointer",
        zIndex:5
      }}
    >
      <List>
        <ListItemButton>
          <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
            <HomeIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Home" />}
        </ListItemButton>

        

        
      </List>
    </Box>
  );
};

export default Sidebar;
