import { AccountCircle } from "@mui/icons-material"
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import { useNavigate } from "react-router";
import { useAuth } from "../provider/authProvider";

export const NavBar = () => {
  const { token, profile } = useAuth();
  const userProfile = JSON.parse(profile);
  const navigate = useNavigate();
  const profileHandler = () => {
    navigate('/dashboard', { replace: true })
  }
  return (
    <AppBar position="static">
      <Toolbar >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Digilib
        </Typography>
        {
          token ? (
            <>
              <Typography variant="subtitle1" component="div" style={{
                marginRight: '2rem',
              }}>
                Welcome {userProfile?.name}
              </Typography>
              <IconButton color="inherit" edge="end" aria-label="profile" onClick={profileHandler}>
                <AccountCircle />
              </IconButton>
            </>
          ) : (
            <Typography variant="h6" component="div" style={{
              cursor: 'pointer'
            }} onClick={() => {
              navigate('/login')

            }}>
              Login
            </Typography>

          )

        }

      </Toolbar>
    </AppBar>
  )
}