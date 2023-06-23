import React, { useState } from 'react';
import { AppBar, Box, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { LogoutOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import TransactionTable from '../components/UserDashboard/TransactionTable';

const UserDashboard: React.FC<any> = () => {
  const [renderComp, setRenderComp] = useState("transactions");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 600px)');

  const addComponentHandler = (comp: string) => {
    switch (comp) {
      case "transactions":
        return <TransactionTable />;
      // case "notifications":
      //   return <Notification />;
      // case "addAuthor":
      //   return <AddAuthor />;
      default:
      return <TransactionTable />;
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
    localStorage.removeItem("role")
    navigate("/login");
  };

  const exploreHandler = () => {
    navigate("/");
  }

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
          title='User Dashboard'
          variant={isMobile ? "temporary" : "permanent"}
          open={!isMobile || isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          sx={{
            width: isMobile ? '100%' : 300,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: isMobile ? '100%' : 300,
              boxSizing: 'border-box',
              backgroundColor: '#202123',
            },
          }}
        >
          {isMobile && (
            <Toolbar />
          )}
          <Typography variant="h6" component="div" sx={{ p: 3 }}>
            User Dashboard
          </Typography>
          <List>
            <ListItemButton onClick={exploreHandler}>
              <ListItemIcon>
                {/* Add your own icons here */}
              </ListItemIcon>
              <ListItemText primary="Explore Books" />
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuClick("transactions")} style={{ backgroundColor: renderComp === "transactions" ? "#3f51b5" : "" }}>
              <ListItemIcon>
                {/* Add your own icons here */}
              </ListItemIcon>
              <ListItemText primary="All Transactions" />
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuClick("notifications")} style={{ backgroundColor: renderComp === "transactions" ? "#3f51b5" : "" }}>
              <ListItemIcon>
                {/* Add your own icons here */}
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItemButton>


            {/* <ListItemButton onClick={() => handleMenuClick("addAuthor")} style={{ backgroundColor: renderComp === "addAuthor" ? "#3f51b5" : "" }}>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary="Add author" />
            </ListItemButton>

            <ListItemButton onClick={() => handleMenuClick("issueBook")} style={{ backgroundColor: renderComp === "issueBook" ? "#3f51b5" : "" }}>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary="Issue book" />
            </ListItemButton> */}

            <ListItemButton onClick={logOutHandler}>
              <ListItemIcon>
                <LogoutOutlined />
              </ListItemIcon>
              <ListItemText primary="LogOut" />
            </ListItemButton>
          </List>
        </Drawer>

        <Box sx={{ marginLeft: 0 }}>
          <Toolbar />
          {addComponentHandler(renderComp)}
        </Box>
      </Box>
    </>
  );
};

export default UserDashboard;
