import React, { useState } from 'react';
import { AppBar, Box, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery } from '@mui/material';
import AddBook from '../components/AdminDashBoard/AddBook';
import MenuIcon from '@mui/icons-material/Menu';
import IssueBookPage from './IssuePage';
import { BookOnlineOutlined, BookOutlined, LogoutOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { FaPlus } from 'react-icons/fa';
import VerifyUserTable from '../components/AdminDashBoard/VerifyUserTable';
import ManageLib from '../components/AdminDashBoard/ManageLib';

const AdminDashboard: React.FC<any> = () => {
  const [renderComp, setRenderComp] = useState("addBook");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 600px)');

  const addComponentHandler = (comp: string) => {
    switch (comp) {
      case "addBook":
        return <AddBook />;
      case "verifyUser":
        return <VerifyUserTable />;
      case "manageLib":
        return <ManageLib />;
      default:
        return <IssueBookPage />;
    }
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleMenuClick = (comp: string) => {
    setRenderComp(comp);
    setIsDrawerOpen(false);
  };
  const navigate = useNavigate();
  const logOutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Box>
        {isMobile && (
          <AppBar position="fixed" sx={{ zIndex: 1201 }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Admin Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
        )}

        <Drawer
          title='Admin Dashboard'
          variant={isMobile ? "temporary" : "permanent"}
          open={!isMobile || isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          sx={{
            width: isMobile ? '100%' : 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: isMobile ? '100%' : 240,
              boxSizing: 'border-box',
              backgroundColor: '#202123',
              color: 'white'
            },
          }}
        >
          {isMobile && (
            <Toolbar />
          )}
          <Typography variant="h6" component="div" sx={{ p: 3 }}>
            Admin Dashboard
          </Typography>
          <List>
            <ListItemButton onClick={() => { navigate("/") }}>
              <ListItemIcon>
                <BookOnlineOutlined />
              </ListItemIcon>
              <ListItemText primary="Explore Book" />
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuClick("addBook")} style={{ backgroundColor: renderComp === "addBook" ? "#3f51b5" : "" }}>
              <ListItemIcon>
                <FaPlus />
              </ListItemIcon>
              <ListItemText primary="Add book" />
            </ListItemButton>

            <ListItemButton onClick={() => handleMenuClick("verifyUser")} style={{ backgroundColor: renderComp === "verifyUser" ? "#3f51b5" : "" }}>
              <ListItemIcon>
                {/* Add your own icons here */}
              </ListItemIcon>
              <ListItemText primary="Verify User" />
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuClick("manageTrans")} style={{ backgroundColor: renderComp === "manageTrans" ? "#3f51b5" : "" }}>
              <ListItemIcon>
                <BookOutlined />
              </ListItemIcon>
              <ListItemText primary="Manage Transactions" />
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuClick("manageLib")} style={{ backgroundColor: renderComp === "manageLib" ? "#3f51b5" : "" }}>
              <ListItemIcon>
                <BookOutlined />
              </ListItemIcon>
              <ListItemText primary="Manage LIbrary" />
            </ListItemButton>
            <ListItemButton onClick={logOutHandler}>
              <ListItemIcon>
                <LogoutOutlined />
              </ListItemIcon>
              <ListItemText primary="LogOut" />
            </ListItemButton>
          </List>
        </Drawer>

        <Box sx={{ marginLeft: 0 }}>
          {!isMobile && <Toolbar />}
          {addComponentHandler(renderComp)}
        </Box>
      </Box>
    </>
  );
};

export default AdminDashboard;
