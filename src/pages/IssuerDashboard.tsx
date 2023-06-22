import React, { useState } from 'react';
import { AppBar, Box, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import IssueBookPage from './IssuePage';
import { BookOnlineOutlined, LogoutOutlined, LibraryBooksOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useAuth } from '../provider/authProvider';
import IssueBook from '../components/IssueBook';

const IssuerDashboard: React.FC<any> = () => {
  const [renderComp, setRenderComp] = useState("addBook");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { logOut } = useAuth()
  const isMobile = useMediaQuery('(max-width: 600px)');
  const navigate = useNavigate();

  const addComponentHandler = (comp: string) => {
    switch (comp) {
      case "bookTransaction":
        return <IssueBookPage />;
      case "issueBook":
        return <IssueBook />;
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
          title='Issuer Dashboard'
          variant={isMobile ? "temporary" : "permanent"}
          open={!isMobile || isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          sx={{
            width: isMobile ? '100%' : 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: isMobile ? '100%' : 300,
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
            Issuer Dashboard
          </Typography>
          <List>

            <ListItemButton onClick={() => { navigate("/") }}>
              <ListItemIcon>
                <BookOnlineOutlined />
              </ListItemIcon>
              <ListItemText primary="Explore Book" />
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuClick("issueBook")} style={{ backgroundColor: renderComp === "issueBook" ? "#3f51b5" : "" }}>
              <ListItemIcon>
                <LibraryBooksOutlined />

              </ListItemIcon>
              <ListItemText primary="Issue book" />
            </ListItemButton>

            <ListItemButton onClick={() => handleMenuClick("bookTransaction")} style={{ backgroundColor: renderComp === "bookTransaction" ? "#3f51b5" : "" }}>
              <ListItemIcon>
                <LibraryBooksOutlined />

              </ListItemIcon>
              <ListItemText primary="Book Transaction" />
            </ListItemButton>

            <ListItemButton onClick={logOut}>
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

export default IssuerDashboard;
