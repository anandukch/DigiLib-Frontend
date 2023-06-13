import React, { useState } from 'react';
import { AppBar, Box, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import IssueBookPage from './IssuePage';
import { LogoutOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const IssuerDashboard: React.FC<any> = () => {
  const [renderComp, setRenderComp] = useState("addBook");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 600px)');

  const addComponentHandler = (comp: string) => {
    return <IssueBookPage />;
    // switch (comp) {
    //   case "addBook":
    //     return <AddBook />;
    //   // case "addAuthor":
    //   //   return <AddAuthor />;
    //   default:
    //     return <IssueBookPage />;
    // }
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleMenuClick = (comp: string) => {
    setRenderComp(comp);
    setIsDrawerOpen(false);
  };
 const navigate=useNavigate();
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
                Issuer Dashboard
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
            <ListItemButton onClick={() => handleMenuClick("addBook")} style={{ backgroundColor: renderComp === "addBook" ? "#3f51b5" : "" }}>
              <ListItemIcon>
                {/* Add your own icons here */}
              </ListItemIcon>
              <ListItemText primary="Add book" />
            </ListItemButton>

            <ListItemButton onClick={() => handleMenuClick("addAuthor")} style={{ backgroundColor: renderComp === "addAuthor" ? "#3f51b5" : "" }}>
              <ListItemIcon>
                {/* Add your own icons here */}
              </ListItemIcon>
              <ListItemText primary="Add author" />
            </ListItemButton>

            <ListItemButton onClick={() => handleMenuClick("issueBook")} style={{ backgroundColor: renderComp === "issueBook" ? "#3f51b5" : "" }}>
              <ListItemIcon>
                {/* Add your own icons here */}
              </ListItemIcon>
              <ListItemText primary="Issue book" />
            </ListItemButton>

            <ListItemButton onClick={logOutHandler}>
              <ListItemIcon>
                <LogoutOutlined/>
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

export default IssuerDashboard;
