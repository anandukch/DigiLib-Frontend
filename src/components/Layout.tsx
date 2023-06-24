import { Container, useMediaQuery } from "@mui/material"

const Layout = ({ children }) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  return (
    <Container maxWidth="xl"
      style={{
        width: !isMobile ? '80%' : 'auto',
        marginLeft: !isMobile ? '300px' : 'auto',
      }}
    >
      {children}
    </Container>
  )
}

export default Layout