import { Box, Button, Container, TextField, Typography, Grid, useMediaQuery } from '@mui/material';


const IssueBook = () => {
  // const [loading, setLoading] = useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 600px)');
  return (
    <>
      {/* <Backdrop
        sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
      <Container maxWidth="lg"
        style={{
          width: !isMobile ? '80%' : 'auto',
          marginLeft: !isMobile ? '400px' : 'auto',
        }}
      >
        <Box sx={{ mt: 3 }}>
          <Typography variant="h4" gutterBottom>
            Issue Book
          </Typography>
          <Grid container spacing={7}>

            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Student Details
              </Typography>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  label="Name"
                  fullWidth
                  sx={{ mt: 2 }}
                  name="name"
                />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Admission Number"
                      fullWidth
                      sx={{ mt: 2 }}
                      name="add_no"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Semester"
                      fullWidth
                      sx={{ mt: 2 }}
                      name="semester"
                    />
                  </Grid>
                </Grid>


              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box component="form" noValidate autoComplete="off">
                <Typography variant="h6" gutterBottom>
                  Book Details
                </Typography>

                <TextField
                  label="Title"
                  fullWidth
                  sx={{ mt: 2 }}
                  name="title"

                />

                <TextField
                  label="ISBN"
                  fullWidth
                  sx={{ mt: 2 }}
                  name="ISBN"
                  disabled
                />



                <TextField
                  label="Author"
                  disabled
                  fullWidth
                  sx={{ mt: 2 }}
                  name="author"
                />



                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Publisher"
                      fullWidth
                      sx={{ mt: 2 }}
                      name="publisher"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Language"
                      fullWidth
                      sx={{ mt: 2 }}
                      name="language"
                      disabled
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Subject"
                      fullWidth
                      sx={{ mt: 2 }}
                      name="subject"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Number of Copies"
                      fullWidth
                      sx={{ mt: 2 }}
                      type="number"
                      name="no_of_copies"
                      disabled
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" sx={{ mt: 3 }} >
            Issue Book
          </Button>
        </Box>

      </Container>

    </>
  );
};

export default IssueBook;
