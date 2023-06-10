import React, { useState } from 'react'
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import AddBook from '../components/AdminDashBoard/AddBook';
import AddAuthor from '../components/AdminDashBoard/AddAuthor';


const AdminDashboard: React.FC<any> = () => {
  const [renderComp, setRenderComp] = useState("addBook")
  const addComponentHandler = (comp: string) => {
    switch (comp) {
      case "addBook":
        return <AddBook />
      case "addAuthor":
        return <AddAuthor />
      default:
        return <AddBook />
    }
  }
  return (
    <>
      {/* <Router> */}
      <Box >
        <Drawer
          title='Admin Dashboard'
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              backgroundColor: '#202123',
              color: "white"
            },
          }}
        >
          <Toolbar />
          <Typography variant="h6" component="div" sx={{ p: 3 }}>
            Admin Dashboard
          </Typography>
          <List >
            <ListItemButton onClick={
              () => setRenderComp("addBook")
            } style={{
              backgroundColor: renderComp === "addBook" ? "#3f51b5" : ""
            }}>
              <ListItemIcon>
                {/* Add your own icons here */}
              </ListItemIcon>
              <ListItemText primary="Add book" />
            </ListItemButton>

            <ListItemButton onClick={() => setRenderComp("addAuthor")
            } style={{
              backgroundColor: renderComp === "addAuthor" ? "#3f51b5" : ""
            }}>
              <ListItemIcon>
                {/* Add your own icons here */}
              </ListItemIcon>
              <ListItemText primary="Add author" />
            </ListItemButton>
            <ListItemButton onClick={() => setRenderComp("issueBook")} style={{
              backgroundColor: renderComp === "issueBook" ? "#3f51b5" : ""
            }}>
              <ListItemIcon>
                {/* Add your own icons here */}
              </ListItemIcon>
              <ListItemText primary="Add book" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box >
          <Toolbar />
          {
            addComponentHandler(renderComp)
          }
        </Box>
      </Box>

    </>
  )
}

export default AdminDashboard
