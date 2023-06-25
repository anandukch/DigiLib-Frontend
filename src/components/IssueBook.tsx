import { Box, Button, Container, TextField, Typography, Grid, useMediaQuery, Backdrop, CircularProgress, Autocomplete, ListItem, ListItemText, List, makeStyles, ListItemButton,Snackbar} from '@mui/material';
import { searchUser } from '../apis/userApi';
import { useReducer, useState } from 'react';
import SelectTextField from './SelecTextField';
import { immediateIssue, searchBook } from '../apis/booksApi';
import Popup from './Popup';
import Loader from './Loader/Loader';

type DateData = {
  issue_date: string;
  return_date: string;
}
const IssueBook = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [dateFields, setDateFields] = useState<DateData>({
    issue_date: new Date().toISOString().slice(0, 10),
    return_date: new Date().toISOString().slice(0, 10)
  })
  const [users, setUsers] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [book, setBook] = useState<any>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const closeSnackbar = () => {
    setShowSnackbar(false);
  };
  const onChangeRegNo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setUsers([]);
      return;
    }
    setLoading(true);

    searchUser(event.target.value).then(response => {
      setUsers(response.data);
      setLoading(false);

    })
  }
  const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateFields({
      ...dateFields,
      [event.target.name]: event.target.value
    })
  }
  const listClickHandler = (value, type: string = "user") => {
    if (type === "book") {
      setBook(value);
      setBooks([]);
      return;
    }
    setUser(value);
    setUsers([]);
  }

  const onSearchBook = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setBooks([]);
      return;
    }
    setLoading(true);

    searchBook(event.target.value).then(response => {
      console.log(response.data);

      setBooks(response.data);
      setLoading(false);

    })
  }

  const onIssueHandler = () => {
    immediateIssue({
      book_id: book.id,
      user_id: user.id,
      acc_no: book.acc_no,
      ...dateFields
    }).then(_ => {
      setShowSnackbar(true);
    }).catch(err => {
      alert(err.response.data.detail);
    })
    setUser(null);
    setBook(null);
  }

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <Loader/>
      </Backdrop>

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
              <SelectTextField
                label="Reg Number"
                name="adm_no"
                onChange={onChangeRegNo}
                listClickHandler={(e) => listClickHandler(e, "user")}
                items={users}
              />
              {/* <TextField
                label="Reg Number"
                fullWidth
                sx={{ mt: 2 }}
                onChange={onChangeRegNo}
                name="adm_no"
              />
              {users.length > 0 && (
                <div style={{ position: 'relative' }}>
                  <List style={{ top: '100%', left: 0, right: 0, zIndex: 1, maxHeight: "210px", overflow: "auto" }}>
                    {users.map((result: any, index: number) => (
                      <ListItemButton
                        key={result.id}
                        style={{ backgroundColor: index % 2 === 0 ? '#515151' : '#3b3b3b' }}
                        onClick={() => listClickHandler(result)}
                      >
                        <ListItemText primary={result.name} />
                      </ListItemButton>
                    ))}
                  </List>
                </div>
              )} */}


              {/* <Autocomplete
                id="user-search"
                sx={{ mt: 2 }}
                loading={loading}
                options={users}
                autoHighlight
                fullWidth
                getOptionLabel={(option) => option.name}
                // renderOption={(props, option) => (
                //   <Box component="li" {...props}>
                //     {option.name} ({option.name}) +{option.name}
                //   </Box>
                // )}
              
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Enter Registration Number"
                    name='adm_no'
                    onChange={onChangeRegNo}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              /> */}

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label={user?.name ?? "Name"}
                    fullWidth
                    sx={{ mt: 2 }}
                    name="name"
                    disabled

                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label={user?.semester ?? "Semester"}
                    fullWidth
                    sx={{ mt: 2 }}
                    name="semester"
                    disabled

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

              <SelectTextField
                label="Search Book"
                name="title"
                onChange={onSearchBook}
                listClickHandler={(e) => listClickHandler(e, "book")}
                items={books}
                type='book'
              />

              <TextField
                label="Title"
                fullWidth
                sx={{ mt: 2 }}
                name="title"
                disabled
                value={book?.title ? book?.title : "Title"}
              />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Subject"
                    fullWidth
                    sx={{ mt: 2 }}
                    name="subject"
                    value={book?.subject ? book?.subject : "Subject"}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Accession Number"
                    fullWidth
                    sx={{ mt: 2 }}
                    type="number"
                    name="acc_no"
                    value={book?.acc_no ? book?.acc_no : 0}
                    disabled
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Publisher"
                    fullWidth
                    sx={{ mt: 2 }}
                    name="publisher"
                    disabled
                    value={book?.publisher ? book?.publisher : "Publisher"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Author"
                    fullWidth
                    sx={{ mt: 2 }}
                    name="author"
                    value={book?.author ? book?.author : "Author"}
                    disabled
                  />
                </Grid>
              </Grid>


            </Box>

          </Grid>

        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Issue date"
              fullWidth
              sx={{ mt: 2 }}
              name="issue_date"
              type="date"
              onChange={onChangeDate}
              defaultValue={dateFields.issue_date}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Return date"
              fullWidth
              sx={{ mt: 2 }}
              type="date"
              name="return_date"
              onChange={onChangeDate}
              defaultValue={dateFields.return_date}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={onIssueHandler} >
          Issue Book
        </Button>
      </Box>
      {showSnackbar && (
        <Popup onClose={closeSnackbar} message="Book Issued Successfully" icon="✅" />
      )}



    </>
  );
};

export default IssueBook;
